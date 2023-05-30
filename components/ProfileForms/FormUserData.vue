<template>
  <form class="block" @submit.prevent="onChageUserData">
    <span class="error" v-if="errors">{{ errors }}</span>
    <h2 class="title">Личные данные</h2>
    <Input
      placeholder="Имя"
      name="firstName"
      v-model="firstName"
      :errors="errorsValidate['firstName']"
    />
    <Input
      placeholder="Фамилия"
      name="lastName"
      v-model="lastName"
      :errors="errorsValidate['lastName']"
    />
    <Input
      placeholder="Email"
      name="email"
      v-model="email"
      :errors="errorsValidate['email']"
    />
    <button class="btn" :class="{ disabled: isLoading }">
      Сохранить настройки
    </button>
    errors: {{ errors }}
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { UserDataScheme } from '~/utils/validation';
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';

type FormError = {
  [key: string]: string[];
};
const { handleSubmit, resetForm } = useForm({
  validationSchema: UserDataScheme,
});
// const errorsValidate = ref<FormError[]>([]);
// const errors = ref([]);
// const isLoading = ref(false);
const userStore = useUserStore();
const firstName = ref(userStore.user?.firstName);
const lastName = ref(userStore.user?.lastName);
const email = ref(userStore.user?.email);
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

const emits = defineEmits(['showWarning']);

const onChageUserData = async () => {
  const dto = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };
  await validateForm(dto, UserDataScheme, async () => {
    const { data } = await Api().user.updateData(dto);
    console.log(data);
  });
  // try {
  //   // emits('showWarning', []);
  //   // errorsValidate.value = [];
  //   // isLoading.value = true;
  // } catch (err: any) {
  //   if (err.inner) {
  //     // Ошибки валидации Yup доступны в свойстве "inner"
  //     err.inner.forEach((error) => {
  //       // Проверяем, существует ли уже массив ошибок для данного поля
  //       if (!errorsValidate.value[error.path]) {
  //         errorsValidate.value[error.path] = [];
  //       }
  //       // Добавляем ошибку в массив для данного поля
  //       errorsValidate.value[error.path].push(error.message);
  //     });
  //     useErrorsValidate(err, errorsValidate);
  //
  //     if (err.response.data.message) {
  //       emits('showWarning', err.response.data.message);
  //     }
  //   }
  // finally
  //   {
  //     isLoading.value = false;
  //   }
};
</script>

<style lang="scss" scoped></style>
