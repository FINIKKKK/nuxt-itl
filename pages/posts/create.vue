<template>
  <NuxtLayout name="main" title="Добавить пост">
    <form @submit.prevent="onSubmit">
      <div class="input">
        <input
          v-model="titleValue"
          class="title"
          type="text"
          placeholder="Заголовок"
        />
        <span class="error">{{ errors?.title }}</span>
      </div>
      <div class="input">
        <Editor @data-change="setBodyValue" />
        <span class="error">{{ errors?.body }}</span>
      </div>
      <button v-if="titleValue" class="btn" :class="{ disabled: isLoading }">
        Создать
      </button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from "~/api";
import Editor from "~/components/Editor.vue";
import { OutputBlockData } from "@editorjs/editorjs";
import { PostScheme } from "~/utils/validation/PostScheme";

// export type TError = {
//   title: str;
// };

definePageMeta({
  layout: false,
});
components: {
  Editor;
}

const titleValue = ref("");
const bodyValue = ref<OutputBlockData[]>([]);
const errors = ref({});
const isLoading = ref(false);

const onSubmit = async () => {
  try {
    isLoading.value = true;
    const dto = {
      title: titleValue.value,
      body: bodyValue.value,
    };
    await PostScheme.validate(dto, { abortEarly: false });
    const post = await Api().post.create(dto);
  } catch (err: any) {
    if (err.inner) {
      const errorsMessages: Record<string, string> = {};
      err.inner.forEach((error: { path: string; message: string }) => {
        errorsMessages[error.path] = error.message;
      });
      errors.value = errorsMessages;
    }
  } finally {
    isLoading.value = false;
  }
};

const setBodyValue = (value: OutputBlockData[]) => {
  bodyValue.value = value;
};
</script>

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 25px;
  }
}
.title {
  width: 100%;
  font-size: 24px;
}
.codex-editor {
  background-color: red;
}
</style>
