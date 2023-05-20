<template>
  <NuxtLayout name="main" title="Настройки / Пользователи" isMiniTitle>
    <div class="block">
      <h2 class="title">Добавление пользователей</h2>
      <div class="text">За каждым успехом стоит команда! Пригласите свою команду и начните создавать отличные вещи
        вместе.
      </div>
      <NuxtLink :to="`${route.path}/add`" class="btn">Пригласить пользователей</NuxtLink>
    </div>

    <div class="block block__table">
      <h2 class="title">Список пользователей</h2>
      <table class="table">
        <thead>
        <tr>
          <th>Пользователь</th>
          <th>Последняя активность</th>
          <th>Статус</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="table__user">
            <svg-icon name="avatar"/>
            <div class="user-info">
              <div class="name">Иван Иванов</div>
              <div class="email">ivanivanov@gmail.com</div>
            </div>
          </td>
          <td>16.03.2019 16:28:02</td>
          <td>Выдан доступ</td>
          <td class="table__select">
            <Select :options="options" className="select" isMini/>
          </td>
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

const route = useRoute();
const options = [
  {id: 1, value: 'Администратор'},
  {id: 2, value: 'Модератор'}
]
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

.block__table {
  width: 100%;
}

.table {
  width: 100%;
  thead {
    color: $gray;
    text-align: left;
    border-bottom: 1px solid $gray2;
    font-size: 13px;
    td, th {
      padding-bottom: 10px;
    }
  }
  tbody td, th {
    padding-top: 19px;
    vertical-align: middle;
  }
}

.table__user {
  display: flex;
  align-items: center;
  svg {
    width: 28px;
    height: 28px;
    margin-right: 21px;
    fill: $gray;
  }
  .name {
    font-size: 15px;
  }
  .email {
    font-size: 11px;
    color: $gray;
  }
}

.table__select {
  width: 170px;
}
</style>
