<template>
  <NuxtLayout name="main" title="Настройки / Общие" isMiniTitle>
    <!-- Отображение ошибок -->
    <Warning
      v-if="errors.length || successMessage"
      :errors="errors as string[]"
      :successMessage="successMessage as string"
    />

    <FormCompany
      @showWarning="setErrors"
      @showWarningSuccess="setSuccessMessage"
    />

    <div class="block disabled">
      <div class="block__header">
        <h2 class="title">Разрешенные почтовые домены</h2>
        <span class="title__tag">Скоро</span>
      </div>
      <Input placeholder="Введите домен" v-model="undefined" :errors="[]" />
      <div class="text">
        Любой, кто имеет адрес электронной почты в этих доменах, может
        автоматически присоединиться к вашей компании.
      </div>
    </div>

    <div class="block">
      <h2 class="title">Региональные настройки</h2>
      <div class="select__item">
        <label>Язык интерфейса</label>
        <Select :options="options1" className="select" />
      </div>
      <div class="select__item">
        <label>Формат даты</label>
        <Select :options="options2" className="select" />
      </div>
    </div>

    <button class="btn">Сохранить настройки</button>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Select from '~/components/UI/Select.vue';
import Input from '~/components/UI/Input.vue';
import FormCompany from '~/components/SettingsPage/FormCompany.vue';
import Warning from '~/components/UI/Warning.vue';
import FormUserData from '~/components/ProfileForms/FormUserData.vue';

const options1 = [{ id: 1, value: 'Русский' }];
const options2 = [{ id: 1, value: 'День месяц' }];

const errors = ref([]); // Сообщение об успешном действии
const successMessage = ref<string>(''); // Сообщение об успешном действии

/**
 * Методы ----------------
 */
// Установление значения ошибок (событие)
const setErrors = (value: any) => {
  errors.value = value;
};
// Установление значения сообщение об успешном действии (событие)
const setSuccessMessage = (value: string) => {
  successMessage.value = value;
};
</script>

<style lang="scss" scoped>
.block.disabled {
  pointer-events: none;
  .title,
  .input,
  .text {
    opacity: 0.5;
  }
  .title {
    margin-bottom: 0;
  }
}

.block__header {
  display: flex;
  align-items: center;
  margin-bottom: 41px;
}

.title__tag {
  font-size: 13px;
  line-height: 20px;
  padding: 3px 9px;
  border-radius: 2px;
  margin-left: 10px;
  background-color: $blue4;
}

.select__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 40px;
  }
  .select {
    width: 320px;
  }
}
</style>
