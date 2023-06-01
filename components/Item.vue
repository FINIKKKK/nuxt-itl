<template>
  <li class="item">
    <!-- Иконка -->
    <svg-icon :name="props.type === 'section' ? 'folder' : 'document2'" />
    <!-- Заголовок -->
    <div class="item__info">
      <NuxtLink :to="linkItem"> {{ props.data.title }}</NuxtLink>
      <!-- Дата -->
      <div
        class="date"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></div>
    </div>
  </li>
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
