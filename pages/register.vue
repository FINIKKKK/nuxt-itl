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
      <div class="inputs">
        <Input name="firstName" label="Имя" />
        <Input name="lastName" label="Фамилия" />
      </div>
      <Input name="email" label="Email" />
      <Input name="password" label="Пароль" type="password" />
      <Input
        name="password_confirmation"
        label="Подтвердите пароль"
        type="password"
      />
      <p class="link">
        Нажимая кнопку «Зарегистроваться» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>
        в отношении продуктов ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button type="submit" class="btn" :class="{ disabled: isLoading }">
        Зарегистроваться
      </button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserStore';
import { useForm } from 'vee-validate';
import { Api } from '@/api';
import { setCookie } from 'nookies';
import { RegisterScheme } from '~/utils/validation';

definePageMeta({
  layout: false,
});

const errors = ref<any>([]);
const router = useRouter();
const isLoading = ref(false);
const { handleSubmit } = useForm({
  validationSchema: RegisterScheme,
});
const userStore = useUserStore();

const onSubmit = handleSubmit(async (values) => {
  try {
    errors.value = '';
    isLoading.value = true;
    const dto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    const { data } = await Api().auth.register(dto);
    setCookie(null, 'access_token', data.token.access_token, {
      maxAge: data.token.expires_in,
      path: '/',
    });
    userStore.setUser(data.user);
    await router.push('/create_company');
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.form {
  width: 380px;
}

.text {
  margin-bottom: 40px;
}

.error {
  color: $red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 25px;
}

.inputs {
  display: flex;
  justify-content: space-between;
}
</style>