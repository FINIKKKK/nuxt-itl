<template>
  <div class="popup" :class="{ active: props.isShow }">
    <div class="popup__inner">
      <h3 class="popup__title">
        {{ props.activeItem && inner[props.activeItem - 1].title }}
      </h3>
      <ul>
        <li
          class="popup__item"
          v-if="props.activeItem"
          v-for="item in inner[props.activeItem - 1].items"
          :key="item.id"
        >
          <NuxtLink :to="item.link">
            <svg-icon :name="item.icon" />
            <p>{{ item.label }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  activeItem: {
    type: Number as () => number | null,
    required: true,
  },
});

const inner = [
  {
    title: "Ваша компания",
    items: [
      { id: 1, icon: "activation", label: "Активность", link: "/" },
      { id: 2, icon: "document", label: "Ваши работы", link: "/" },
      { id: 3, icon: "favorite", label: "Закладки", link: "/" },
    ],
  },
  {
    title: "Посты",
    items: [
      { id: 1, icon: "add", label: "Добавить", link: "/posts/create" },
      { id: 2, icon: "document", label: "Все посты", link: "/posts" },
    ],
  },
  {
    title: "Поиск",
    items: [{ id: 1, icon: "search", label: "Поиск", link: "/" }],
  },
  {
    title: "Настройки",
    items: [
      { id: 1, icon: "settings", label: "Общие", link: "/" },
      { id: 2, icon: "user", label: "Пользователи", link: "/add_users" },
    ],
  },
  {
    title: "Уведомления",
    items: [{ id: 1, icon: "bell", label: "Уведомления", link: "/" }],
  },
  {
    title: "Информация",
    items: [{ id: 1, icon: "tooltip", label: "Информация", link: "/" }],
  },
  {
    title: "Профиль",
    items: [
      { id: 1, icon: "edit", label: "Редактировать", link: "/profile" },
      { id: 2, icon: "logout", label: "Выйти", link: "/" },
    ],
  },
];
</script>

<style lang="scss" scoped>
.popup {
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  background-color: $blue4;
  transition: 0.3s;
  transform: translateX(-100%);
  .popup__inner {
    padding: 48px 16px 48px 32px;
    opacity: 0;
    transition: 0.3s;
  }
  .popup__title {
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 23px;
  }
  &.active {
    width: 256px;
    transform: translateX(0px);
    .popup__inner {
      opacity: 1;
    }
  }
}
.popup__item {
  transition: 0.3s;
  margin-left: -16px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
  svg {
    width: 22px;
    height: 22px;
    margin-right: 8px;
    fill: $blue;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: $black;
  }
  &:hover {
    background-color: $blue4;
    a {
      text-decoration: none;
    }
  }
  .router-link-active {
    background-color: $blue4;
  }
}
</style>
