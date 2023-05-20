<template>
  <NuxtLayout name="main" title="Настройки / Общие" isMiniTitle>
    <div class="block">
      <h2 class="title">Профиль компании</h2>
      <Input placeholder="Название компании"/>
      <Input placeholder="Адрес сайта"/>
      <p class="text">
        Поделитесь ссылкой
        <NuxtLink to="">название_компании.itl.wiki</NuxtLink>
        чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше рабочее пространство.
      </p>
    </div>

    <div class="block disabled">
      <div class="block__header">
        <h2 class="title">Разрешенные почтовые домены</h2>
        <span class="title__tag">Скоро</span>
      </div>
      <Input placeholder="Введите домен"/>
      <div class="text">Любой, кто имеет адрес электронной почты в этих доменах, может автоматически присоединиться к
        вашей компании.
      </div>
    </div>

    <div class="block">
      <h2 class="title">Региональные настройки</h2>
      <div class="select__item">
        <label>Язык интерфейса</label>
        <Select :options="options1" className="select"/>
      </div>
      <div class="select__item">
        <label>Формат даты</label>
        <Select :options="options2" className="select"/>
      </div>
    </div>

    <button class="btn">Сохранить настройки</button>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const options1 = [{id: 1, value: 'Русский'}]
const options2 = [{id: 1, value: 'День месяц'}]
</script>

<style lang="scss" scoped>
.block.disabled {
  pointer-events: none;
  .title, .input, .text {
    opacity: 0.5;
  }
  .title {
    margin-bottom: 0;
  }
}

.block__header {
  display: flex;
  align-items: center;
  margin-bottom: 41px;
}

.title__tag {
  font-size: 13px;
  line-height: 20px;
  padding: 3px 9px;
  border-radius: 2px;
  margin-left: 10px;
  background-color: $blue4;
}

.select__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 40px;
  }
  .select {
    width: 320px;
  }
}
</style>
