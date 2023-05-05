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
                v-for="item in itemsList"
                :key="item.id"
                @click="() => setActiveItem(index)"
              >
                <svg-icon :name="item.name" />
              </li>
            </ul>
          </div>
        </div>

        <div class="popup" :class="{ active: activeItem }">
          <div class="popup__inner">
            <h3 class="popup__title">Профиль</h3>
            <ul>
              <li class="popup__item">
                <NuxtLink to="/">
                  <svg-icon name="home" />
                  <p>Редактировать</p>
                </NuxtLink>
              </li>
              <li class="popup__item">
                <NuxtLink to="/">
                  <svg-icon name="home" />
                  <p>Редактировать</p>
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
    { id: 1, name: "search" },
    { id: 1, name: "settings" },
  ],
  [
    { id: 1, name: "bell" },
    { id: 1, name: "tooltip" },
    { id: 1, name: "user" },
  ],
];

const activeItem = ref<null | number>(null);

const setActiveItem = (index: number) => {
  activeItem.value = index;
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
    width: 25px;
    height: 25px;
  }
  &:hover {
    background-color: $blue2;
  }
}
.nav__list:nth-child(1) {
  .nav__item:nth-child(1) svg {
    width: 31px;
    height: 31px;
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
  z-index: 30;
  width: 0px;
  background-color: $blue4;
  transition: 0.3s;
  .popup__inner {
    padding: 48px 16px 48px 32px;
    transform: translateX(-100px);
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
    .popup__inner {
      transform: translateX(0px);
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
