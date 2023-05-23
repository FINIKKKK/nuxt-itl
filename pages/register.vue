<template>
  <NuxtLayout
    name="main"
    title="Регистрация"
    titleSpan=">  Создание компании  >  Добавление пользователей"
  >
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        У вас уже есть аккаунт?
        <NuxtLink to="/login">Войдите в систему</NuxtLink>
      </p>
      <div class="errors" v-if="errors.length">
        <span v-for="error in errors">{{ error }}</span>
      </div>
      <div class="inputs">
        <Input name="firstName" placeholder="Имя" class="input" />
        <Input name="lastName" placeholder="Фамилия" class="input" />
      </div>
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Пароль" type="password" />
      <Input
        name="password_confirmation"
        placeholder="Подтвердите пароль"
        type="password"
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
import { useForm } from 'vee-validate';
import { Api } from '@/api';
import { setCookie } from 'nookies';
import { RegisterScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';

/**
 * Мета данные ----------------
 */
definePageMeta({
  layout: false,
});

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
// Фукция обработки отправки формы
const { handleSubmit } = useForm({
  validationSchema: RegisterScheme, // Схема валидации
});
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка

/**
 * Методы ----------------
 */
// Регистрация пользователя
const onSubmit = handleSubmit(async (values) => {
  try {
    errors.value = []; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    // Регистрация пользователя
    const { data } = await Api().auth.register(dto);
    // Сохраняем токен в куки
    setCookie(null, 'access_token', data.token.access_token, {
      maxAge: data.token.expires_in, // Время жизни
      path: '/',
    });
    userStore.setUser(data.user); // Сохраняем в хранилище данные о пользователе
    await router.push('/create_company'); // Перенаправляем на страницу создания компании
  } catch (err: any) {
    errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
});
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