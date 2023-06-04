<template>
  <NuxtLayout name="main" title="Восстановление пароля">
    <!-- Отображение ошибок -->
    <Warning v-if="errors.length" :errors="errors as string[]" />

    <!-- Форма -->
    <form class="form" @submit.prevent="onSubmit">
      <Input
        placeholder="Введите адрес электронной почты"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
      <button class="btn" :class="{ disabled: isLoading }">Продолжить</button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ResetPasswordScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Warning from '~/components/UI/Warning.vue';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const emailValue = ref(''); // Значение email

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Отправление на почту код для восстановления пароля
const onSubmit = async () => {
  // Объект с данными
  const dto = {
    email: emailValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, ResetPasswordScheme, async () => {
    // Отправляем на почту код для восстановления пароля
    // await Api().auth.reset_password(dto);
  });
};
</script>

<style lang="scss" scoped>
.form {
  width: 390px;
}
</style>
