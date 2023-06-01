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
          + В зависимости от условия, показывать или скрывать
         -->
        <li
          v-show="isShowItem(item)"
          v-for="(item, index) in itemsList"
          class="item"
          :class="{
            active: props.activeItem === item, // Если это активный элемент
            link: isTooltip(item), // Если это ссылка
          }"
          :key="index"
          @click="setActiveItem(item)"
        >
          <!-- Если это tooltip, то показывать ссылку -->
          <a
            v-if="isTooltip(item)"
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
import { useCompanyStore } from '~/stores/CompanyStore';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  activeItem: string | null;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['setActiveItem']);

/**
 * Системные переменные ----------------
 */
const config = useRuntimeConfig(); // Конфиг
const userStore = useUserStore(); // Хранилище пользователя
const companyStore = useCompanyStore(); // Хранилище активной компании
const route = useRoute(); // Роут

/**
 * Пользовательские переменные ----------------
 */
// Массив элементов сайдбара
const items = Object.values(config.public.sidebar).map((list) =>
  Object.values(list).map((name) => name as string),
);

/**
 * Вычисляемые значения ----------------
 */
// Показываеть элемент сайдбара
const isShowItem = computed(() => (item: string) => {
  // Получаем роль пользователя в компании
  const role = companyStore.activeCompany?.pivot.role_id;

  // Если есть активная компания, то показываем только tooltip и профиль
  if (
    companyStore.activeCompany ||
    item === config.public.sidebar.list2.tooltip ||
    item === config.public.sidebar.list2.user
  ) {
    // Если роль - модератор
    if (role === 1) {
      // Показываем всё
      return true;
    }
    // Если роль - админ
    else if (role === 2) {
      // Не показываем только настройки
      return item !== config.public.sidebar.list2.settings;
    }
    // Если роль - обычный пользователь
    else {
      // Не показываем добавление элементов и настройки
      return !(
        item === config.public.sidebar.list1.add ||
        item === config.public.sidebar.list2.settings
      );
    }
  }
});
// Если элемент это tooltip
const isTooltip = computed(
  () => (item: string) => item === config.public.sidebar.list2.tooltip,
);

/**
 * Методы ----------------
 */
// Установить активный элемент в сайдбаре
const setActiveItem = (item: string) => {
  if (item !== config.public.sidebar.list2.tooltip) {
    emits('setActiveItem', item);
  }
};
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
