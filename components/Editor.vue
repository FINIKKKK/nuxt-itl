<template>
  <div ref="refEditor"></div>
</template>

<script lang="ts" setup>
import { OutputBlockData } from "@editorjs/editorjs";

const props = defineProps({
  initialValue: {
    type: Array,
    required: false,
  },
});
const emits = defineEmits(["data-change"]);

const refEditor = ref(undefined);
const editorData = ref<OutputBlockData[]>([]);

onMounted(async () => {
  const { default: EditorJS } = await import("@editorjs/editorjs");
  const { default: Header } = await import("@editorjs/header");
  const { default: List } = await import("@editorjs/list");
  const { default: Quote } = await import("@editorjs/quote");
  const { default: Table } = await import("@editorjs/table");
  const { default: Embed } = await import("@editorjs/embed");
  const { default: Image } = await import("@editorjs/image");
  const { default: CodeBox } = await import("@bomdi/codebox");
  const { default: Delimiter } = await import("@editorjs/delimiter");
  const { default: InlineCode } = await import("@editorjs/inline-code");
  const { default: LinkTool } = await import("@editorjs/link");
  const { default: SimpleImage } = await import("@editorjs/simple-image");
  const { default: CheckList } = await import("@editorjs/checklist");

  const editor = new EditorJS({
    holder: refEditor.value,
    placeholder: "Текст",
    tools: {
      header: Header,
      list: List,
      codeBox: CodeBox,
      linkTool: LinkTool,
      embed: Embed,
      quote: Quote,
      checklist: CheckList,
      delimiter: Delimiter,
      inlineCode: InlineCode,
      simpleImage: SimpleImage,
      table: Table,
    },
    data: {
      blocks: props.initialValue
        ? (props.initialValue as OutputBlockData[])
        : [],
    },
    async onChange() {
      const { blocks } = await editor.save();
      editorData.value = blocks;
    },
  });
});

watch(editorData, (newData) => {
  emits("data-change", newData);
});
</script>

<style lang="scss">
.codex-editor {
  min-height: 350px;
}
.ce-block__content {
  max-width: 100%;
  padding-left: 70px;
}
.ce-toolbar__content {
  max-width: 100%;
  margin-left: 60px;
}
</style>
