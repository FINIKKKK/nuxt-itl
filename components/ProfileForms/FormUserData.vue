<template>
  <form class="block" @submit.prevent="onChageUserData">
    <span class="error" v-if="errors">{{ errors }}</span>
    <h2 class="title">Личные данные</h2>
    {{ userStore.user }}
    <Input placeholder="Имя" name="firstName" />
    <Input placeholder="Фамилия" name="lastName" />
    <Input placeholder="Email" name="email" />
    <button class="btn">Сохранить настройки</button>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { UserDataScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';
import { Api } from '~/api';

const { handleSubmit } = useForm({
  validationSchema: UserDataScheme,
});
const errors = ref('');
const isLoading = ref(false);
const userStore = useUserStore();

const onChageUserData = handleSubmit(async (values) => {
  try {
    errors.value = '';
    isLoading.value = true;
    const dto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    const { data } = await Api().user.updateData(dto);
    console.log(data);
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped></style>