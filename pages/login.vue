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
      <Input
        placeholder="Email"
        v-model="emailValue"
        :errors="errorsValidate['email']"
      />
      <Input
        placeholder="Пароль"
        v-model="passwordValue"
        :errors="errorsValidate['password']"
        :isPassword="true"
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
import { LoginScheme, UserDataScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const errorsValidate = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка
const emailValue = ref(''); // Значения поля email
const passwordValue = ref(''); // Значения поля пароля

/**
 * Методы ----------------
 */
// Авторизация пользователя
const onSubmit = async () => {
  try {
    errors.value = []; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      email: emailValue.value,
      password: passwordValue.value,
    };

    await LoginScheme.validate(dto, {
      abortEarly: false,
    });
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
    if (err.inner) {
      // Ошибки валидации Yup доступны в свойстве "inner"
      err.inner.forEach((error) => {
        // Проверяем, существует ли уже массив ошибок для данного поля
        if (!errorsValidate.value[error.path]) {
          errorsValidate.value[error.path] = [];
        }
        // Добавляем ошибку в массив для данного поля
        errorsValidate.value[error.path].push(error.message);
      });
    }
    // errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 390px;
}
</style>
