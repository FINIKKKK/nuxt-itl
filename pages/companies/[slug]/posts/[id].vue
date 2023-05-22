<template>
  <NuxtLayout name="main" :title="post?.title" type="section">
    <div class="controls">
      <svg-icon
        class="control"
        @click="router.push(`/posts/edit/${post?.id}`)"
        name="edit"
      />
      <svg-icon class="control" name="attach" />
      <svg-icon class="control" name="lock" />
      <svg-icon class="control" name="share" />
      <svg-icon class="control" @click="onDelete" name="remove" />
    </div>

    <div class="post__header">
      <svg-icon class="favorite" name="favorite" />
      <h1 class="title">{{ post.title }}</h1>
    </div>

    <ul class="post__info">
      <li class="post__info-item">
        Автор:
        <span>{{ `${post?.user.firstName} ${post?.user.lastName}` }}</span>
      </li>
      <li class="post__info-item">
        Опубликовано:
        <span>{{ post?.created_at && useFormatDate(post?.created_at) }}</span>
      </li>
    </ul>
    <Body class="body" :data="post.body" />
    <div class="post__footer">
      <div class="like">
        <svg-icon name="like" />
        <p>Мне нравиться</p>
      </div>
      <ul class="tags">
        <li class="tag">Мой тег</li>
        <li class="tag">Мой тег</li>
      </ul>
    </div>
    <Comments :post_id="id" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

import { Api } from '~/api';
import { useFormatDate } from '~/hooks/useFormatDate';
import Body from '~/components/Editor/Body.vue';
import { useUserStore } from '~/stores/UserStore';

const route = useRoute();
const id = route.params.id;
const { data: post } = useAsyncData(async () => {
  const { data } = await Api().post.getOne(Number(id));
  return data;
});
const { user } = useUserStore();
const isLoading = ref(false);
const router = useRouter();

const onDelete = async () => {
  if (window.confirm('Вы точно хотите удалить пост?')) {
    try {
      isLoading.value = true;
      await Api().post.remove(Number(route.params.id));
      router.push('/posts');
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удаление поста');
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  right: 50px;
  top: 46px;

  .control {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  svg {
    cursor: pointer;
    width: 35px;
    height: 35px;
    fill: $blue;
    padding: 7px;
    border-radius: 5px;

    &:hover {
      background-color: $blue4;
    }

    &.active {
      background-color: $blue4;
    }
  }
}

.post__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
}

.favorite {
  fill: $blue6;
  width: 14px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  left: -25px;

  &:hover {
    fill: $blue;
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
}

.post__info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.post__info-item {
  margin-right: 12px;
  color: $gray;

  span {
    color: $black;
  }
}

.body {
  margin-bottom: 50px;
}

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
}

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
</style>