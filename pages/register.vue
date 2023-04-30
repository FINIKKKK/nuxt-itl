<template lang="">
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="firstName" v-model="firstName" />
      <input type="text" placeholder="lastName" v-model="lastName" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <input type="text" placeholder="Подтвердите пароль" v-model="password2" />
      <button type="submit">Зарегистроваться</button>
    </form>
  </div>
</template>

<script>
import { Api } from "~/api";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
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
        const data = await Api().auth.register(dto);
        console.log(data);
        this.$router.push("/");
      } catch (err) {
        console.warn(err);
        alert("Ошибка при регистрации");
      }
    },
  },
};
</script>

<style lang=""></style>
