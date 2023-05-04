<template>
  <NuxtLayout name="main" :title="'Добавление пользователей'">
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
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66016 4.75L9.61328 1.82422C9.77734 1.66016 9.77734 1.35938 9.61328 1.19531L8.92969 0.511719C8.76562 0.347656 8.46484 0.347656 8.30078 0.511719L5.375 3.46484L2.42188 0.511719C2.25781 0.347656 1.95703 0.347656 1.79297 0.511719L1.10938 1.19531C0.945312 1.35938 0.945312 1.66016 1.10938 1.82422L4.0625 4.75L1.10938 7.70312C0.945312 7.86719 0.945312 8.16797 1.10938 8.33203L1.79297 9.01562C1.95703 9.17969 2.25781 9.17969 2.42188 9.01562L5.375 6.0625L8.30078 9.01562C8.46484 9.17969 8.76562 9.17969 8.92969 9.01562L9.61328 8.33203C9.77734 8.16797 9.77734 7.86719 9.61328 7.70312L6.66016 4.75Z"
              fill="#005CCC"
            />
          </svg>
        </li>
      </ul>
      <button class="btn form__btn1" :class="{ disabled: !inputValue }">
        Выслать приглашение
      </button>
      <button class="btn secondary form__btn2" @click="() => router.push('/')">
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
}
.form__btn2 {
  &:hover {
    text-decoration: none;
  }
}
</style>
