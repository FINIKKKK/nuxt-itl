<template>
  <main :class="{ home: route.path === '/' }">
    <aside class="sidebar" ref="popupRef">
      <nav class="nav">
        <SidebarMain @setActiveItem="setActiveItem" />

        <SidebarPopup :isShow="isShowPopup" :activeItem="activeItem" />
      </nav>
    </aside>

    <div class="content" :class="{ section: isMiniTitle }">
      <h4 class="pretitle" v-if="isMiniTitle">{{ title }}</h4>
      <h1 class="title" v-else>
        <span>{{ title }}</span>
        <span v-if="title2">{{ title2 }}</span>
        <span v-if="title3">{{ title3 }}</span>
      </h1>
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useUserStore } from '~/stores/UserStore';

const props = defineProps<{
  title: string;
  title2?: string;
  title3?: string;
  type?: string;
  isMiniTitle?: string;
  isPreTitle?: string;
}>();

const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUserStore();

const popupRef = ref(null);
const isShowPopup = ref(route.path.includes('/companies/') || false);
const activeItem = ref<string | null>(null);

useOutsideClick(popupRef, isShowPopup, activeItem);

const setIsShowPopup = (value: boolean) => {
  isShowPopup.value = value;
};

const setActiveItem = (item: string) => {
  if (activeItem.value === item) {
    isShowPopup.value = false;
    activeItem.value = null;
  } else {
    activeItem.value = item;
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

.nav {
  display: flex;
  height: 100%;
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
      content: url('~/assets/img/arrow.svg');
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

.pretitle {
  font-size: 13px;
  color: $gray;
  margin-bottom: 32px;
}
</style>