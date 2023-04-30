<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Имя" v-model="firstName" />
      <span v-if="errors.firstName">{{ errors.firstName[0] }}</span>
      <input type="text" placeholder="Фамилия" v-model="lastName" />
      <span v-if="errors.lastName">{{ errors.lastName[0] }}</span>
      <input type="text" placeholder="Email" v-model="email" />
      <span v-if="errors.email">{{ errors.email[0] }}</span>
      <input type="text" placeholder="Пароль" v-model="password" />
      <span v-if="errors.password">{{ errors.password[0] }}</span>
      <input
        type="text"
        placeholder="Подтвердите пароль"
        v-model="passwordConfirmed"
      />
      <button type="submit">Зарегистроваться</button>
    </form>
  </div>
</template>

<script setup>
import { Api } from "~/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmed = ref("");
const errors = ref([]);
const router = useRouter();

const onSubmit = async () => {
  try {
    const dto = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmed.value,
    };
    const data = await Api().auth.register(dto);
    console.log(data);
    router.push("/");
  } catch (err) {
    errors.value = err.response.data.message;
    console.warn(err);
  }
};
</script>

<style lang="scss">
input {
  display: block;
}
</style>
