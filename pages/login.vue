<template>
  <NuxtLayout name="main" title="Авторизация">
    <!-- Отображение ошибок -->
    <Warning v-if="errors.length" :errors="errors as string[]" />

    <!-- Форма -->
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        Впервые здесь?
        <NuxtLink to="/register">Создайте аккаунт</NuxtLink>
      </p>
      <Input
        placeholder="Email"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
      <Input
        placeholder="Пароль"
        v-model="passwordValue"
        :errors="errorsValidate['password'] || []"
        type="password"
      />
      <p class="link">
        <NuxtLink to="/reset_password">Забыли пароль?</NuxtLink>
      </p>
      <button type="submit" class="btn" :class="{ disabled: isLoading }">
        Войти
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
import { LoginScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import Warning from '~/components/UI/Warning.vue';
import { useFormValidation } from '~/hooks/useFormValidation';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Пользовательские переменные ----------------
 */
const emailValue = ref(''); // Значение email
const passwordValue = ref(''); // Значение пароля

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Авторизация пользователя
const onSubmit = async () => {
  // Объект с данными
  const dto = {
    email: emailValue.value,
    password: passwordValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, LoginScheme, async () => {
    // Авторизуем пользователя
    const { data } = await Api().auth.login(dto);
    // Сохраняем токен в куки
    setCookie(null, 'access_token', data.token.access_token, {
      maxAge: data.token.expires_in, // Время куки
      path: '/',
    });
    userStore.setUser(data.user); // Сохраняем в хранилище данные пользователя
    userStore.setCompanies(data.companies); // Сохраняем в хранилище данные компаний пользователя
    await router.push('/'); // Перенаправляем пользователя на главную страницу
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 390px;
}
</style>
