<template lang="">
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="firstName" v-model="firstName" />
      <input type="text" placeholder="lastName" v-model="lastName" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { Api } from "~/api";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const dto = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };
        // const { data } = await axios.post(
        //   "http://127.0.0.1:8000/api/auth/register",
        //   dto
        // );
        const data = await Api().auth.register(dto);
        console.log(data);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при регистрации");
      }
    },
  },
};
</script>

<style lang=""></style>
