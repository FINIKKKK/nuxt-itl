<template lang="">
  <div>
    <form @submit.prevent="onSubmit">
      <span v-if="error">{{ error }}</span>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Пароль" v-model="password" />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { Api } from "~/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const onSubmit = async () => {
  try {
    const dto = {
      email: email.value,
      password: password.value,
    };
    const data = await Api().auth.login(dto);
    console.log(data);
    router.push("/");
  } catch (err) {
    error.value = err.response.data.main_message;
  }
};
</script>

<style lang=""></style>
