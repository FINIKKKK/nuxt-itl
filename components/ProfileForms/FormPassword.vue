<template>
  <form class="block" @submit.prevent="onChagePassword">
    <span class="error" v-if="errors">{{ errors }}</span>
    <h2 class="title">Безопасность</h2>
    <Input placeholder="Текущий пароль" name="old_password" type="password" />
    <Input placeholder="Новый пароль" name="new_password" type="password" />
    <Input
      placeholder="Повторить пароль"
      name="password_confirmation"
      type="password"
    />
    <button class="btn">Сохранить настройки</button>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import Input from '~/components/UI/Input.vue';

const { handleSubmit } = useForm({
  validationSchema: PasswordScheme,
});
const errors = ref('');
const isLoading = ref(false);

const onChagePassword = handleSubmit(async (values) => {
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

<style lang="scss" scoped></style>