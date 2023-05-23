<template>
  <NuxtLayout name="main" title="Профиль / Редактирование" :isMiniTitle="true">
    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <FormUserData />
        <!-- Форма для изменения пароля пользователя -->
        <FormPassword />
      </div>

      <!-- Изменяем аватар пользователя -->
      <div class="avatar">
        <!-- Аватар -->
        <div class="img">
          <!-- Если, есть аватарка -->
          <img
            :src="userStore.user?.avatar"
            alt=""
            v-if="userStore.user?.avatar"
          />
          <!-- Если, нет аватарки -->
          <svg-icon name="avatar" v-else />
        </div>
        <div class="btn-inline" :class="{ disabled: isLoading }">
          <span>Загрузить фото</span>
          <input type="file" v-on:change="onChangeAvatar" />
        </div>
        <p class="pretext">
          Используйте изображение размером не менее 256 на 256 пикселей в
          формате .jpg или .png
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import FormUserData from '~/components/ProfileForms/FormUserData.vue';
import FormPassword from '~/components/ProfileForms/FormPassword.vue';
import { Api } from '~/api';
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
const userStore = useUserStore();

/**
 * Пользовательские переменные ----------------
 */
const errors = ref(''); // Ошибки
const isLoading = ref(false); // Загрузка

/**
 * Пропсы ----------------
 */
// Метод изменения аватара пользователя
const onChangeAvatar = async (e: any) => {
  try {
    errors.value = ''; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку
    // Обновляем аватар на бэкенде
    const { data } = await Api().user.updateAvatar(e.target.files[0]);
    // Обновляем аватар в хранилище
    userStore.setUserAvatar(data.avatar);
  } catch (err: any) {
    errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 203px;
  text-align: center;
  margin-right: 50px;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto 25px;
    overflow: hidden;
    img,
    svg {
      width: 100%;
      height: 100%;
    }
    svg {
      fill: $blue4;
    }
  }
  .btn-inline {
    margin-bottom: 21px;
    input {
      cursor: pointer;
    }
  }
}
</style>