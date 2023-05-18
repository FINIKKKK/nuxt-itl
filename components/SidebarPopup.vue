<template>
    <div class="popup" :class="{ active:  props.isShow && props.activeItem }">
        <div class="popup__inner">
            <div class="popup__main" v-if="!route.path.includes('/sections/') || props.activeItem !== 1">
                <h3 class="popup__title">
                    {{ props.activeItem && innerItems.find(obj => obj.id === props.activeItem).title }}
                </h3>
                <ul>
                    <li
                            class="popup__item"
                            v-if="props.activeItem"
                            v-for="item in innerItems.find(obj => obj.id === props.activeItem).items"
                            :key="item.id"
                    >
                        <NuxtLink :to="item.link">
                            <svg-icon :name="item.icon"/>
                            <p>{{ item.label }}</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div v-if="props.activeItem === 1" class="sections">
                <h3>Разделы</h3>
                <ul>
                    <li
                            class="popup__item"
                            v-if="props.activeItem"
                            v-for="section in sections"
                            :key="section.id"
                    >
                        <NuxtLink :to="`/companies/${userStore.activeCompany[0].slug}/sections/${section.id}`">
                            <svg-icon name="folder"/>
                            <p>{{ section.title }}</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div v-if="posts && props.activeItem === 1" class="sections">
                <h3>Статьи</h3>
                <ul>
                    <li
                            class="popup__item post"
                            v-if="props.activeItem"
                            v-for="post in posts"
                            :key="post.id"
                    >
                        <NuxtLink :to="`/posts/${post.id}`">
                            <p>{{ post.title }}</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";

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


const userStore = useUserStore();
const activeCompany = userStore.activeCompany ? userStore.activeCompany[0].slug : 0;
 const innerItems = [
    {
        id: 1,
        title: "Ваша компания",
        items: [
            {id: 1, icon: "activation", label: "Активность", link: `/companies/${activeCompany}`},
            {id: 2, icon: "document", label: "Ваши работы", link: `/companies/${activeCompany}/my_works`},
            {id: 3, icon: "favorite", label: "Закладки", link: `/companies/${activeCompany}/favorites`},
        ],
    },
    {
        id: 2,
        title: "Посты",
        items: [
            {id: 1, icon: "document", label: "Статью", link: `/companies/${activeCompany}/posts/create`},
            {id: 2, icon: "folder", label: "Раздел", link: `/companies/${activeCompany}/sections/create`},
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
            {id: 1, icon: "settings", label: "Общие", link: `/companies/${activeCompany}/settings/general`},
            {id: 2, icon: "user", label: "Соотрудники", link: `/companies/${activeCompany}/settings/employees`},
            {
                id: 3,
                icon: "tag",
                label: "Внешние интеграции",
                link: `/companies/${activeCompany}/settings/integrations`
            },
        ],
    },
    {
        id: 6,
        title: "Профиль",
        items: [
            {id: 1, icon: "favorite", label: "Закладки", link: "account/favorites"},
            {id: 2, icon: "edit", label: "Редактировать", link: "account/profile"},
            {id: 3, icon: "change", label: "Сменить компанию", link: "/"},
            {id: 4, icon: "logout", label: "Выйти", link: "/"},
        ],
    },
];

const {data: sections} = useAsyncData(async () => {
    const params = {
        company_id: userStore.activeCompany[0]?.id,
    }
    const {data} = await Api().section.getAll(params);
    return data;
});
const {data: posts} = useAsyncData(async () => {
    const params = {
        section_id: route.fullPath.includes('/sections/') && route.params.id,
    }
    const {data} = await Api().post.getAll(params);
    return data;
});
const route = useRoute();
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

.popup__main {
  margin-bottom: 46px;
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
    flex: 0 0 auto;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: $black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.3s;
  }

  &:hover {
    background-color: $blue4;

    a {
      text-decoration: none;
    }

    p {
      color: $blue;
    }

    &.post {
      a::before {
        background-color: $blue;
      }
    }
  }

  &.post {
    a::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: $black;
      flex: 0 0 auto;
      transition: 0.3s;
    }
  }
}

.sections {
  margin-bottom: 49px;

  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}
</style>
