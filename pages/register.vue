<template>
  <div>
    <form @submit.prevent="onSubmit">
      <span v-if="errors.email">{{ errors.email[0] }}</span>
      <Input name="firstName" placeholder="Имя" />
      <Input name="lastName" placeholder="Фамилия" />
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Пароль" />
      <Input name="password_confirmation" placeholder="Подтвердите пароль" />
      <button type="submit">Зарегистроваться</button>
    </form>
  </div>
</template>

<script setup>
components: {
  Input;
}

import { useForm } from "vee-validate";
import { RegisterScheme } from "~/utils/validation/RegisterScheme";
import { Api } from "~/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "~/components/Input.vue";

const { handleSubmit } = useForm({
  validationSchema: RegisterScheme,
});

const errors = ref([]);
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    const data = await Api().auth.register(values);
    console.log(data);
    router.push("/");
  } catch (err) {
    errors.value = err.response.data.message;
    console.warn(err);
  }
});
</script>

<style lang="scss">
input {
  display: block;
}
</style>
