<template>
  <form class="form block" @submit.prevent="onChangePassword">
    <h2 class="title">Безопасность</h2>
    <Input
      placeholder="Текущий пароль"
      type="password"
      v-model="oldPasswordValue"
      :errors="errorsValidate['old_password'] || []"
    />
    <Input
      placeholder="Новый пароль"
      type="password"
      v-model="newPasswordValue"
      :errors="errorsValidate['password'] || []"
    />
    <Input
      placeholder="Повторить пароль"
      type="password"
      v-model="passwordConfirmValue"
      :errors="errorsValidate['password_confirmation'] || []"
    />
    <button class="btn" :class="{ disabled: isLoading }">
      Сохранить настройки
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarning', 'showWarningSuccess']);

/**
 * Пользоватеьские переменные ----------------
 */
const oldPasswordValue = ref(''); // Значение старого пароля
const newPasswordValue = ref(''); // Значение нового пароля
const passwordConfirmValue = ref(''); // Значение подтвежденного пароля

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за значением ошибок
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarning', errors.value);
});

/**
 * Методы ----------------
 */
// Изменение пароля пользователя
const onChangePassword = async () => {
  emits('showWarning', []); // Убираем warning
  // Объект с данными
  const dto = {
    old_password: oldPasswordValue.value,
    password: newPasswordValue.value,
    password_confirmation: passwordConfirmValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, PasswordScheme, async () => {
    // Обновляем пароль
    await Api().user.updatePassword(dto);
    // Отображаем сообщение об успешном изменении
    emits('showWarningSuccess', 'Пароль успешно изменен');
    // Перемещаем пользователя на вверх
    const block = document.getElementById('scroll');
    if (block && typeof block.scrollTo === 'function') {
      block.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  // Если, есть ошибки при отправке формы, то перемещаем пользователя на вверх
  if (errors.value.length) {
    const block = document.getElementById('scroll');
    if (block && typeof block.scrollTo === 'function') {
      block.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
