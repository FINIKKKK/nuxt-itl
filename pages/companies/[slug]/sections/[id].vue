<template>
  <NuxtLayout name="item" type="section" :data="section">
    <!--------------------------------------
    Разделы и статьи в текущем разделе
    ---------------------------------------->
    <div class="works">
      <div class="items">
        <template v-for="section in section.data.sections">
          <Item :data="section" type="section" />
        </template>
      </div>
      <div class="items">
        <template v-for="post in section.data.posts">
          <Item :data="post" type="post" />
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from '~/api';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут

/**
 * Хуки ----------------
 */
// Получение данных раздела
const { data: section } = useAsyncData(async () => {
  const { data } = await Api().section.getOne(Number(route.params.id));
  return data;
});
</script>

<style lang="scss" scoped></style>
