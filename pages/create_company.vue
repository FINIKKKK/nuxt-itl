<template>
  <NuxtLayout
      name="main"
      title="Создание компании"
      title2="Добавление пользователей"
  >
    <!-- Форма для создания компании -->
    <form @submit.prevent="onSubmit" class="form">
      <div class="error" v-if="errors">
        <span v-for="error in errors">
          {{ error[0] }}
        </span>
      </div>
      <Input name="name" placeholder="Название вашей компании"/>
      <Input name="address" placeholder="Адрес сайта" type="url_address"/>
      <p class="link">
        Нажимая кнопку «Создать компанию» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>
        в отношении продуктов ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: isLoading }">
        Создать компанию
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { CompanyScheme } from '~/utils/validation';
import { useForm } from 'vee-validate';
import { Api } from '~/api';
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';

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
const {handleSubmit} = useForm({
      validationSchema: CompanyScheme, // Схема валидации данных
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
    // Создание компании
const onSubmit = handleSubmit(async (values) => {
      try {
        errors.value = []; // Обнуляем ошибки
        isLoading.value = true; // Ставим загрузку
        // Объект с данными
        const dto = {
          name: values.name,
          url_address: `http://${values.address.toLowerCase()}.itl.wiki`,
        };
        // Создаем компанию
        const {data} = await Api().company.create(dto);
        userStore.setCompanies([data]); // Сохраняем в хранилище компании
        await router.push('/add_users'); // Перенаправляем на страницу добавления пользователей
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