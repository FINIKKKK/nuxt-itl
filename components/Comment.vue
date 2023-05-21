<template>
  <div class="comment">
    <Avatar :user="comment.user" class="avatar" />
    <div class="content">
      <div class="info">
        <div class="name">
          {{ `${comment.user.firstName} ${comment.user.lastName}` }}
        </div>
        <div class="date">{{ useFormatDate(comment.created_at) }}</div>
      </div>
      <p class="text">{{ comment.text }}</p>
      <div class="controls">
        <div class="like">
          <svg-icon name="like" />
          0
        </div>
        <button
          class="inline_btn"
          @click="isAnswer = !isAnswer"
          :class="{ disabled: isLoading }"
        >
          {{ !isAnswer ? 'Ответить' : 'Закрыть' }}
        </button>
        <button
          v-if="user?.id === comment.user.id"
          class="inline_btn"
          @click="onDeleteComment"
          :class="{ disabled: isLoading }"
        >
          Удалить
        </button>
      </div>
      <div v-if="isAnswer" class="reply">
        <Textarea
          label="Добавить комментарий"
          @value="setReplyValue"
          isCommentInput
        />
        <button @click="onReplyComment" class="btn">Отправить</button>
      </div>
      <div class="children">
        <Comment v-for="comment in comment.children" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFormatDate } from '~/hooks/useFormatDate';
import { Api } from '~/api';
import { TComment } from '~/api/models/comment/types';
import { useUserStore } from '~/stores/UserStore';

const props = defineProps<{
  comment: TComment;
}>();

const isLoading = ref(false);
const isAnswer = ref(false);
const replyValue = ref('');
const { user } = useUserStore();

const setReplyValue = (value: string) => {
  replyValue.value = value;
};

const onDeleteComment = async () => {
  if (window.confirm('Вы точно хотите удалить комментарий?')) {
    try {
      isLoading.value = true;
      await Api().comment.remove(props.comment.id);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удалении комментария');
    } finally {
      isLoading.value = false;
    }
  }
};
const onReplyComment = async () => {
  try {
    isLoading.value = true;
    const dto = {
      text: replyValue.value,
      post_id: props.comment.post_id,
      reply_id: props.comment.id,
    };
    await Api().comment.create(dto);
  } catch (err) {
    console.warn(err);
    alert('Ошибка при ответе на комментарий');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: start;
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

.text {
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

.controls {
  display: flex;
  align-self: start;
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