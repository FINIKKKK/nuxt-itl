<template>
  <!--------------------------------------
    Элементы управления 
  ---------------------------------------->
  <div class="controls">
    <!-- Дополнительные элементы -->
    <ul class="extra">
      <!-- Доступ -->
      <li class="extra__item">
        <svg-icon name="lock" />
        <p>Доступ</p>
      </li>
      <!-- Тэги -->
      <li class="extra__item" v-if="type === 'post'">
        <svg-icon name="tag" />
        <p>Тэги</p>
      </li>
    </ul>

    <!-- Кнопки -->
    <div class="btns">
      <!-- Кнопка отпраки -->
      <button @click="onSubmit" class="btn" :class="{ disabled: isLoading }">
        {{ buttonTitle }}
      </button>
      <!-- Кнопка отмены -->
      <button class="btn btn2">Отменить</button>
      <!-- Настройки -->
      <svg-icon name="options" class="options" v-if="type === 'post'" />
    </div>
  </div>

  <!--------------------------------------
    Форма создания
  ---------------------------------------->
  <div class="form">
    <!-- Селект элемента -->
    <select name="" id="" v-model="selectValue">
      <option v-for="section in sections" :value="section.id">
        {{ section.title }}
      </option>
    </select>
    <!-- Заголовок жлемента -->
    <div class="input">
      <input
        v-model="titleValue"
        class="title"
        type="text"
        :placeholder="
          type === 'post' ? 'Заголовок статьи' : 'Заголовок раздела'
        "
      />
    </div>
    <!-- Тело элемента -->
    <div class="input">
      <Editor @data-change="setBodyValue" :initialValue="bodyValue" />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { OutputBlockData } from '@editorjs/editorjs';
import { PostScheme, SectionScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserStore';
import { useCompanyStore } from '~/stores/CompanyStore';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'post' | 'section';
  isEdit?: boolean;
}>();

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const route = useRoute(); // Роуте
const userStore = useUserStore(); // Хранилище пользователя
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Хуки ----------------
 */
// Получение разделов для списка
const { data: sections } = useAsyncData(async () => {
  const params = {
    company_id: companyStore.activeCompany?.id,
  };
  const { data } = await Api().section.getAll(params);
  return data;
});
// Получение данных элемента
const { data: elem } = useAsyncData(async () => {
  if (props.isEdit) {
    if (props.type == 'post') {
      const { data } = await Api().post.getOne(route.params.id);
      return data;
    } else {
      const { data } = await Api().section.getOne(route.params.id);
      return data;
    }
  }
});

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const isLoading = ref(false); // Загрузка
const titleValue = ref(elem.value?.title || ''); // Заголовок элемента
const bodyValue = ref<OutputBlockData[]>(elem.value?.body || []); // Тело элемента
const selectValue = ref(null); // Селект элемента

/**
 * Вычисляемые значения ----------------
 */
const buttonTitle = computed(() => {
  if (props.type === 'post') {
    return props.isEdit ? 'Редактировать' : 'Опубликовать';
  } else {
    return props.isEdit ? 'Редактировать раздел' : 'Создать раздел';
  }
});

/**
 * Методы ----------------
 */
// Метод изменения тела элемента (через событие)
const setBodyValue = (value: OutputBlockData[]) => {
  bodyValue.value = value;
};
// Метод создания или редактирования элемента
const onSubmit = async () => {
  try {
    errors.value = []; // Обнуляем ошибки
    isLoading.value = true; // Ставим загрузку

    // Если тип - пост
    if (props.type === 'post') {
      // Объект с данными
      const dto = {
        title: titleValue.value,
        body: bodyValue.value,
        section_id: selectValue.value,
      };
      // Проверка валидации
      await PostScheme.validate(dto, { abortEarly: false });
      // Если это редактирование
      if (props.isEdit) {
        // Редактируем пост
        const { data } = await Api().post.update(route.params.id, dto);
        // Перенапрвляем пользователя на страницу поста
        await router.push(`${companyStore.activeCompanySlug}/posts/${data.id}`);
      } else {
        // Создаем пост
        const { data } = await Api().post.create(dto);
        // Перенапрвляем пользователя на страницу поста
        await router.push(`${companyStore.activeCompanySlug}/posts/${data.id}`);
      }
    }
    // Если тип - раздел
    else if (props.type === 'section') {
      // Объект с данными
      const dto = {
        title: titleValue.value,
        body: bodyValue.value,
        company_id: companyStore.activeCompany?.id,
        ...(selectValue.value && { parent_id: selectValue.value }),
      };
      // Проверка валидации
      await SectionScheme.validate(dto, { abortEarly: false });
      // Если это редактирование
      if (props.isEdit) {
        // Редактируем раздел
        const { data } = await Api().section.update(route.params.id, dto);
        // Перенапрвляем пользователя на страницу раздела
        await router.push(
          `${companyStore.activeCompanySlug}/sections/${data.id}`,
        );
      } else {
        // Создаем раздел
        const { data } = await Api().section.create(dto);
        // Перенапрвляем пользователя на страницу раздела
        await router.push(
          `${companyStore.activeCompanySlug}/sections/${data.id}`,
        );
      }
    }
  } catch (err: any) {
    errors.value = err?.response?.data?.message; // Выводим ошибки, если они есть
  } finally {
    isLoading.value = false; // Убираем загрузку
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 900px;
  margin: 0 auto;
  .input {
    &:not(:last-child) {
      margin-bottom: 36px;
    }
  }
  .title {
    width: 100%;
    font-size: 24px;
    line-height: 28px;
    &::placeholder {
      color: $gray;
    }
  }
}

.controls {
  padding: 17px 40px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.extra {
  display: flex;
  align-items: center;
  &__item {
    &:not(:last-child) {
      margin-right: 35px;
    }
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
      margin-right: 14px;
    }
    &:hover {
      color: $blue2;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  .btn {
    padding: 10px 15px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .options {
    width: 20px;
    height: 20px;
  }
}
</style>