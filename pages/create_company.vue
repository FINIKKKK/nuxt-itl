<template>
  <NuxtLayout
    name="main"
    title="Создание компании"
    title2="Добавление пользователей"
  >
    <!-- Отображение ошибок -->
    <Warning v-if="errors.length" :errors="errors as string[]" />

    <!-- Форма для создания компании -->
    <form @submit.prevent="onSubmit" class="form">
      <Input
        placeholder="Название вашей компании"
        v-model="nameValue"
        :errors="errorsValidate['name']"
      />
      <Input
        placeholder="Адрес сайта"
        type="url_address"
        v-model="addressValue"
        :errors="errorsValidate['url_address']"
      />
      <p class="link">
        Нажимая кнопку «Создать компанию» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>
        в отношении продуктов ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: isLoading }">
        Создать компанию
      </button>
      <NuxtLink class="btn btn2" to="/">Пропустить</NuxtLink>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { CompanyScheme } from '~/utils/validation';
import { Api } from '~/api';
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';
import Warning from '~/components/UI/Warning.vue';
import { useFormValidation } from '~/hooks/useFormValidation';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const nameValue = ref(''); // Значение имени компании
const addressValue = ref(''); // Значение адресса компании

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Создание компании
const onSubmit = async () => {
  // Объект с данными
  const dto = {
    name: nameValue.value,
    url_address: addressValue.value,
  };
  // Вызываем хук для обработки валидации
  await validateForm(dto, CompanyScheme, async () => {
    // Создаем компанию
    const { data } = await Api().company.create(dto);
    // Сохраняем в хранилище компании
    userStore.addCompany(data);
    // Перенаправляем на страницу добавления пользователей
    await router.push('/add_users');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 390px;
}

.btn2 {
  margin-left: 20px;
}
</style>
