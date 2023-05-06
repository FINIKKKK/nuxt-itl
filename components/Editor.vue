<template>
  <div ref="refEditor"></div>
</template>

<script lang="ts" setup>
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";

const refEditor = ref(null);

onMounted(async() => {
  const { default: EditorJS } = await import('@editorjs/editorjs');
  const { default: Header } = await import('@editorjs/header');
  const { default: List } = await import('@editorjs/list');
  const { default: Quote } = await import('@editorjs/quote');

  const editorInstance = new EditorJS({
    holder: refEditor.value,
    autofocus: true,
    tools: {
      header: Header,
      list: List,
      quote: Quote,
    },
    data: {},
  });
});
</script>

<style lang="scss" scoped></style>
