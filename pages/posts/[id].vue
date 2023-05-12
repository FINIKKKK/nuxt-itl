<template>
  <NuxtLayout name="main" :title="post?.title">
    <div v-if="user?.id === post?.user.id" class="controls">
      <svg-icon name="edit" />
      <svg-icon name="close" />
    </div>

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
    <Comments :post_id="route.params.id" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { Api } from "~/api";
import { useFormatDate } from "~/hooks/useFormatDate";
import Body from "~/components/Body.vue";
import { useUserStore } from "~/stores/UserStore";

const route = useRoute();
const { data: post } = useAsyncData(async () => {
  const id = route.params.id;
  const post = await Api().post.getOne(Number(id));
  return post;
});
const { user } = useUserStore();
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  right: 30px;
  top: 30px;
  svg {
    cursor: pointer;
    width: 35px;
    height: 35px;
    fill: $blue;
    padding: 7px;
    border-radius: 5px;
    &.active {
      background-color: $blue4;
    }
  }
}
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
</style>
