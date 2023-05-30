<template>
  <NuxtLayout name="main" title="Профиль / Редактирование" :isMiniTitle="true">
    <!-- Отображение ошибок -->
    <Warning
      class="warning"
      v-if="errors.length || successMessage"
      :errors="errors"
      :successMessage="successMessage"
    />

    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <FormUserData
          @showWarning="setErrors"
          @showWarningSuccess="setSuccessMessage"
        />
        <!-- Форма для изменения пароля пользователя -->
        <FormPassword
          @showWarning="setErrors"
          @showWarningSuccess="setSuccessMessage"
        />
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
import Warning from '~/components/UI/Warning.vue';

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
const errors = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка
const successMessage = ref('');

/**
 * Пропсы ----------------
 */
const setErrors = (value) => {
  errors.value = value;
};
const setSuccessMessage = (value: string) => {
  successMessage.value = value;
};
// Метод изменения аватара пользователя
const onChangeAvatar = async (e: any) => {
  if (e.target.files[0]) {
    try {
      errors.value = []; // Обнуляем ошибки
      isLoading.value = true; // Ставим загрузку
      // Обновляем аватар на бэкенде
      const { data } = await Api().user.updateAvatar(e.target.files[0]);
      // Обновляем аватар в хранилище
      userStore.setUserAvatar(data);
    } catch (err: any) {
      console.log(err);
      errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
    } finally {
      isLoading.value = false; // Убираем загрузку
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.warning {
  margin: 0 -50px 50px;
}

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
    margin: 0 auto 25px;
    img {
      border: 2px solid $blue;
      object-fit: cover;
    }
    img,
    svg {
      border-radius: 50%;
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
