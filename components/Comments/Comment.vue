<template>
  <div class="comment">
    <!-- Аватарка -->
    <Avatar :user="props.comment.author" class="avatar" />

    <div class="content">
      <!-- Информация о комментарии -->
      <div class="info">
        <div class="name">
          {{
            `${props.comment.author.firstName} ${props.comment.author.lastName}`
          }}
        </div>
        <div class="date">{{ dateString }}</div>
      </div>

      <!-- Текст -->
      <p class="comment__text">
        <span v-if="props.comment.reply_user"
          >@{{
            props.comment.reply_user.firstName +
            ' ' +
            props.comment.reply_user.lastName
          }}</span
        >
        {{ props.comment.text }}
      </p>

      <!--------------------------------------
      Кнопки
      ---------------------------------------->
      <div class="comment__controls">
        <!-- Лайки -->
        <div class="like" @click="onLike">
          <svg-icon :name="isLike ? 'like2' : 'like'" />
          {{ likesCount }}
        </div>

        <!-- Ответить на комментарий -->
        <button
          class="btn-inline"
          @click="emits('replyComment', props.comment.author)"
          :class="{ disabled: isLoading }"
        >
          Ответить
        </button>

        <!-- Редактировать комментарий -->
        <button
          v-if="userStore.user?.id === props.comment.author.id"
          class="btn-inline"
          @click="emits('edit', props.comment)"
          :class="{ disabled: isLoading }"
        >
          Редактировать
        </button>

        <!-- Удалить комментарий -->
        <button
          v-if="userStore.user?.id === props.comment.author.id"
          class="btn-inline"
          @click="onDeleteComment"
          :class="{ disabled: isLoading }"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { TComment } from '~/api/models/comment/types';
import { useUserStore } from '~/stores/UserStore';
import Avatar from '~/components/UI/Avatar.vue';
import { useFormatDate } from '~/hooks/useFormatDate';
import { useHandleErrors } from '~/hooks/useHandleErrors';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  comment: TComment;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['deleteComment', 'onReplyComment', 'edit']);

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Храниолище данных пользователя

/**
 * Пользовательские переменные ----------------
 */
const isLike = ref(props.comment.isLike); // Есть ли лайк?

/**
 * Хуки ----------------
 */
const { isLoading, handleSubmit } = useHandleErrors(); // Для обработки ошибок

/**
 * Вычисляемые значения ----------------
 */
// Дата комментария
const dateString = computed(() => {
  if (props.comment.created_at !== props.comment.updated_at) {
    return `${useFormatDate(props.comment.updated_at)} (Изменено)`;
  } else {
    return useFormatDate(props.comment.created_at);
  }
});

/**
 * Методы ----------------
 */
// Удалить комментарий
const onDeleteComment = async () => {
  if (window.confirm('Вы точно хотите удалить комментарий?')) {
    handleSubmit(async () => {
      await Api().comment.remove(props.comment.id);
      emits('deleteComment', props.comment.id);
    });
  }
};
const onLike = async () => {
    handleSubmit(async () => {
      // Объект с данными
      const dto = {
        item_id: props.comment.id,
        type: 'comment',
      };
      // Добавить в понравившееся
      await Api().like.addOrRemove(dto);
      // Установить, как отмеченное
      isLike.value = !isLike.value;
      // Увеличиваем или уменьшаем количество лайков
      if(!isLike.value) {
        likesCount.value -= 1;
      } else {
        likesCount.value += 1;
      }
    });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.avatar {
  margin-right: 16px;
}

.content {
  width: 100%;
}

.date {
  color: $gray;
}

.info {
  margin-bottom: 24px;
}

.comment__text {
  margin-bottom: 32px;

  span {
    color: $blue;
  }
}

.like {
  display: flex;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;

  &:hover {
    color: $blue;
  }

  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
}

.comment__controls {
  display: flex;
  align-self: center;
  width: 100%;

  button {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}

.reply {
  margin-top: 25px;
  position: relative;
  width: 100%;

  .btn {
    position: absolute;
    top: 11px;
    right: 15px;
    background-color: $blue;
    color: $white;
    padding: 8px 22px;
    font-size: 12px;

    &:hover {
      background-color: darken($blue, 10%);
    }
  }
}

.children {
  margin-top: 35px;
}
</style>
