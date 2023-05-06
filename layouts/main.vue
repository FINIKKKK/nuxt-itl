<template>
  <main>
    <aside class="sidebar" ref="popupRef">
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
                v-for="(item, index1) in itemsList"
                :key="item.id"
                v-show="token || item.id === 6 || item.id === 7"
                @click="() => setActiveItem(item.id)"
              >
                <svg-icon :name="item.name" />
              </li>
            </ul>
          </div>
        </div>

        <SidebarPopup
          :isShow="isShowPopup && !isShowPopup2"
          :activeItem="activeItem"
        />
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
import SidebarPopup from "~/components/SidebarPopup.vue";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { useUserStore } from "~/stores/UserStore";

components: {
  SidebarPopup;
}
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

const activeItem = ref<null | number>(0);
const popupRef = ref(null);
const isShowPopup = ref(false);
const isShowPopup2 = useOutsideClick(popupRef, activeItem);
const { token } = useUserStore();

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
</style>
