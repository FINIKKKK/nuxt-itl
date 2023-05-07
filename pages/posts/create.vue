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
      <p>gg: {{ bodyValue }}</p>
      <button v-if="titleValue" class="btn">Создать</button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from "~/api";
import Editor from "~/components/Editor.vue";
import { PostScheme } from "~/utils/validation/PostScheme";

definePageMeta({
  layout: false,
});
components: {
  Editor;
}

const titleValue = ref("");
const bodyValue = ref([]);
const errors = ref(null);

const onSubmit = async () => {
  try {
    const dto = {
      title: titleValue.value,
      body: bodyValue.value,
    };
    await PostScheme.validate(dto, { abortEarly: false });
    const post = await Api().post.create(dto);
    console.log(post);
  } catch (err) {
    if (err.inner) {
      const errors1 = {};
      err.inner.forEach((error) => {
        errors1[error.path] = error.message;
      });
      errors.value = errors1;
    }
  }
};

const setBodyValue = (vl) => {
  bodyValue.value = vl;
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
</style>
