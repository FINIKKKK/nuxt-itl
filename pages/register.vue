<template>
  <div>
    <form @submit.prevent="onSubmit">
      <Input name="firstName" placeholder="Имя" />
      <Input name="lastName" placeholder="Фамилия" />
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Пароль" />
      <Input name="passwordConfirmed" placeholder="Подтвердите пароль" />
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

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmed = ref("");
const errors = ref([]);
const router = useRouter();

const onSubmit = handleSubmit(async () => {
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
});
</script>

<style lang="scss">
input {
  display: block;
}
</style>
