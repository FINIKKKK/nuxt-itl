<template>
  <form class="form block" @submit.prevent="onChangePassword">
    <h2 class="title">Безопасность</h2>
    <div class="errors" v-if="errors">
      <span v-for="error in errors">{{ error }}</span>
    </div>
    <Input placeholder="Текущий пароль" name="old_password" type="password" />
    <Input placeholder="Новый пароль" name="new_password" type="password" />
    <Input
      placeholder="Повторить пароль"
      name="password_confirmation"
      type="password"
    />
    <button class="btn" :class="{ disabled: isLoading }">
      Сохранить настройки
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import Input from '~/components/UI/Input.vue';
import { Api } from '~/api';

/**
 * Системные переменные ----------------
 */
// Фукция обработки отправки формы
const { handleSubmit } = useForm({
  validationSchema: PasswordScheme, // Схема валидации данных
});

/**
 * Пользоватеьские переменные ----------------
 */
const errors = ref(''); // Ошибки
const isLoading = ref(false); // Значение загрузки

/**
 * Методы ----------------
 */
// Изменение пароля пользователя
const onChangePassword = handleSubmit(async (values) => {
  try {
    errors.value = ''; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      old_password: values.old_password,
      password: values.new_password,
      password_confirmation: values.password_confirmation,
    };
    // Обновляем пароль на бэкенде
    await Api().user.updatePassword(dto);
  } catch (err: any) {
    errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>