<template>
  <NuxtLayout
      name="main"
      title="Создание компании"
      title2="Добавление пользователей"
  >
    <form @submit.prevent="onSubmit" class="form">
      <div class="error" v-if="errors">
        <span v-for="error in errors">
          {{ error[0] }}
        </span>
      </div>
      <Input name="name" placeholder="Название вашей компании"/>
      <Input
          name="address"
          placeholder="Адрес сайта"
          type="url_address"
      />
      <p class="link">
        Нажимая кнопку «Создать компанию» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink>
        в отношении продуктов
        ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: isLoading }">
        Создать компанию
      </button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { CompanyScheme } from "~/utils/validation/Schemes";
import { useForm } from "vee-validate";
import { Api } from "~/api";

definePageMeta({
  layout: false,
});

const router = useRouter();
const errors = ref("");
const isLoading = ref(false);
const {handleSubmit} = useForm({
  validationSchema: CompanyScheme,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const dto = {
      name: values.name,
      url_address: `http://${values.address.toLowerCase()}.itl.wiki`,
    };
    await Api().company.create(dto);
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

.error {
  color: $red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 25px;

  span {
    display: block;
  }
}

.link {
  margin-top: -10px;
}
</style>
