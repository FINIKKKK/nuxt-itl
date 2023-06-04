<template>
  <NuxtLayout name="item" type="post" :data="post">
    <!--------------------------------------
    Дополнительные элементы
    ---------------------------------------->
    <div class="post__footer">
      <!-- Кнопка лайка" -->
      <div class="like" @click="onLike" :class="{ disabled: isLoading }">
        <svg-icon :name="isLike ? 'like2' : 'like'" />
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
    <Comments />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from '~/api';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут

/**
 * Получение данных ----------------
 */
const postId = Number(route.params.id); // Id поста
// Данные поста
const { data: post } = useAsyncData(async () => {
  const { data } = await Api().post.getOne(postId);
  isLike.value = data.isLike;
  return data;
});

/**
 * Пользовательские переменные ----------------
 */
const isLoading = ref(false); // Загрузка
const isLike = ref(false); // Лайкнут ли пост?

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

<style lang="scss" scoped>
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
  .tag {
    &:not(:last-child) {
      margin-right: 16px;
    }
    cursor: pointer;
    font-size: 13px;
    line-height: 16px;
    padding: 8px 16px;
    border: 1px solid $blue6;
    border-radius: 2px;
    transition: 0.3s;
    &:hover {
      background-color: $blue4;
      border-color: transparent;
      color: $blue;
    }
  }
}
</style>
