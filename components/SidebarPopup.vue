<template>
    <div class="popup" :class="{ active: props.isShow && props.activeItem }">
        <div class="popup__inner">
            <h3 class="popup__title">
                {{ props.activeItem && inner.find(obj => obj.id === props.activeItem).title }}
            </h3>
            <ul>
                <li
                        class="popup__item"
                        v-if="props.activeItem"
                        v-for="item in inner.find(obj => obj.id === props.activeItem).items"
                        :key="item.id"
                >
                    <NuxtLink :to="item.link">
                        <svg-icon :name="item.icon"/>
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
        id: 1,
        title: "Ваша компания",
        items: [
            {id: 1, icon: "activation", label: "Активность", link: "/"},
            {id: 2, icon: "document", label: "Ваши работы", link: "/"},
            {id: 3, icon: "favorite", label: "Закладки", link: "/"},
        ],
    },
    {
        id: 2,
        title: "Посты",
        items: [
            {id: 1, icon: "document", label: "Статью", link: "/posts/create"},
            {id: 2, icon: "ащдвук", label: "Раздел", link: "/posts"},
        ],
    },
    {
        id: 3,
        title: "Поиск",
        items: [{id: 1, icon: "search", label: "Поиск", link: "/"}],
    },
    {
        id: 5,
        title: "Настройки",
        items: [
            {id: 1, icon: "settings", label: "Общие", link: "/profile"},
            {id: 2, icon: "user", label: "Соотрудники", link: "/"},
            {id: 3, icon: "settings", label: "Внешние интеграции", link: "/"},
        ],
    },
    {
        id: 6,
        title: "Профиль",
        items: [
            {id: 1, icon: "edit", label: "Редактировать", link: "/profile"},
            {id: 2, icon: "logout", label: "Выйти", link: "/"},
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
  background-color: $blue3;
  transition: 0.3s;
  transform: translateX(-100%);
  box-shadow: 0 0 10px rgba($blue, 0.2);

  .popup__inner {
    padding: 41px 50px;
    opacity: 0;
    transition: 0.3s;
  }

  .popup__title {
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
  }

  &.active {
    width: 300px;
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
    border-radius: 3px;
  }

  svg {
    width: 22px;
    height: 22px;
    margin-right: 15px;
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
}
</style>
