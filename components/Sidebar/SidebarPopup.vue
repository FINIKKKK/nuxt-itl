<template>
  <div
    class="sidebar__popup"
    :class="{
      active: isShow && activeItem,
      search: activeItem === config.public.sidebar.list1.search,
    }"
  >
    <div class="inner">
      <div class="main">
        <h3 class="title">
          {{ innerItems.find((obj) => obj.name === activeItem)?.title }}
        </h3>
        <ul
          v-if="
            activeItem !== config.public.sidebar.list1.search &&
            innerItems.find((obj) => obj.name === activeItem)?.items
          "
        >
          <template
            v-for="(item, index) in innerItems.find(
              (obj) => obj.name === activeItem,
            ).items"
            :key="index"
          >
            <li
              class="item"
              v-if="item.hasOwnProperty('isShow') ? item.isShow : true"
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
          </template>
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
              :to="`${companyStore.activeCompanySlug}/sections/${section.id}`"
            >
              <svg-icon name="folder" />
              <p>{{ section.title }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <!--      <div-->
      <!--        v-if="posts && activeItem === config.public.sidebar.list1.home"-->
      <!--        class="sections"-->
      <!--      >-->
      <!--        <h3>Статьи</h3>-->
      <!--        <ul>-->
      <!--          <li-->
      <!--            class="item post"-->
      <!--            v-if="activeItem"-->
      <!--            v-for="post in posts"-->
      <!--            :key="post.id"-->
      <!--          >-->
      <!--            <NuxtLink :to="`/posts/${post.id}`">-->
      <!--              <p>{{ post.title }}</p>-->
      <!--            </NuxtLink>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';
import Input from '~/components/UI/Input.vue';
import { useCompanyStore } from '~/stores/CompanyStore';

const props = defineProps<{
  isShow: boolean;
  activeItem: string | null;
}>();

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const companyStore = useCompanyStore();
const token = useCookie('access_token');

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка

/**
 * Методы ----------------
 */
// Выход из аккаунта
const onLogout = async () => {
  try {
    isLoading.value = true; // Ставим загрузку
    await Api().auth.logout(); // Выходим с аккаунта
    token.value = ''; // Обнуляем токен
    // Удаляем информацию из хранилища
    userStore.user = null;
    userStore.companies = [];
    // Перенаправляем пользователя на страницу авторизации
    await router.push('/login');
  } catch (err: any) {
    alert('Ошибка при выходе из аккаунта');
    console.warn(err);
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};

const innerItems = [
  {
    name: config.public.sidebar.list1.home,
    title: 'Ваша компания',
    items: [
      {
        icon: 'activation',
        label: 'Активность',
        link: `${companyStore.activeCompanySlug}`,
      },
      {
        icon: 'document',
        label: 'Ваши работы',
        link: `${companyStore.activeCompanySlug}/my_works`,
      },
      {
        icon: 'glasses',
        label: 'На модерации',
        link: `${companyStore.activeCompanySlug}/moderation`,
        isShow: companyStore.activeCompany?.pivot.role_id === 1,
      },
      {
        icon: 'favorite',
        label: 'Закладки',
        link: `/account/favorites`,
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
        link: `${companyStore.activeCompanySlug}/posts/create`,
      },
      {
        icon: 'folder',
        label: 'Раздел',
        link: `${companyStore.activeCompanySlug}/sections/create`,
      },
    ],
  },
  {
    name: config.public.sidebar.list1.search,
    title: `Поиск по ${companyStore.activeCompany?.name}.itl.wiki`,
  },
  {
    name: config.public.sidebar.list2.settings,
    title: 'Настройки',
    items: [
      {
        icon: 'settings',
        label: 'Общие',
        link: `${companyStore.activeCompanySlug}/settings/general`,
      },
      {
        icon: 'user',
        label: 'Соотрудники',
        link: `${companyStore.activeCompanySlug}/settings/employees`,
      },
    ],
  },
  {
    name: config.public.sidebar.list2.user,
    title: 'Профиль',
    items: [
      { icon: 'favorite', label: 'Закладки', link: '/account/favorites' },
      { icon: 'edit', label: 'Редактировать', link: '/account/profile' },
      {
        icon: 'change',
        label: 'Сменить компанию',
        link: '/',
        isShow: route.path !== '/',
      },
      { icon: 'logout', label: 'Выйти', method: onLogout },
    ],
  },
];
const activeItemInList = ref(
  innerItems.find((obj) => obj.name === props.activeItem) || innerItems[0],
);

const { data: sections } = useAsyncData(async () => {
  if (route.path.includes('/companies')) {
    const params = {
      company_id: companyStore.activeCompany?.id,
    };
    const { data } = await Api().section.getAll(params);
    return data;
  }
});
// const { data: posts } = useAsyncData(async () => {
//   const params = {
//     section_id: route.fullPath.includes('/sections/') && route.params.id,
//   };
//   const { data } = await Api().post.getAll(params);
//   return data;
// });
</script>

<style lang="scss" scoped>
.sidebar__popup {
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  opacity: 1;
  background-color: $blue3;
  transition: 0.3s;
  transform: translateX(-100%);
  pointer-events: none;
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
    pointer-events: visible;
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

.sidebar__popup.search {
  width: 550px;
  .input {
    input {
      font-size: 16px;
    }
  }
}
</style>
