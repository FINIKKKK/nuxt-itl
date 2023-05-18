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
                                v-if="userStore.user"
                                v-for="(itemsList, index) in items"
                                :key="index"
                        >
                            <li
                                    class="nav__item"
                                    :class="{ active: activeItem === item.id && item.id !== 4, link: item.id === 4 }"
                                    v-for="item in itemsList"
                                    :key="item.id"
                                    v-show="userStore.activeCompany || item.id === 4 || item.id === 6"
                                    @click="() => setActiveItem(item.id)"
                            >
                                <a v-if="item.id === 4" href="https://help.itl.wiki/public/section/30" target="_blank">
                                    <svg-icon :name="item.name"/>
                                </a>
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

        <div class="content" :class="{section: props.type === 'section'}">
            <h1 class="title">
                <span>{{ props.title }}</span>
                <span v-if="props.title2">{{ props.title2 }}</span>
                <span v-if="props.title3">{{ props.title3 }}</span>
            </h1>
            <slot/>
        </div>
    </main>
</template>

<script lang="ts" setup>
import {useOutsideClick} from "~/hooks/useOutsideClick";
import {useUserStore} from "~/stores/UserStore";
import {items} from "~/utils/data/sidebar";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    title2: {
        type: String,
        required: false,
    },
    title3: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false
    }
});

const activeItem = ref<number | null>(1);
const popupRef = ref(null);
const route = useRoute();
const isShowPopup = ref(route.path.includes('/companies/') || false);
const isShowPopup2 = useOutsideClick(popupRef, activeItem);
const userStore = useUserStore();

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

    .title {
      margin-bottom: 36px;
    }
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
  width: 80px;
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

.title {
  font-size: 24px;
  margin-bottom: 130px;
  color: $gray2;

  span:nth-child(1) {
    color: $black;
  }

  span:not(:last-child) {
    position: relative;
    padding-right: 32px;
    margin-right: 20px;

    &::after {
      content: url("~/assets/img/arrow.svg");
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0;
    }
  }
}

.section {
  .title {
    font-size: 14px;
    margin-bottom: 40px;

    span {
      color: $gray !important;
    }
  }
}
</style>
