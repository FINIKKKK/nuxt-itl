<template>
  <NuxtLayout name="main" :title="navTitle" :isMiniTitle="true">
    <div v-if="props.data">
      <!--------------------------------------
      Элементы управления 
      ---------------------------------------->
      <div class="controls">
        <!-- Редактировать -->
        <NuxtLink
          class="control"
          :to="`${companyStore.activeCompanySlug}/${
            type === 'post' ? 'posts' : 'sections'
          }/edit/${props.data?.id}`"
        >
          <svg-icon name="edit" />
        </NuxtLink>
        <!-- Доступ -->
        <svg-icon class="control" name="lock" />
        <!-- Поделиться -->
        <svg-icon class="control" name="share" />
        <!-- Удалить -->
        <svg-icon class="control" name="remove" @click="onDelete" />
      </div>

      <!--------------------------------------
      Шапка элемента
      ---------------------------------------->
      <div class="post__header">
        <!-- Кнопка добавления в избранное -->
        <svg-icon
          v-if="type === 'post'"
          class="favorite"
          :name="isFavorite || props.data.isFavorite ? 'favorite2' : 'favorite'"
          @click="onFavorite"
          :class="{ disabled: isLoading }"
        />
        <!-- Заголовок -->
        <h1 class="title">{{ props.data.title }}</h1>
      </div>

      <!--------------------------------------
      Информация об элементе
      ---------------------------------------->
      <ul class="post__info">
        <!-- Автор -->
        <li class="post__info-item">
          Автор:
          <span>{{
            `${props.data?.author.firstName} ${props.data?.author.lastName}`
          }}</span>
        </li>
        <!-- Время -->
        <li
          class="post__info-item"
          v-html="useDateString(props.data.created_at, props.data.updated_at)"
        ></li>
      </ul>

      <!--------------------------------------
      Тело элемента
      ---------------------------------------->
      <!--      <Body class="body" :data="props.data.body" />-->

      <!--------------------------------------
      Слот шаблона
      ---------------------------------------->
      <slot />
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useDateString } from '~/hooks/useDateString';
import Body from '~/components/Editor/Body.vue';
import { useCompanyStore } from '~/stores/CompanyStore';
import { TSection } from '~/api/models/section/types';
import { TPost } from '~/api/models/post/types';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'post' | 'section';
  data: TSection | TPost;
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const companyStore = useCompanyStore(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const isLoading = ref(false); // Загрузка
const postId = Number(route.params.id); // id поста

/**
 * Пользовательские переменные ----------------
 */
const isFavorite = ref(props.data?.isFavorite); // Избранное
// const isLike = ref(props.data?.isLike); // Лайк

/**
 * Вычисляемые значения ----------------
 */
// Навигационный заголовок
const navTitle = computed(() => {
  // Если тип - пост
  if (props.type === 'post') {
    return props.data?.section.title;
  }
  // Если тип - раздел
  else {
    // Если есть родительский раздел или его нет
    return props.data?.parent ? props.data?.parent.title : props.data?.title;
  }
});

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Сообщение при удалении
  const message =
    props.type == 'post'
      ? 'Вы точно хотите удалить пост?'
      : 'Вы точно хотите удалить раздел?';

  // Подтверждение удаления
  if (window.confirm(message)) {
    try {
      isLoading.value = true; // Ставим загрузку
      // Проверка типа элемента
      if (props.type === 'post') {
        // Удаляем элемент
        await Api().post.remove(postId);
        // Перенапрвляем пользователя
        await router.push('/posts');
      } else if (props.type === 'section') {
        // Удаляем элемент
        await Api().section.remove(postId);
        // Перенапрвляем пользователя
        await router.push('/posts');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      isLoading.value = false; // Убираем загрузку
    }
  }
};

// Добавление в избранное
const onFavorite = async () => {
  try {
    isLoading.value = true; // Ставим загрузку
    // Объект с данными
    const dto = {
      item_id: postId,
      type: 'post',
    };
    // Добавить в избранное
    await Api().favorite.addOrRemove(dto);
    // Установить, как отмеченное
    isFavorite.value = !isFavorite.value;
  } catch (err) {
    console.warn(err);
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss">
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

.works {
  margin-top: 33px;
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
}
</style>
