<template>
    <main :class="{home: route.path === '/'}">
        <aside class="sidebar" ref="popupRef">
            <nav class="nav">
                <div class="nav__main">
                    <NuxtLink to="/" class="logo">
                        <img src="~/assets/img/logo.svg" alt="logo"/>
                    </NuxtLink>
                    <div class="nav__lists">
                        <ul
                                class="nav__list"
                                v-for="(itemsList, index) in items"
                                :key="index"
                        >
                            <li
                                    class="nav__item"
                                    :class="{ active: activeItem === item.id, link: item.id === 4 }"
                                    v-for="item in itemsList"
                                    :key="item.id"
                                    v-show="userStore.activeCompany || item.id === 4 || item.id === 6"
                                    @click="() => setActiveItem(item.id)"
                            >
                                <NuxtLink v-if="item.id === 4" to="https://help.itl.wiki/public/section/30">
                                    <svg-icon :name="item.name"/>
                                </NuxtLink>
                                <svg-icon v-else :name="item.name"/>
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
                {{ props.title }}
                <span v-if="props.titleSpan">{{ props.titleSpan }}</span>
            </h1>
            <slot/>
        </div>
    </main>
</template>

<script lang="ts" setup>
import {useOutsideClick} from "~/hooks/useOutsideClick";
import {useUserStore} from "~/stores/UserStore";

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
        {id: 1, name: "home"},
        {id: 2, name: "add"},
        {id: 3, name: "search"},
    ],
    [
        {id: 4, name: "tooltip"},
        {id: 5, name: "settings"},
        {id: 6, name: "user"},
    ],
];

const activeItem = ref<number | null>(null);
const popupRef = ref(null);
const isShowPopup = ref(false);
const isShowPopup2 = useOutsideClick(popupRef, activeItem);
const userStore = useUserStore();

const route = useRoute();

const setActiveItem = (id: number) => {
    if (activeItem.value === id) {
        isShowPopup.value = false;
        activeItem.value = null;
    } else {
        activeItem.value = id;
        isShowPopup.value = true;
    }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;

  &.home {
    background-color: $blue3;
  }
}

.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 46px 50px;
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
  width: 100px;
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
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 36px;

  span {
    color: $gray;
  }
}
</style>
