<template>
  <NuxtLayout name="main" title="Настройки /
Внешние интеграции" isMiniTitle>
    <div class="block">
      <button class="btn">Добавить приложение</button>
    </div>

    <div class="block block__table">
      <h2 class="title">Подключенные интеграции
      </h2>
      <table class="table">
        <thead>
        <tr>
          <th>Домен</th>
          <th>Тип приложения</th>
          <th>Дата подключения</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>

</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

</script>

<style lang="scss" scoped>

</style>
