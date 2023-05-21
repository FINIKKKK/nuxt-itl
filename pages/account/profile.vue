<template>
  <NuxtLayout name="main" title="Профиль / Редактирование" isMiniTitle>
    <div class="flex">
      <div class="left">
        <div class="block">
          <h2 class="title">Личные данные</h2>
          <Input placeholder="Имя"/>
          <Input placeholder="Фамилия"/>
          <Input placeholder="Email"/>
          <button class="btn">Сохранить настройки</button>
        </div>

        <div class="block">
          <h2 class="title">Безопасность</h2>
          <Input placeholder="Текущий пароль" type="password"/>
          <Input placeholder="Новый пароль" type="password"/>
          <Input placeholder="Повторить пароль" type="password"/>
          <button class="btn">Сохранить настройки</button>
        </div>
      </div>

      <div class="avatar">
        <svg-icon name="avatar"/>
        <div class="btn-inline">
          <span>Загрузить фото</span>
          <input type="file"/>
        </div>
        <p class="pretext">Используйте изображение размером не менее 256 на 256 пикселей в формате .jpg или .png</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 203px;
  text-align: center;
  margin-right: 50px;
  svg {
    width: 100px;
    height: 100px;
    fill: $blue4;
    margin-bottom: 25px;
  }
  .btn-inline {
    margin-bottom: 21px;
  }
}
</style>
