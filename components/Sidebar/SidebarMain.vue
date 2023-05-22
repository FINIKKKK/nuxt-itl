<template>
  <div class="main">
    <!-- Logo -->
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/logo.svg" alt="logo" />
    </NuxtLink>

    <!-- Список навигации -->
    <div class="lists">
      <!-- 
        Верхний и нижний список
        + Если пользователь вошел
       -->
      <ul
        class="list"
        v-if="userStore.user"
        v-for="(itemsList, index) in items"
        :key="index"
      >
        <!-- 
          Элемент навигации в списке
          + Если
         -->
        <li
          v-show="isShowItem"
          v-for="(item, index) in itemsList"
          class="item"
          :class="{
            active: activeItem === item, // Если это активный элемент
            link: isToolTip(item), // Если это ссылка
          }"
          :key="index"
          @click="emits('setActiveItem', item)"
        >
          <!-- Если это tooltip, то показывать ссылку -->
          <a
            v-if="isToolTip(item)"
            href="https://help.itl.wiki/public/section/30"
            target="_blank"
          >
            <svg-icon :name="item" />
          </a>

          <svg-icon v-else :name="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserStore';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  activeItem: string;
}>();

/**
 * События (эмиты) ----------------
 */
const emits = defineEmits(['setActiveItem']);

/**
 * Системные переменные ----------------
 */
const config = useRuntimeConfig();
const userStore = useUserStore();
const route = useRoute();

/**
 * Вычисляемые значения ----------------
 */
// Если элемент не tooltip, не user, пользователь не находиться на главной станице и нет активной компании
const isShowItem = computed(() => {
  return (
    (route.path !== '/' && userStore.activeCompany) ||
    props.activeItem !== config.public.sidebar.list2.tooltip ||
    props.activeItem !== config.public.sidebar.list2.user
  );
});
// Если элемент это tooltip
const isToolTip = computed(
  () => (item: string) => item === config.public.sidebar.list2.tooltip,
);

/**
 * Пользовательские переменные ----------------
 */
// Массив элементов сайдбара
const items = Object.values(config.public.sidebar).map((list) =>
  Object.values(list).map((name) => name as string),
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.main {
  background-color: $blue;
  z-index: 40;
  padding: 32px 0 38px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-bottom: 50px;
  }
}

.lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .list {
    width: 100%;
  }
}

.item {
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