<template>
  <NuxtLayout name="main" :title="post?.title">
    <ul class="post__info">
      <li class="post__info-item">
        Автор:
        <span>{{ `${post?.user.firstName} ${post?.user.lastName}` }}</span>
      </li>
      <li class="post__info-item">
        Опубликовано:
        <span>{{ post?.created_at && useFormatDate(post?.created_at) }}</span>
      </li>
      <svg-icon class="favorite" name="favorite" />
    </ul>
    <Body class="body" :data="post" />
    <div class="post__footer">
      <div class="like">
        <svg-icon name="like" />
        <p>Мне нравиться</p>
      </div>
      <ul class="tags">
        <li class="tag">Мой тег</li>
        <li class="tag">Мой тег</li>
      </ul>
    </div>

    <div class="field">
      <Textarea
        label="Добавить комментарий"
        @value="setCommentValue"
        isCommentInput
      />
      <button
        v-if="commentValue"
        @click="onCreateComment"
        class="btn"
        :class="{ disabled: isLoading }"
      >
        Отправить
      </button>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from "~/api";
import { useFormatDate } from "~/hooks/useFormatDate";
import Body from "~/components/Body.vue";
import Textarea from "~/components/Textarea.vue";

definePageMeta({
  layout: false,
});

const route = useRoute();
const { data: post } = useAsyncData(async () => {
  const id = route.params.id;
  const post = await Api().post.getOne(Number(id));
  return post;
});
const commentValue = ref("");
const isLoading = ref(false);

const setCommentValue = (value: string) => {
  commentValue.value = value;
};

const onCreateComment = async () => {
  try {
    isLoading.value = true;
    const dto = {
      text: commentValue.value,
      post_id: post.value.id,
    };
    const comment = await Api().comment.create(dto);
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
.post__info {
  margin-top: -35px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.post__info-item {
  margin-right: 24px;
  color: $gray;
  span {
    color: $black;
  }
}
.favorite {
  fill: $blue3;
  width: 18px;
  height: 32px;
  cursor: pointer;
  &:hover {
    fill: $blue;
  }
}
.body {
  margin-bottom: 50px;
}
.post__footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.like {
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    width: 15px;
    height: 20px;
    margin-right: 8px;
  }
  p {
    font-size: 13px;
    transition: 0.3s;
  }
  &:hover {
    p {
      color: $blue;
    }
  }
}
.tags {
  display: flex;
}
.tag {
  &:not(:last-child) {
    margin-right: 16px;
  }
  cursor: pointer;
  font-size: 13px;
  line-height: 16px;
  padding: 8px 16px;
  border: 1px solid $blue5;
  border-radius: 2px;
  transition: 0.3s;
  &:hover {
    background-color: $blue4;
    border-color: transparent;
    color: $blue;
  }
}
.field {
  position: relative;
  .btn {
    position: absolute;
    top: 15px;
    right: 24px;
    background-color: $blue;
    color: $white;
    padding: 11px 22px;
    &:hover {
      background-color: darken($blue, 10%);
    }
  }
}
</style>
