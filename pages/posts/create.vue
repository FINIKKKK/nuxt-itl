<template>
  <NuxtLayout name="main" title="Добавить пост">
    <Editor />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Editor from "~/components/Editor.vue";

definePageMeta({
  layout: false,
});
components: {
  Editor;
}
</script>

<style lang="scss" scoped></style>
