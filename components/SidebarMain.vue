<template>
  <div class="nav__main">
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/logo.svg" alt="logo"/>
    </NuxtLink>

    <div class="nav__lists">
      <ul
          class="nav__list"
          v-if="userStore.user"
          v-for="(itemsList, index) in items"
          :key="index"
      >
        <li
            v-for="(item, index) in itemsList"
            class="nav__item"
            :class="{ active: activeItem === item, link: item === config.public.sidebarMain.list2.tooltip }"
            :key="index"
            @click="emits('setActiveItem', item)"
        >
          <!--            v-show="route.path !== '/' && userStore.activeCompany || index === 4 || index === 6"-->
          <a v-if="item === config.public.sidebarMain.list2.tooltip " href="https://help.itl.wiki/public/section/30"
             target="_blank">
            <svg-icon :name="item"/>
          </a>
          <svg-icon v-else :name="item"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/UserStore";

const props = defineProps<{
  activeItem: string
}>()
const emits = defineEmits(['setActiveItem'])

const config = useRuntimeConfig()
const userStore = useUserStore();
const route = useRoute();

const items = Object.values(config.public.sidebarMain).map(list => Object.values(list).map(name => (name as string)));
</script>

<style lang="scss" scoped>
.nav__main {
  background-color: $blue;
  z-index: 40;
  padding: 32px 0 38px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-bottom: 50px;
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

  &.link {
    padding: 0;

    a {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  svg {
    width: 22px;
    height: 22px;
    fill: $white;
  }

  &:hover {
    background-color: $blue2;
  }

  &.active {
    background-color: $blue2;
  }
}
</style>
