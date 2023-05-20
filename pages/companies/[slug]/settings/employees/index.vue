<template>
  <NuxtLayout name="main" title="Настройки / Пользователи" isPreTitle>
    <div class="block">
      <h2 class="title">Добавление пользователей</h2>
      <div class="text">За каждым успехом стоит команда! Пригласите свою команду и начните создавать отличные вещи
        вместе.
      </div>
      <NuxtLink :to="`${route.path}/add`" class="btn">Пригласить пользователей</NuxtLink>
    </div>

    <div class="block">
      <h2 class="title">Список пользователей</h2>
      <table class="table">
        <thead>

        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const route = useRoute();
</script>

<style lang="scss" scoped>
.block {
  .title {
    margin-bottom: 33px;
  }
  .text {
    margin-bottom: 27px;
  }
}
</style>
