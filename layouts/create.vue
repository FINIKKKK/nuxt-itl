<template>
    <form class="form" @submit.prevent="onSubmit">
        <div class="input">
            <input
                    v-model="titleValue"
                    class="title"
                    type="text"
                    placeholder="Заголовок статьи"
            />
            <span class="error">{{ errors?.title }}</span>
        </div>
        <div class="input">
            <Editor @data-change="setBodyValue"/>
            <span class="error">{{ errors?.body }}</span>
        </div>
        <button
                v-if="titleValue && bodyValue.length"
                class="btn"
                :class="{ disabled: isLoading }"
        >
            Создать
        </button>
    </form>
</template>

<script lang="ts" setup>
import {Api} from "~/api";
import {OutputBlockData} from "@editorjs/editorjs";
import {PostScheme} from "~/utils/validation/PostScheme";

const titleValue = ref("");
const bodyValue = ref<OutputBlockData[]>([]);
const errors = ref({});
const isLoading = ref(false);
const router = useRouter();

const onSubmit = async () => {
    try {
        isLoading.value = true;
        const dto = {
            title: titleValue.value,
            body: bodyValue.value,
        };
        await PostScheme.validate(dto, {abortEarly: false});
        const post = await Api().post.create(dto);
        router.push(`/posts/${post.id}`);
    } catch (err: any) {
        if (err) {
            console.warn(err);
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
    margin-bottom: 36px;
  }
}

.form {
  width: 900px;
  margin: 0 auto;
}

.title {
  width: 100%;
  font-size: 24px;
  line-height: 28px;

  &::placeholder {
    color: $gray;
  }
}

</style>
