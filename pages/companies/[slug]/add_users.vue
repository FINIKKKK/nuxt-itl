<template>
  <NuxtLayout name="main" title="Добавление пользователей">
    <template v-if="roles">
      <!-- Отображение ошибок -->
      <Warning
        v-if="errors.length || successMessage"
        :errors="errors as string[]"
        :successMessage="successMessage as string"
      />

      <!-- Форма -->
      <form @submit.prevent="onSubmit" class="form">
        <p class="text">
          Основные достоинства itl.wiki раскрываются, когда вы работаете в
          связке с другими участниками команды и обсуждаете проекты.
        </p>
        <Input
          name="email"
          placeholder="Введите e-mail адреса пользователей через запятую"
          v-model="emailsValue"
          :errors="errorsValidate['emails'] || []"
        />
        <Select :options="roles" class="select" />
        <p class="link">
          Нажимая кнопку «Пригласить пользователей» вы принимаете
          <NuxtLink to="#">Условия обслуживания</NuxtLink>
          в отношении продуктов ITL и соглашаетесь с
          <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
        </p>
        <button class="btn" :class="{ disabled: isLoading }">
          Пригласить пользователей
        </button>
        <NuxtLink class="btn btn2" to="/">Пропустить</NuxtLink>
      </form>
    </template>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Warning from '~/components/UI/Warning.vue';
import Select from '~/components/UI/Select.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Input from '~/components/UI/Input.vue';
import { Api } from '~/api';

/**
 * Пользовательские переменные ----------------
 */
const emailsValue = ref(''); // Значение emails
const successMessage = ref(''); // Сообщение при успешной отправке

/**
 * Получение данных ----------------
 */
// Роли
const { data: roles } = useAsyncData(async () => {
  const { data } = await Api().role.getAll();
  return data;
});

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Выслать приглашения
const onSubmit = () => {
  // Убираем warning
  successMessage.value = '';
  // Объект с данными
  const dto = {
    emails: emailsValue.value,
  };
  // Вызываем хук для обработки формы
  validateForm(dto, AddUsersScheme, async () => {
    successMessage.value = 'Приглашения отправлены';
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.select {
  margin-bottom: 65px;
  width: 300px;
}

.btn2 {
  margin-left: 16px;
}
</style>
