<template>
  <div>
    <form @submit.prevent="onSubmit">
      <span v-if="error">{{ error }}</span>
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
components: {
  Input;
}

import { useForm } from "vee-validate";
import { Api } from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginScheme } from "@/utils/validation/LoginScheme";
import Input from "@/components/Input.vue";
import { setCookie } from 'nookies';

const { handleSubmit } = useForm({
  validationSchema: LoginScheme,
});

const error = ref("");
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  try {
    const token = await Api().auth.login(values);
    console.log(token);
    setCookie(null, "access_token", token.access_token, {
      maxAge: 30 * 60 * 24 * 14,
      path: "/",
    });
    router.push("/");
  } catch (err) {
    error.value = err?.response?.data?.main_message;
  }
});
</script>

<style lang=""></style>
