<template>
  <NuxtLayout name="main" title="Профиль / Редактирование" :isMiniTitle="true">
    <div class="flex">
      <div class="left">
        <FormUserData />

        <FormPassword />
      </div>

      <div class="avatar">
        <svg-icon name="avatar" />
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

<script lang="ts" setup>
import FormUserData from '~/components/ProfileForms/FormUserData.vue';
import FormPassword from '~/components/ProfileForms/FormPassword.vue';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';

definePageMeta({
  layout: false,
});

const userStore = useUserStore();

const avatarValue = ref(null);
const errors = ref('');
const isLoading = ref(false);

const onChangeAvatar = async (e: any) => {
  try {
    errors.value = '';
    isLoading.value = true;
    const dto = {
      avatar: e.target.files[0],
    };
    const { data } = await Api().user.updateAvatar(userStore?.user?.id, dto);
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 203px;
  text-align: center;
  margin-right: 50px;
  svg {
    width: 100px;
    height: 100px;
    fill: $blue4;
    margin-bottom: 25px;
  }
  .btn-inline {
    margin-bottom: 21px;
    input {
      cursor: pointer;
    }
  }
}
</style>