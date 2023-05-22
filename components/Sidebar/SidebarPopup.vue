<template>
  <div
    class="popup"
    :class="{
      active: isShow && activeItem,
      search: activeItem === config.public.sidebar.list1.search,
    }"
  >
    <div class="inner">
      <div class="main" v-if="!route.path.includes('/sections/')">
        <h3 class="title">
          {{ innerItems.find((obj) => obj.name === activeItem)?.title }}
        </h3>
        <ul
          v-if="
            activeItem !== config.public.sidebar.list1.search &&
            innerItems.find((obj) => obj.name === activeItem)?.items
          "
        >
          <li
            class="item"
            v-for="(item, index) in innerItems.find(
              (obj) => obj.name === activeItem,
            ).items"
            :key="index"
          >
            <NuxtLink v-if="item.link" :to="item.link">
              <svg-icon :name="item.icon" />
              <p>{{ item.label }}</p>
            </NuxtLink>
            <a v-else @click="item.method">
              <svg-icon :name="item.icon" />
              <p>{{ item.label }}</p>
            </a>
          </li>
        </ul>
        <Input
          v-if="activeItem === config.public.sidebar.list1.search"
          placeholder="Искать статью, раздел или пользователя"
          class="input"
        />
      </div>

      <div
        v-if="activeItem === config.public.sidebar.list1.home"
        class="sections"
      >
        <h3>Разделы</h3>
        <ul>
          <li
            class="item"
            v-if="activeItem"
            v-for="section in sections"
            :key="section.id"
          >
            <NuxtLink
              :to="`/companies/${userStore.activeCompany[0].slug}/sections/${section.id}`"
            >
              <svg-icon name="folder" />
              <p>{{ section.title }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div
        v-if="posts && activeItem === config.public.sidebar.list1.home"
        class="sections"
      >
        <h3>Статьи</h3>
        <ul>
          <li
            class="item post"
            v-if="activeItem"
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
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';
import Input from '~/components/UI/Input.vue';

const props = defineProps<{
  isShow: boolean;
  activeItem: string;
}>();

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const activeCompany = userStore.activeCompany
  ? userStore.activeCompany[0].slug
  : null;

const onLogout = () => {
  console.log('logout');
};
const changeCompany = async () => {
  userStore.activeCompany = null;
  await router.push('/');
};

const innerItems = [
  {
    name: config.public.sidebar.list1.home,
    title: 'Ваша компания',
    items: [
      {
        icon: 'activation',
        label: 'Активность',
        link: `/companies/${activeCompany}`,
      },
      {
        icon: 'document',
        label: 'Ваши работы',
        link: `/companies/${activeCompany}/my_works`,
      },
      {
        icon: 'favorite',
        label: 'Закладки',
        link: `/companies/${activeCompany}/favorites`,
      },
    ],
  },
  {
    name: config.public.sidebar.list1.add,
    title: 'Создать',
    items: [
      {
        icon: 'document',
        label: 'Статью',
        link: `/companies/${activeCompany}/posts/create`,
      },
      {
        icon: 'folder',
        label: 'Раздел',
        link: `/companies/${activeCompany}/sections/create`,
      },
    ],
  },
  {
    name: config.public.sidebar.list1.search,
    title: `Поиск по ${userStore?.activeCompany?.name}.itl.wiki`,
  },
  {
    name: config.public.sidebar.list2.settings,
    title: 'Настройки',
    items: [
      {
        icon: 'settings',
        label: 'Общие',
        link: `/companies/${activeCompany}/settings/general`,
      },
      {
        icon: 'user',
        label: 'Соотрудники',
        link: `/companies/${activeCompany}/settings/employees`,
      },
      {
        icon: 'tag',
        label: 'Внешние интеграции',
        link: `/companies/${activeCompany}/settings/integrations`,
      },
    ],
  },
  {
    name: config.public.sidebar.list2.user,
    title: 'Профиль',
    items: [
      { icon: 'favorite', label: 'Закладки', link: '/account/favorites' },
      { icon: 'edit', label: 'Редактировать', link: '/account/profile' },
      { icon: 'change', label: 'Сменить компанию', method: changeCompany },
      { icon: 'logout', label: 'Выйти', method: onLogout },
    ],
  },
];
const activeItemInList = ref(
  innerItems.find((obj) => obj.name === props.activeItem) || innerItems[0],
);

const { data: sections } = useAsyncData(async () => {
  const params = {
    company_id: userStore.activeCompany[0]?.id,
  };
  const { data } = await Api().section.getAll(params);
  return data;
});
const { data: posts } = useAsyncData(async () => {
  const params = {
    section_id: route.fullPath.includes('/sections/') && route.params.id,
  };
  const { data } = await Api().post.getAll(params);
  return data;
});
</script>

<style lang="scss" scoped>
.popup {
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  opacity: 1;
  background-color: $blue3;
  transition: 0.3s;
  transform: translateX(-100%);
  box-shadow: 0 0 10px rgba($blue, 0.2);
  .inner {
    padding: 41px 50px;
    opacity: 0;
    transition: 0.3s;
  }
  .title {
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
  }
  &.active {
    width: 300px;
    transform: translateX(0px);
    .inner {
      opacity: 1;
    }
  }
}

.main {
  margin-bottom: 46px;
}

.item {
  transition: 0.3s;
  margin-left: -16px;
  cursor: pointer;
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

.popup.search {
  width: 550px;
  .input {
    input {
      font-size: 16px;
    }
  }
}
</style>