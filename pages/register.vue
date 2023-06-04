<template>
  <NuxtLayout
    name="main"
    title="Регистрация"
    title2="Создание компании"
    title3="Добавление пользователей"
  >
    <!-- Отображение ошибок -->
    <Warning v-if="errors.length" :errors="errors as string[]" />

    <!-- Форма -->
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        У вас уже есть аккаунт?
        <NuxtLink to="/login">Войдите в систему</NuxtLink>
      </p>
      <div class="inputs">
        <Input
          placeholder="Имя"
          class="input"
          v-model="firstNameValue"
          :errors="errorsValidate['firstName'] || []"
        />
        <Input
          placeholder="Фамилия"
          class="input"
          v-model="lastNameValue"
          :errors="errorsValidate['lastName'] || []"
        />
      </div>
      <Input
        placeholder="Email"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
      <Input
        placeholder="Пароль"
        type="password"
        v-model="passwordValue"
        :errors="errorsValidate['password'] || []"
      />
      <Input
        name="password_confirmation"
        placeholder="Подтвердите пароль"
        type="password"
        v-model="passwordConfirmValue"
        :errors="errorsValidate['password_confirmation'] || []"
      />
      <p class="link">
        Нажимая кнопку «Зарегистроваться» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>
        в отношении продуктов ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button type="submit" class="btn" :class="{ disabled: isLoading }">
        Зарегистроваться
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserStore';
import { Api } from '@/api';
import { setCookie } from 'nookies';
import { RegisterScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Warning from '~/components/UI/Warning.vue';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const firstNameValue = ref(''); // Значение имени
const lastNameValue = ref(''); // Значение фамилии
const emailValue = ref(''); // Значение email
const passwordValue = ref(''); // Значение пароля
const passwordConfirmValue = ref(''); // Значение подтверждения пароля

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Регистрация пользователя
const onSubmit = async () => {
  // Объект с данными
  const dto = {
    firstName: firstNameValue.value,
    lastName: lastNameValue.value,
    email: emailValue.value,
    password: passwordValue.value,
    password_confirmation: passwordConfirmValue.value,
  };
  // Вызываем хук для валидации форм
  await validateForm(dto, RegisterScheme, async () => {
    // Регистрация пользователя
    const { data } = await Api().auth.register(dto);
    // Сохраняем токен в куки
    setCookie(null, 'access_token', data.token.access_token, {
      maxAge: data.token.expires_in, // Время жизни
      path: '/',
    });
    userStore.setUser(data.user); // Сохраняем в хранилище данные о пользователе
    await router.push('/create_company'); // Перенаправляем на страницу создания компании
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 390px;
}

.inputs {
  display: flex;
  justify-content: space-between;
  .input {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
