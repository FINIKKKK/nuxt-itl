<template>
  <NuxtLayout name="main" :title="'Регистрация'" :titleSpan="'>  Создание компании  >  Добавление компании'">
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        У вас уже есть аккаунт?
        <NuxtLink to="/login">Войдите в систему</NuxtLink>
      </p>
      <span v-if="errors.email">{{ errors.email[0] }}</span>
      <Input name="firstName" label="Имя" />
      <Input name="lastName" label="Фамилия" />
      <Input name="email" label="Email" />
      <Input name="password" label="Пароль" />
      <Input name="password_confirmation" label="Подтвердите пароль" />
      <p class="text">
        Нажимая кнопку «Зарегистроваться» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>в отношении продуктов
        ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button type="submit" class="btn">Зарегистроваться</button>
    </form>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
});
components: {
  Input;
}

import { useForm } from "vee-validate";
import { RegisterScheme } from "@/utils/validation/RegisterScheme";
import { Api } from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/Input.vue";
import { setCookie } from "nookies";

const { handleSubmit } = useForm({
  validationSchema: RegisterScheme,
});

const errors = ref([]);
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    const token = await Api().auth.register(values);
    setCookie(null, "access_token", token.access_token, {
      maxAge: 30 * 60 * 24 * 14,
      path: "/",
    });
    router.push("/");
  } catch (err) {
    errors.value = err.response.data.message;
    console.warn(err);
  }
});
</script>

<style lang="scss" scoped>
.form {
  width: 720px;
}
.text {
  margin-bottom: 40px;
}
</style>
