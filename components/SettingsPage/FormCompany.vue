<template>
  <form @submit.prevent="updateCompany" class="block">
    <h2 class="title">Профиль компании</h2>
    <Input
      placeholder="Название компании"
      v-model="nameValue"
      :errors="errorsValidate['name'] || []"
    />
    <Input
      placeholder="Адрес сайта"
      v-model="urlAddressValue"
      :errors="errorsValidate['url_address'] || []"
    />
    <p class="text">
      Поделитесь ссылкой
      <NuxtLink to="">{{ companyStore.activeCompany.slug }}.itl.wiki</NuxtLink>
      чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше
      рабочее пространство.
    </p>
    <button class="btn" :class="{ disabled: isLoading }">Сохранить</button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import { Api } from '~/api';
import { useCompanyStore } from '~/stores/CompanyStore';
import { useUserStore } from '~/stores/UserStore';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarning', 'showWarningSuccess']);

/**
 * Системные переменные ----------------
 */
const companyStore = useCompanyStore(); // Хранилище активной компании
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Пользовательские переменные ----------------
 */
const nameValue = ref(companyStore.activeCompany?.name); // Значение имени компании
const urlAddressValue = ref(companyStore.activeCompany?.url_address); // Значение адресса компании

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
// Обновить компанию
const updateCompany = async () => {
  // Убираем warning
  emits('showWarning', []);
  emits('showWarningSuccess', '');
  // Объект с данными
  const dto = {
    name: nameValue.value,
    url_address: urlAddressValue.value,
  };
  // Вызываем хук для обработки формы
  await validateForm(dto, CompanyScheme, async () => {
    // Обновляем компанию
    const { data } = await Api().company.update(
      companyStore.activeCompany?.id,
      dto,
    );
    // Обновляем данные компании в хранилище
    companyStore.setActiveCompany(data);
    userStore.updateCompany(companyStore.activeCompany?.id, data);
    // Отображаем сообщение об успешном изменении
    emits('showWarningSuccess', 'Данные успешно изменены');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.text {
  margin-bottom: 25px;
}
</style>
