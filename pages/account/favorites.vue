<template>
  <NuxtLayout name="main" title="Мое избранное">
    <!-- Список элементов в избранном в компании -->
    <div class="items" v-for="company in favoritesList">
      <!-- Заголовок компании -->
      <h3 class="title">{{ company.name }}.itl.wiki</h3>
      <!-- Список элементы -->
      <template v-for="favorite in company.favorites">
        <Item :data="favorite.favoritable" :type="favorite.type" />
      </template>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';

/**
 * Получени данных ----------------
 */
// Список элементов в избранном
const { data: favoritesList } = useAsyncData(async () => {
  const { data } = await Api().favorite.getAll();
  return data;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  &:not(:last-child) {
    margin-bottom: 25px;
  }
}

.title {
  margin-bottom: 15px;
  font-size: 16px;
  color: $gray;
}
</style>
