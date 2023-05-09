<template>
  <div class="comment">
    <Avatar :user="props.comment.user" class="avatar" />
    <div class="content">
      <div class="info">
        <div class="name">
          {{ `${props.comment.user.firstName} ${props.comment.user.lastName}` }}
        </div>
        <div class="date">{{ useFormatDate(props.comment.created_at) }}</div>
      </div>
      <p class="text">{{ props.comment.text }}</p>
      <div class="controls">
        <div class="like">
          <svg-icon name="like" />
          3
        </div>
        <button>Ответить</button>
        <button>Удалить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFormatDate } from "~/hooks/useFormatDate";
import Avatar from "~/components/Avatar.vue";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: start;
  &:not(:last-child) {
    margin-bottom: 40px;
  }
}
.avatar {
  margin-right: 16px;
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
  button {
    &:not(:last-child) {
      margin-right: 32px;
    }
    transition: 0.3s;
    color: $blue5;
    &:hover {
      color: $blue;
    }
  }
}
</style>
