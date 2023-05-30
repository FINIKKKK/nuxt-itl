<template>
  <div class="input" :class="{ password: props.isPassword }">
    <div class="inner">
      <!-- Поле ввода -->
      <input
        :placeholder="placeholder"
        :type="props.isPassword && !isShowPassword ? 'password' : 'text'"
        v-model="model"
        maxlength="200"
      />

      <!-- Кнопка для показа или скрытия пароля -->
      <div v-if="props.isPassword" class="showPassword">
        <svg-icon
          :name="isShowPassword ? 'eye' : 'noeye'"
          v-if="model"
          @click="setShowPassword(!isShowPassword)"
        />
      </div>
    </div>
    <span class="error" v-for="error in props.errors"> {{ error }} </span>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  placeholder: string;
  modelValue: string;
  errors: string;
  isPassword?: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Системные переменные ----------------
 */
// Значения поля ввода
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});
const isShowPassword = ref(false); // Показывать пароль

/**
 * Методы ----------------
 */
// Показывать или скрывать пароль
const setShowPassword = (value: boolean) => {
  isShowPassword.value = value;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 60px;
  }
  &.password {
    input {
      padding-right: 60px;
    }
  }
  .showPassword {
    position: absolute;
    bottom: 8px;
    right: 11px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
    svg {
      fill: $blue;
      width: 18px;
      height: 16px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .error {
    display: block;
  }
}
</style>
