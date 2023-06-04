<template>
  <div class="comment">
    <Avatar :user="props.comment.author" class="avatar" />
    <div class="content">
      <div class="info">
        <div class="name">
          {{
            `${props.comment.author.firstName} ${props.comment.author.lastName}`
          }}
        </div>
        <div class="date">{{ useFormatDate(props.comment.created_at) }}</div>
      </div>
      <p class="comment__text">{{ comment.text }}</p>
      <div class="comment__controls">
        <div class="like">
          <svg-icon name="like" />
          0
        </div>
        <button
          class="btn-inline"
          @click="onReplyComment"
          :class="{ disabled: isLoading }"
        >
          {{ !isAnswer ? 'Ответить' : 'Закрыть' }}
        </button>
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

<script lang="ts" setup>
import { useFormatDate } from '~/hooks/useFormatDate';
import { Api } from '~/api';
import { TComment } from '~/api/models/comment/types';
import { useUserStore } from '~/stores/UserStore';
import Textarea from '~/components/UI/Textarea.vue';
import Avatar from '~/components/UI/Avatar.vue';

const props = defineProps<{
  comment: TComment;
}>();

const emits = defineEmits(['deleteComment', 'onReplyComment']);

const isLoading = ref(false);
const isAnswer = ref(false);
const replyValue = ref('');
const userStore = useUserStore();

const setReplyValue = (value: string) => {
  replyValue.value = value;
};

const onDeleteComment = async () => {
  if (window.confirm('Вы точно хотите удалить комментарий?')) {
    try {
      isLoading.value = true;
      await Api().comment.remove(props.comment.id);
      emits('deleteComment', props.comment.id);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удалении комментария');
    } finally {
      isLoading.value = false;
    }
  }
};
const onReplyComment = async () => {
  emits('replyComment', props.comment.author);
};
</script>

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
