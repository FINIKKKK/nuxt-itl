<template>
  <div class="controls">
    <ul class="extra">
      <li class="extra__item">
        <svg-icon name="lock" />
        <p>Доступ</p>
      </li>
    </ul>
    <div class="btns">
      <button @click="onSubmit" class="btn">
        {{ type === 'post' ? 'Опубликовать' : 'Создать раздел' }}
      </button>
      <button class="btn btn2">Отменить</button>
    </div>
  </div>
  <div class="form">
    <select name="" id="" v-model="selectValue">
      <option v-for="section in sections" :value="section.id">
        {{ section.title }}
      </option>
    </select>
    <div class="input">
      <input
        v-model="titleValue"
        class="title"
        type="text"
        :placeholder="
          type === 'post' ? 'Заголовок статьи' : 'Заголовок раздела'
        "
      />
      <span class="error">{{ errors?.title }}</span>
    </div>
    <div class="input">
      <Editor @data-change="setBodyValue" />
      <span class="error">{{ errors?.body }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api } from '~/api';
import { OutputBlockData } from '@editorjs/editorjs';
import { PostScheme, SectionScheme } from '~/utils/validation/Schemes';
import { useUserStore } from '~/stores/UserStore';

const props = defineProps<{
  type: string;
}>();

const titleValue = ref('');
const bodyValue = ref<OutputBlockData[]>([]);
const errors = ref({});
const isLoading = ref(false);
const router = useRouter();
const userStore = useUserStore();
const selectValue = ref(null);

const { data: sections } = useAsyncData(async () => {
  const params = {
    company_id: userStore.activeCompany[0]?.id,
  };
  const { data } = await Api().section.getAll(params);
  return data;
});

const onSubmit = async () => {
  try {
    isLoading.value = true;
    if (props.type === 'post') {
      const dto = {
        title: titleValue.value,
        body: bodyValue.value,
        section_id: selectValue.value,
      };
      await PostScheme.validate(dto, { abortEarly: false });
      const { data } = await Api().post.create(dto);
      console.log(data);
      // await router.push(`/posts/${data.id}`);
    } else {
      const dto = {
        title: titleValue.value,
        body: bodyValue.value,
        company_id: userStore.activeCompany[0].id,
        ...(selectValue.value && { parent_id: selectValue.value }),
      };
      await SectionScheme.validate(dto, { abortEarly: false });
      const { data } = await Api().section.create(dto);
      console.log(data);
      // await router.push(`/companies/${userStore.activeCompany[0].slug}/sections/${data.id}`);
    }
  } catch (err: any) {
    if (err) {
      console.warn(err);
      const errorsMessages: Record<string, string> = {};
      err.inner.forEach((error: { path: string; message: string }) => {
        errorsMessages[error.path] = error.message;
      });
      errors.value = errorsMessages;
    }
  } finally {
    isLoading.value = false;
  }
};

const setBodyValue = (value: OutputBlockData[]) => {
  bodyValue.value = value;
};
</script>

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 36px;
  }
}

.form {
  width: 900px;
  margin: 0 auto;
}

.title {
  width: 100%;
  font-size: 24px;
  line-height: 28px;
  &::placeholder {
    color: $gray;
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
  .btn {
    padding: 10px 15px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>