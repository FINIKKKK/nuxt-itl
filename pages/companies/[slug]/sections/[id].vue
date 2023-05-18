<template>
    <NuxtLayout name="main" :title="section?.title" type="section">
        <div class="controls">
            <svg-icon class="control" @click="router.push(`/sections/edit/${section?.id}`)" name="edit"/>
            <svg-icon class="control" name="attach"/>
            <svg-icon class="control" name="lock"/>
            <svg-icon class="control" name="share"/>
            <svg-icon class="control" @click="onDelete" name="remove"/>
        </div>

        <div class="post__header">
            <svg-icon class="favorite" name="favorite"/>
            <h1 class="title">{{ section.title }}</h1>
        </div>
        <ul class="post__info">
            <li class="post__info-item">
                Автор:
                <span>{{ `${section?.user.firstName} ${section?.user.lastName}` }}</span>
            </li>
            <li class="post__info-item">
                Опубликовано:
                <span>{{ section?.created_at && useFormatDate(section?.created_at) }}</span>
            </li>
        </ul>
        <Body class="body" :data="section"/>

        <div class="works">
            <ul class="items">
                <li class="item" v-for="section in section.data.sections">
                    <svg-icon name="folder"/>
                    <div class="item__info">
                        <NuxtLink :to="`/companies/${userStore.activeCompany[0].slug}/sections/${section.id}`">{{ section.title }}</NuxtLink>
                        <div class="date">Опубликовано: <span>{{ useFormatDate(section.created_at) }}</span></div>
                    </div>
                </li>
            </ul>
            <ul class="items">
                <li class="item" v-for="post in section.data.posts">
                    <svg-icon name="document"/>
                    <div class="item__info">
                        <NuxtLink :to="`/companies/${userStore.activeCompany[0].slug}/posts/${post.id}`">{{ post.title }}</NuxtLink>
                        <div class="date">Опубликовано: <span>{{ useFormatDate(post.created_at) }}</span></div>
                    </div>
                </li>
            </ul>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: false,
});

import {Api} from "~/api";
import {useFormatDate} from "~/hooks/useFormatDate";
import Body from "~/components/Body.vue";
import {useUserStore} from "~/stores/UserStore";

const route = useRoute();
const {data: section} = useAsyncData(async () => {
    const id = route.params.id;
    const {data} = await Api().section.getOne(Number(id));
    return data;
});
const userStore = useUserStore();
const isLoading = ref(false);
const router = useRouter();

const onDelete = async () => {
    if (window.confirm("Вы точно хотите удалить пост?")) {
        try {
            isLoading.value = true;
            await Api().post.remove(Number(route.params.id));
            await router.push("/");
        } catch (err) {
            console.warn(err);
            alert("Ошибка при удаление раздела");
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
  border: 1px solid $blue5;
  border-radius: 2px;
  transition: 0.3s;

  &:hover {
    background-color: $blue4;
    border-color: transparent;
    color: $blue;
  }
}

.works {
  margin-top: 33px;
}

.item {
  display: flex;
  align-items: center;
  padding: 9px 12px;
  transition: 0.3s;
  border-radius: 3px;

  &:hover {
    background-color: $blue3;
  }

  svg {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }

  a {
    &:hover {
      text-decoration: none;
    }
  }

  .date {
    font-size: 12px;
    line-height: 14px;
    color: $gray;

    span {
      color: $black;
    }
  }
}
</style>
