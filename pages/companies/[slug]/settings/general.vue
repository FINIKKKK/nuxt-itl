<template>
  <NuxtLayout name="main" title="Настройки">
    <div class="block">
      <h2 class="title">Профиль компании</h2>
      <Input label="Название компании"/>
      <Input label="Адрес сайта"/>
      <p class="text">
        Поделитесь ссылкой
        <NuxtLink to="">название_компании.itl.wiki</NuxtLink>
        чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше рабочее пространство.
      </p>
    </div>

    <div class="block">
      <h2 class="title">Разрешенные почтовые домены</h2>
      <Input label="Введите домен"/>
      <div class="text">Любой, кто имеет адрес электронной почты в этих доменах, может автоматически присоединиться к
        вашей компании.
      </div>
    </div>

    <div class="block">
      <h2 class="title">Региональные настройки</h2>
      <div class="select__item">
        <label for=""></label>
        <select name="" id=""></select>
      </div>
    </div>

    <button class="btn">Сохранить настройки</button>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

</script>

<style lang="scss" scoped>

</style>
