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

/**
 * Системные переменные ----------------
 */
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Получение данных ----------------
 */
// Мои посты
const { data: posts } = useAsyncData(async () => {
  const params = {
    company_id: companyStore.activeCompany?.id,
  };
  const { data } = await Api().post.getMine(params);
  return data;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin: -25px -15px 0;
}
</style>
