<template>
  <NuxtLayout name="main" title="Добавление пользователей">
    <form @submit.prevent="onSubmit" class="form">
      <p class="text">
        Основные достоинства itl.wiki раскрываются, когда вы работаете в связке
        с другими участниками команды и обсуждаете проекты.
      </p>
      <Input
        name="email"
        label="Введите e-mail адреса пользователей через запятую"
        isLabelTooltip
        type="add_users"
        :handleInput="handleInput"
        @inputValue="setValue"
      />
      <ul class="users">
        <li
          v-for="email in emails"
          @click="emails = emails.filter((obj) => obj !== email)"
          class="user secondary"
        >
          <p>{{ email }}</p>
          <svg-icon name="close" />
        </li>
      </ul>
      <button class="btn form__btn1" :class="{ disabled: !inputValue }">
        Выслать приглашение
      </button>
      <button class="btn btn2 form__btn2" @click="() => router.push('/')">
        Пропустить
      </button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const inputValue = ref("");
const emails = ref<string[]>([]);
const router = useRouter();

const handleInput = (value: string) => {
  if (!emails.value.includes(value)) {
    emails.value.push(value);
  }
};
const setValue = (value: string) => {
  inputValue.value = value;
};
const onSubmit = () => {};
</script>

<style lang="scss" scoped>
.form__btn1 {
  margin-right: 16px;
}
.users__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
}
.user {
  &:not(:last-child) {
    margin-right: 8px;
  }
  padding: 4px 16px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 32px;
  p {
    margin-right: 16px;
  }
  svg {
    width: 14px;
    height: 14px;
    fill: $blue;
  }
}
.form__btn2 {
  &:hover {
    text-decoration: none;
  }
}
</style>
