<template>
    <NuxtLayout name="main" title="Авторизация">
        <form class="form" @submit.prevent="onSubmit">
            <p class="text">
                Впервые здесь?
                <NuxtLink to="/register">Создайте аккаунт</NuxtLink>
            </p>
            <div v-if="error" class="error">{{ error }}</div>
            <Input name="email" label="Email"/>
            <Input name="password" label="Пароль" type="password"/>
            <p class="link">
                <NuxtLink to="/reset_password">Забыли пароль?</NuxtLink>
            </p>
            <button type="submit" class="btn" :class="{ disabled: isLoading }">
                Войти
            </button>
        </form>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/stores/UserStore";
import {useForm} from "vee-validate";
import {Api} from "@/api";
import {setCookie} from "nookies";
import {LoginScheme} from "~/utils/validation/Scheme";

definePageMeta({
    layout: false,
});

const {handleSubmit} = useForm({
    validationSchema: LoginScheme,
});
const error = ref("");
const router = useRouter();
const isLoading = ref(false);
const userStore = useUserStore()

const onSubmit = handleSubmit(async (values) => {
    try {
        error.value = '';
        isLoading.value = true;
        const dto = {
            email: values.email,
            password: values.password,
        };
        const {data} = await Api().auth.login(dto);
        setCookie(null, "access_token", data.token.access_token, {
            maxAge: data.token.expires_in,
            path: "/",
        });
        userStore.setUser(data.user);
        await router.push("/");
    } catch (err: any) {
        error.value = err?.response?.data?.message;
    } finally {
        isLoading.value = false;
    }
});
</script>

<style lang="scss" scoped>
.text {
  display: block;
  margin-bottom: 40px;
}

.error {
  color: $red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 25px;
}
</style>
