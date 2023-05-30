<template>
  <form class="block" @submit.prevent="onChangeUserData">
    <h2 class="title">Личные данные</h2>
    <Input
      placeholder="Имя"
      name="firstName"
      v-model="firstNameValue"
      :errors="errorsValidate['firstName']"
    />
    <Input
      placeholder="Фамилия"
      name="lastName"
      v-model="lastNameValue"
      :errors="errorsValidate['lastName']"
    />
    <Input
      placeholder="Email"
      name="email"
      v-model="emailValue"
      :errors="errorsValidate['email']"
    />
    <button class="btn" :class="{ disabled: isLoading }">
      Сохранить настройки
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { UserDataScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarning', 'showWarningSuccess']);

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const firstNameValue = ref(userStore.user?.firstName); // Значене имени
const lastNameValue = ref(userStore.user?.lastName); // Значене фамилии
const emailValue = ref(userStore.user?.email); // Значене email

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за errors
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarning', errors.value);
});

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeUserData = async () => {
  // Убираем warning
  emits('showWarning', []);
  emits('showWarningSuccess', '');
  // Данные объекта
  const dto = {
    firstName: firstNameValue.value,
    lastName: lastNameValue.value,
    email: emailValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, UserDataScheme, async () => {
    // Обновляем данные пользователя
    const { data } = await Api().user.updateData(dto);
    // Обновляем в хранилище
    userStore.setUser(data);
    // Отображаем сообщение об успешном изменении
    emits('showWarningSuccess', 'Данные успешно изменены');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
