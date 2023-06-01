<template>
  <NuxtLayout name="item" type="post" :data="post">
    <!--------------------------------------
    Дополнительные элементы
    ---------------------------------------->
    <div class="post__footer">
      <!-- Кнопка лайка" -->
      <div class="like" @click="onLike" :class="{ disabled: isLoading }">
        <svg-icon :name="isLike || post.isLike ? 'like2' : 'like'" />
        <p>Мне нравиться</p>
      </div>
      <!-- Тэги -->
      <ul class="tags">
        <li class="tag">Мой тег</li>
        <li class="tag">Мой тег</li>
      </ul>
    </div>

    <!--------------------------------------
    Комментарии
    ---------------------------------------->
    <Comments :post_id="route.params.id" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from '~/api';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут

/**
 * Пользоветльские переменные ----------------
 */
const postId = Number(route.params.id); // Id поста
const isLoading = ref(false); // Загрузка

/**
 * Хуки ----------------
 */
// Получение данных поста
const { data: post } = useAsyncData(async () => {
  const { data } = await Api().post.getOne(postId);
  return data;
});

const isLike = ref(post.isLike); // Лайкнут ли пост?

/**
 * Методы ----------------
 */
// Лайкнуть или убрать лайк
const onLike = async () => {
  try {
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      item_id: postId,
      type: 'post',
    };
    // Добавить в понравившееся
    await Api().like.addOrRemove(dto);
    // Установить, как отмеченное
    isLike.value = !isLike.value;
  } catch (err) {
    console.warn(err);
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};
</script>

<style lang="scss" scoped></style>
