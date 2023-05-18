<template>
  <NuxtLayout name="main" title="Все посты">
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Опубликовано</th>
          <th>Автор</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td class="table__title">
            <svg-icon name="document" />
            <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
          </td>
          <td class="table__date">{{ useFormatDate(post.created_at) }}</td>
          <td class="table__author">
            {{ `${post.user.firstName} ${post.user.lastName}` }}
          </td>
        </tr>
      </tbody>
    </table>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { Api } from "~/api";
import { useFormatDate } from "~/hooks/useFormatDate";

const { data: posts } = useAsyncData(async () => {
  const posts = await Api().post.getAll();
  return posts;
});
</script>

<style lang="scss" scoped>
.table {
  .table__title {
    max-width: 350px;
    display: flex;
    align-items: center;
    svg {
      fill: $blue;
      width: 24px;
      height: 24px;
      margin-right: 32px;
      flex: 0 0 auto;
    }
    color: $blue;
  }
  .table__date {
    min-width: 110px;
  }
  .table__author {
    color: $gray;
    min-width: 100px;
  }
}
</style>
