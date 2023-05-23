<template>
  <NuxtLayout name="main" title="Авторизация">
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        Впервые здесь?
        <NuxtLink to="/register">Создайте аккаунт</NuxtLink>
      </p>
      <div class="errors" v-if="errors.length">
        <span v-for="error in errors">{{ error }}</span>
      </div>
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Пароль" type="password" />
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
import { useForm } from 'vee-validate';
import { Api } from '@/api';
import { setCookie } from 'nookies';
import { LoginScheme } from '~/utils/validation';
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
// Фукция обработки отправки формы
const { handleSubmit } = useForm({
  validationSchema: LoginScheme, // Схема валидации данных
});
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка

/**
 * Методы ----------------
 */
// Авторизация пользователя
const onSubmit = handleSubmit(async (values) => {
  try {
    errors.value = []; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      email: values.email,
      password: values.password,
    };
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
</style>