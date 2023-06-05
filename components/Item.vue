<template>
  <div class="item">
    <!-- Иконка -->
    <svg-icon :name="props.type === 'section' ? 'folder' : 'document2'" />
    <!-- Заголовок -->
    <div class="item__info">
      <NuxtLink :to="linkItem()">
        {{ props.data.title }}
        <span v-if="props.data.onModeration" class="tag">На модерации</span>
      </NuxtLink>
      <!-- Дата -->
      <div
        class="date"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></div>
    </div>

    <!-- Элементы управления -->
    <div class="controls" v-if="showControls">
      <div
        v-if="route.path.includes('/moderation')"
        class="btn control"
        :class="{ disabled: isLoading }"
        @click="onSubmit"
      >
        Опубликовать
      </div>
      <NuxtLink :to="linkItem(true)" class="control">
        <svg-icon name="edit" />
        <p>Правка</p>
      </NuxtLink>
      <!-- Доступ -->
      <div class="control">
        <svg-icon name="lock" />
        <p>У всех</p>
      </div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useDateString } from '~/hooks/useDateString';
import { TPost } from '~/api/models/post/types';
import { TSection } from '~/api/models/section/types';
import { useCompanyStore } from '~/stores/CompanyStore';
import { useHandleErrors } from '~/hooks/useHandleErrors';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TPost | TSection;
  type: string;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['removeItem']); // Хранилище активной компании

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const companyStore = useCompanyStore(); // Хранилище активной компании
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Вычисляемые значения ----------------
 */
// Ссылка элемента
const linkItem = computed(() => (isEdit?: boolean) => {
  return `/companies/${
    props.data.company
      ? props.data.company.slug
      : companyStore.activeCompany?.slug
  }/${props.type === 'section' ? 'sections' : 'posts'}${
    isEdit ? '/edit' : ''
  }/${props.data.id}`;
});
// Показывать элементы управления
const showControls = computed(() => {
  return (
    userStore.user?.id === props.data.user_id &&
    !route.path.includes('/sections')
  );
});

/**
 * Хуки ----------------
 */
// Для обработки ошибок
const { isLoading, handleSubmit } = useHandleErrors();

/**
 * Методы ----------------
 */
// Удалить элемент из модерации
const onSubmit = () => {
  handleSubmit(async () => {
    // Удалить элемент из модерации
    await Api().post.removeFromModeration(props.data.id);
    // События для удаления элемента из массива
    emits('removeItem', props.data.id);
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 9px 12px;
  transition: 0.3s;
  border-radius: 3px;
  &:hover {
    background-color: $blue3;
    .controls {
      opacity: 1;
    }
  }
  svg {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  a {
    margin-bottom: 5px;
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
  .tag {
    background-color: $blue5;
    border-radius: 2px;
    font-size: 11px;
    padding: 6px 9px;
    color: $black;
    margin-left: 12px;
  }
}

.controls {
  position: absolute;
  right: 17px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  opacity: 0;
  transition: 0.2s;
  .btn {
    background-color: $blue5;
    font-size: 13px;
    padding: 5px 10px;
    color: $blue;
    &:hover {
      background-color: $blue4;
    }
  }
  .control {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
    &:not(:last-child) {
      margin-right: 25px;
    }
    svg {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      flex: 0 0 auto;
    }
    p {
      font-size: 13px;
      transition: 0.3s;
      color: $black;
    }
    &:hover {
      p {
        color: $blue;
      }
    }
  }
}
</style>
