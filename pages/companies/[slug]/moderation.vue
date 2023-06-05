<template>
  <NuxtLayout name="main" title="На модерации">
    <!-- Список статьей -->
    <ul class="items">
      <template v-for="post in posts">
        <!-- Статья -->
        <Item :data="post" type="post" @removeItem="removeItem" />
      </template>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCompanyStore } from '~/stores/CompanyStore';
import { Api } from '~/api';
import { useFetchData } from '~/hooks/useFetchData';

/**
 * Системные переменные ----------------
 */
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Получение данных ----------------
 */
// Посты на модерации
const posts = useFetchData(async () => {
  const params = {
    company_id: companyStore.activeCompany?.id,
  };
  return Api().post.getModeration(params);
});

/**
 * Методы ----------------
 */
// Удалить элемент (событие)
const removeItem = (value: number) => {
  posts.value = posts.value.filter((obj) => obj.id !== value);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin: 0px -15px;
}
</style>
