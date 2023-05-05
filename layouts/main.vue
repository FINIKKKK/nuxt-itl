<template>
  <main>
    <aside class="sidebar">
      <nav class="nav">
        <div class="nav__main">
          <NuxtLink to="/" class="logo">
            <img src="~/assets/img/logo.svg" alt="logo" />
          </NuxtLink>
          <div class="nav__lists">
            <ul
              class="nav__list"
              v-for="(itemsList, index) in items"
              :key="index"
            >
              <li
                class="nav__item"
                :class="{ active: activeItem === item.id }"
                v-for="item in itemsList"
                :key="item.id"
                @click="() => setActiveItem(item.id)"
              >
                <svg-icon :name="item.name" />
              </li>
            </ul>
          </div>
        </div>

        <div class="popup" :class="{ active: isShowPopup }">
          <div class="popup__inner">
            <h3 class="popup__title">
              {{ activeItem && inner[activeItem - 1].title }}
            </h3>
            <ul>
              <li
                class="popup__item"
                v-if="activeItem"
                v-for="item in inner[activeItem - 1].items"
                :key="item.id"
              >
                <NuxtLink to="{{item.link}}">
                  <svg-icon :name="item.icon" />
                  <p>{{ item.label }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>

    <div class="content">
      <h1 class="title">
        {{ title }} <span v-if="titleSpan">{{ titleSpan }}</span>
      </h1>
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  titleSpan: {
    type: String,
    required: false,
  },
});

const items = [
  [
    { id: 1, name: "home" },
    { id: 2, name: "add" },
    { id: 3, name: "search" },
  ],
  [
    { id: 4, name: "settings" },
    { id: 5, name: "bell" },
    { id: 6, name: "tooltip" },
    { id: 7, name: "user" },
  ],
];

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
      { id: 1, icon: "add", label: "Добавить", link: "/create_post" },
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
      { id: 2, icon: "user", label: "Пользователи", link: "/" },
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

const activeItem = ref<null | number>(0);
const isShowPopup = ref(false);

const setActiveItem = (index: number) => {
  if (activeItem.value === index) {
    isShowPopup.value = false;
    activeItem.value = null;
  } else {
    activeItem.value = index;
    isShowPopup.value = true;
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
}
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 100%;
  height: 100vh;
  padding: 40px;
  overflow: auto;
}
.logo {
  margin-bottom: 50px;
}
.nav {
  display: flex;
  height: 100%;
}
.nav__main {
  background-color: $blue;
  z-index: 40;
  padding: 32px 0 38px;
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav__lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.nav__list {
  width: 100%;
}
.nav__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
  svg {
    width: 30px;
    height: 30px;
    fill: $white;
  }
  &:hover {
    background-color: $blue2;
  }
  &.active {
    background-color: $blue2;
  }
}
.title {
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 56px;
  span {
    color: $gray;
  }
}
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
  &.active {
    background-color: $blue4;
  }
}
</style>
