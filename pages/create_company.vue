<template>
  <NuxtLayout
    name="main"
    :title="'Создание компании'"
    :titleSpan="'>  Добавление пользователей'"
  >
    <form @submit.prevent="onSubmit" class="form">
      <Input name="name" label="Название вашей компании" />
      <Input
        name="address"
        label="Адрес вашей компании"
        isLabelTooltip
        type="url_address"
      />
      <p class="text">
        Нажимая кнопку «Создать компанию» вы принимаете
        <NuxtLink to="#">Условия обслуживания</NuxtLink> в отношении продуктов
        ITL и соглашаетесь с
        <NuxtLink to="#">Политикой конфиденциальности.</NuxtLink>
      </p>
      <button class="btn">Создать компанию</button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import Input from "@/components/Input.vue";
import { CompanyScheme } from "@/utils/validation/CompanyScheme";

definePageMeta({
  layout: false,
});
components: {
  Input;
}

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: CompanyScheme,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const dto = {
      name: values.name,
      address: values.address,
    };
    router.push("/add_users");
  } catch (err) {
    console.warn(err);
    alert("Ошибка при создании компании");
  }
});
</script>

<style lang="scss" scoped></style>
