<template>
  <!--------------------------------------
   Поле ввода 
  -------------------------------------->
  <div class="field">
    <!-- Поле ввода -->
    <div class="input">
      <div class="inner">
        <textarea
          placeholder="Добавить комментарий"
          ref="textareaRef"
          v-model="commentValue"
          maxlength="250"
        ></textarea>
      </div>
    </div>

    <!-- Элементы управления -->
    <div class="field__controls">
      <svg-icon class="set_user" name="@" />
      <button
        @click="onCreateComment"
        class="btn btn3"
        :class="{ disabled: isLoading }"
      >
        Отправить
      </button>
    </div>
  </div>

  <!--------------------------------------
   Список комментариев
  -------------------------------------->
  <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import Textarea from '~/components/UI/Textarea.vue';
import Comment from '~/components/Comments/Comment.vue';

const route = useRoute();

/**
 * Пользовательские переменные ----------------
 */
const isLoading = ref(false); // Загрузка
const textareaRef = ref<HTMLTextAreaElement | null>(null); // Ссылка на html элемент поле ввода
const commentValue = ref('');
const postId = Number(route.params.id);

watch(commentValue, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '65px';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
});

/**
 * Хуки ----------------
 */
// Получение комментариев
const { data: comments } = useAsyncData(async () => {
  const params = {
    post_id: postId,
  };
  const { data } = await Api().comment.getAll(params);
  return data;
});

/**
 * Методы ----------------
 */
// Создание комментария
const onCreateComment = async () => {
  try {
    isLoading.value = true;
    const dto = {
      text: commentValue.value,
      post_id: postId,
    };
    const { data } = await Api().comment.create(dto);
    comments.value && comments.value.unshift(data);
    commentValue.value = '';
  } catch (err) {
    console.warn(err);
    alert('Ошибка при создании комментария');
  } finally {
    isLoading.value = false;
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.field {
  position: relative;
  margin-bottom: 40px;
  textarea {
    font-size: 14px;
    line-height: 20px;
    height: 65px;
    padding: 25px 165px 15px 7px;
    overflow: hidden;
  }
  .field__controls {
    display: flex;
    align-items: center;
    position: absolute;
    top: 11px;
    right: 15px;
  }
  .set_user {
    width: 17px;
    height: 21px;
    cursor: pointer;
    margin-right: 23px;
  }
}
</style>