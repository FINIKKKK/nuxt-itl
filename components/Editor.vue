<template>
  <div ref="refEditor"></div>
</template>

<script lang="ts" setup>
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";

const props = defineProps({
  // editorData: {
  //   type: Array,
  //   required: false,
  // },
  initialValue: {
    type: Array,
    required: false,
  },
});

const refEditor = ref(null);
const editorData = ref(null);

const emits = defineEmits(["data-change"]);

onMounted(async () => {
  const { default: EditorJS } = await import("@editorjs/editorjs");
  const { default: Header } = await import("@editorjs/header");
  const { default: List } = await import("@editorjs/list");
  const { default: Quote } = await import("@editorjs/quote");

  const editorInstance = new EditorJS({
    holder: refEditor.value,
    placeholder: "Текст",
    tools: {
      header: Header,
      list: List,
      quote: Quote,
    },
    data: {
      blocks: props.initialValue ? props.initialValue : [],
    },
    async onChange() {
      const { blocks } = await editorInstance.save();
      editorData.value = blocks;
    },
  });
});

watch(editorData, (newData) => {
  // Emit an event to notify the parent component about the data change
  emits('data-change', newData);
});
</script>

<style lang="scss" scoped></style>
