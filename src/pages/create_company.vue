<template>
  <NuxtLayout
    name="main"
    :title="'Создание компании'"
    :titleSpan="'>  Добавление пользователей'"
  >
    <form class="form">
      <Input name="name" label="Название вашей компании" />
      <Input
        name="address"
        label="Адрес вашей компании"
        isLabelTooltip
        isUrlAdress
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
import Input from "~/components/Input.vue";

definePageMeta({
  layout: false,
});
components: {
  Input;
}
</script>

<style lang="scss" scoped></style>
