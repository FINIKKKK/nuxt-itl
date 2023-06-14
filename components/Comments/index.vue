<template>
  <!--------------------------------------
   Поле ввода 
  -------------------------------------->
  <div class="field">
    <!-- Поле ввода -->
    <div class="input" :class="{ reply: replyUser }">
      <div class="inner">
        <span v-if="replyUser" ref="refReplyUser">{{ replyUserValue }}</span>
        <textarea
          placeholder="Добавить комментарий"
          ref="textareaRef"
          v-model="commentValue"
          maxlength="250"
          :style="{ textIndent: replyUserWidth + 'px' }"
          @keydown="handleKeyDown"
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
        {{ isEdit ? 'Изменить' : 'Отправить' }}
      </button>
      <svg-icon
        v-if="isEdit"
        name="close"
        class="cancel"
        @click="onCancelEdit"
      />
    </div>
  </div>

  <!--------------------------------------
   Список комментариев
  -------------------------------------->
  <Comment
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    @deleteComment="onDeleteComment"
    @replyComment="onReplyComment"
    @edit="onEditComment"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import Textarea from '~/components/UI/Textarea.vue';
import Comment from '~/components/Comments/Comment.vue';
import { TUser } from '~/api/models/user/types';
import { TComment } from '~/api/models/comment/types';

const route = useRoute();

/**
 * Пользовательские переменные ----------------
 */
const isLoading = ref(false); // Загрузка
const textareaRef = ref<HTMLTextAreaElement | null>(null); // Ссылка на html элемент поле ввода
const commentValue = ref('');
const postId = Number(route.params.id);
const replyUser = ref(null);
const isEdit = ref(null);
const refReplyUser = ref(null);
// const replyUserWidth = ref(0);
const replyUserValue = computed(() => {
  return `@${replyUser.value.firstName} ${replyUser.value.lastName}`;
});

watch(commentValue, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '65px';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
});
// watch(replyUser, () => {
//   console.log(replyUser.value);
//   replyUserWidth.value = refReplyUser.value ? refReplyUser.value.offsetWidth : 0;
// });
const replyUserWidth = computed(() => {
    return refReplyUser.value ? refReplyUser.value.offsetWidth : 0;
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
const handleKeyDown = (e) => {
  if (e.keyCode === 8 && !commentValue.value) {
    replyUser.value = null;
  }
};
const onEditComment = (comment: TComment) => {
  isEdit.value = comment.id;
  commentValue.value = comment.text;
};
const onDeleteComment = (value: number) => {
  comments.value = comments.value.filter((obj) => obj.id !== value);
};
const onReplyComment = (value: TUser) => {
  replyUser.value = value;
  textareaRef.value.focus();
};

const onCancelEdit = () => {
  isEdit.value = false;
  commentValue.value = '';
};

// Создание комментария
const onCreateComment = async () => {
  try {
    isLoading.value = true;
    const dto = {
      text: commentValue.value,
      post_id: postId,
      ...(replyUser.value && { replyUser: replyUser.value.id }),
    };
    if (isEdit.value) {
      const { data } = await Api().comment.update(isEdit.value, dto);
      comments.value = comments.value.map((obj) =>
        isEdit.value === obj.id ? data : obj,
      );
      commentValue.value = '';
    } else {
      const { data } = await Api().comment.create(dto);
      comments.value.unshift(data);
      commentValue.value = '';
    }
  } catch (err) {
    console.log('gg');
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

  .input {
    position: relative;

    span {
      position: absolute;
      top: 25px;
      left: 5px;
      z-index: 10;
    }
  }

  textarea {
    font-size: 14px;
    line-height: 20px;
    height: 65px;
    padding: 25px 165px 15px 7px;
    overflow: hidden;
    transition: none;
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

  .cancel {
    margin-left: 15px;
    cursor: pointer;
    width: 15px;
    height: 15px;
    opacity: 0.5;
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
