<template lang="">
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { Api } from "~/api";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const dto = {
          email: this.email,
          password: this.password,
        };
        const data = await Api().auth.login(dto);
        console.log(data);
        this.$route.push('/');
      } catch (err) {
        console.warn(err);
        alert("Ошибка при авторизации");
      }
    },
  },
};
</script>

<style lang=""></style>
