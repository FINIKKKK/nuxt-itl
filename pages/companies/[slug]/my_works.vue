<template>
  <NuxtLayout name="main" title="Мои работы">
    <!-- Список статьей -->
    <ul class="items">
      <template v-for="post in posts">
        <!-- Статья -->
        <Item :data="post" type="post" />
      </template>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useCompanyStore } from '~/stores/CompanyStore';
import { useFetchData } from '~/hooks/useFetchData';

/**
 * Системные переменные ----------------
 */
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Получение данных ----------------
 */
// Мои посты
const posts = useFetchData(async () => {
  const params = {
    company_id: companyStore.activeCompany?.id,
  };
  return Api().post.getMine(params);
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin: 0px -15px;
}
</style>
