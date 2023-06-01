<template>
  <div class="item">
    <!-- Иконка -->
    <svg-icon :name="props.type === 'section' ? 'folder' : 'document2'" />
    <!-- Заголовок -->
    <div class="item__info">
      <NuxtLink :to="linkItem">
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
    <div class="controls">
      <NuxtLink :to="`${linkItem}/edit`" class="control">
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

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TPost | TSection;
  type: string;
}>();

/**
 * Системные переменные ----------------
 */
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Вычисляемые значения ----------------
 */
// Ссылка элемента
const linkItem = computed(() => {
  return `/companies/${
    props.data.company
      ? props.data.company.slug
      : companyStore.activeCompany?.slug
  }/${props.type === 'section' ? 'sections' : 'posts'}/${props.data.id}`;
});
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
  .control {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    &:not(:last-child) {
      margin-right: 25px;
    }
    svg {
      width: 18px;
      height: 18px;
      margin-right: 12px;
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
