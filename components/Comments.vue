<template>
  <div class="field">
    <Textarea
      label="Добавить комментарий"
      @value="setCommentValue"
      isCommentInput
    />
    <button
      v-if="commentValue"
      @click="onCreateComment"
      class="btn btn3"
      :class="{ disabled: isLoading }"
    >
      Отправить
    </button>
  </div>

  <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
</template>

<script lang="ts" setup>
import { Api } from "~/api";

const props = defineProps({
  post_id: {
    type: Number,
    required: true,
  },
});

const commentValue = ref("");
const isLoading = ref(false);

const { data: comments } = useAsyncData(async () => {
  const params = {
    post_id: props.post_id,
  };
  const comments = await Api().comment.getAll(params);
  return comments;
});

const setCommentValue = (value: string) => {
  commentValue.value = value;
};

const onCreateComment = async () => {
  try {
    isLoading.value = true;
    const dto = {
      text: commentValue.value,
      post_id: props.post_id,
    };
    const comment = await Api().comment.create(dto);
    comments.value && comments.value.unshift(comment);
    commentValue.value = "";
  } catch (err) {
    console.warn(err);
    alert("Ошибка при создании комментария");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.field {
  position: relative;
  margin-bottom: 40px;
  .btn {
    position: absolute;
    top: 11px;
    right: 15px;
  }
}
</style>
