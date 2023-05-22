<template>
  <NuxtLayout name="main" title="Профиль / Редактирование" :isMiniTitle="true">
    <div class="flex">
      <div class="left">
        <form class="block" @submit.prevent="onChageUserData">
          <span class="error" v-if="errors">{{ errors }}</span>
          <h2 class="title">Личные данные</h2>
          <Input placeholder="Имя" name="firstName" />
          <Input placeholder="Фамилия" name="lastName" />
          <Input placeholder="Email" name="email" />
          <button class="btn">Сохранить настройки</button>
        </form>

        <form class="block" @submit.prevent="onChagePassword">
          <span class="error" v-if="errors">{{ errors }}</span>
          <h2 class="title">Безопасность</h2>
          <Input
            placeholder="Текущий пароль"
            name="old_password"
            type="password"
          />
          <Input
            placeholder="Новый пароль"
            name="new_password"
            type="password"
          />
          <Input
            placeholder="Повторить пароль"
            name="password_confirmation"
            type="password"
          />
          <button class="btn">Сохранить настройки</button>
        </form>
      </div>

      <div class="avatar">
        <svg-icon name="avatar" />
        <div class="btn-inline">
          <span>Загрузить фото</span>
          <input type="file" />
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
import { useForm } from 'vee-validate';
import { UserDataScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';

definePageMeta({
  layout: false,
});
const { handleSubmit: handleSubmit1 } = useForm({
  validationSchema: UserDataScheme,
});
const { handleSubmit: handleSubmit2 } = useForm({
  validationSchema: PasswordScheme,
});
const errors = ref('');
const isLoading = ref(false);

const onChageUserData = handleSubmit1(async (values) => {
  try {
    errors.value = '';
    isLoading.value = true;
    const dto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    // const { data } = await Api().user.update(dto);
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
const onChagePassword = handleSubmit2(async (values) => {
  try {
    errors.value = '';
    isLoading.value = true;
    const dto = {
      old_password: values.old_password,
      new_password: values.new_password,
      password_confirmation: values.password_confirmation,
    };
    // const { data } = await Api().user.updatePassword(dto);
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
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