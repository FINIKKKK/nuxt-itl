<template>
  <NuxtLayout name="main" title="Восстановление пароля
">
    <form class="form" @submit.prevent="onSubmit">
      <div class="error" v-if="errors">
        <span v-for="error in errors">
          {{ error[0] }}
        </span>
      </div>
      <Input placeholder="Введите адрес электронной почты" name="email"/>
      <button class="btn" :class="{disabled: isLoading}">Продолжить</button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { ResetPasswordScheme } from "~/utils/validation/Schemes";

definePageMeta({
  layout: false,
});

const isLoading = ref(false);
const errors = ref("");
const {handleSubmit} = useForm({
  validationSchema: ResetPasswordScheme,
});
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const dto = {
      email: values.email,
    };
    // await Api().auth.reset_password(dto);
    await router.push("/add_users");
  } catch (err: any) {
    errors.value = err?.response?.data?.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.form {
  width: 390px;
}
</style>
