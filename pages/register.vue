<template>
  <NuxtLayout
    name="main"
    title="Регистрация"
    titleSpan=">  Создание компании  >  Добавление пользователей"
  >
    <form class="form" @submit.prevent="onSubmit">
      <p class="text">
        У вас уже есть аккаунт?
        <NuxtLink to="/login">Войдите в систему</NuxtLink>
      </p>
      <div v-if="errors.email" class="error">{{ errors.email[0] }}</div>
      <Input name="firstName" label="Имя" />
      <Input name="lastName" label="Фамилия" />
      <Input name="email" label="Email" />
      <Input name="password" label="Пароль" type="password" />
      <Input
        name="password_confirmation"
        label="Подтвердите пароль"
        type="password"
      />
      <p class="text">
        Нажимая кнопку «Зарегистроваться» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink> в отношении продуктов
        ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button type="submit" class="btn" :class="{ disabled: isLoading }">
        Зарегистроваться
      </button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { useForm } from "vee-validate";
import { RegisterScheme } from "@/utils/validation/RegisterScheme";
import { Api } from "@/api";
import { setCookie } from "nookies";

const errors = ref<any>([]);
const router = useRouter();
const isLoading = ref(false);
const { handleSubmit } = useForm({
  validationSchema: RegisterScheme,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const dto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    const token = await Api().auth.register(dto);
    setCookie(null, "access_token", token.access_token, {
      maxAge: 30 * 60 * 24 * 14,
      path: "/",
    });
    router.push("/create_company");
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.text {
  margin-bottom: 40px;
}
.error {
  color: $red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 25px;
}
</style>
