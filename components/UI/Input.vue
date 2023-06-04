<template>
  <div
    class="input"
    :class="{
      password: props.type === 'password',
      input_address: props.type === 'url_address',
    }"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <input
        :placeholder="placeholder"
        :type="
          props.type === 'password' && !isShowPassword ? 'password' : 'text'
        "
        v-model="model"
        maxlength="200"
      />

      <!-- Кнопка для показа или скрытия пароля -->
      <div v-if="props.type === 'password'" class="showPassword">
        <svg-icon
          :name="isShowPassword ? 'noeye' : 'eye'"
          v-if="model"
          @click="() => setShowPassword()"
        />
      </div>
      <!-- Кнопка для показа или скрытия пароля -->
      <div v-if="type === 'url_address'" class="address">
        <div class="url">.itl.wiki</div>
        <div ref="refPopup">
          <svg-icon
            class="tooltip"
            name="tooltip2"
            @click="() => setShowPopup()"
          />
          <div class="popup" v-if="isShowPopup">
            Не менее 6 символов, только строчные буквы и цифры.
          </div>
        </div>
      </div>
    </div>
    <span class="error" v-for="error in props.errors"> {{ error }} </span>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  placeholder: string;
  modelValue: string;
  errors: string[];
  type?: string;
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
const refPopup = ref(null); // Показывать пароль
const isShowPopup = ref(false); // Показывать пароль

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowPopup);

/**
 * Методы ----------------
 */
// Показывать или скрывать попап tooltip
const setShowPopup = () => {
  isShowPopup.value = !isShowPopup.value;
};
// Показывать или скрывать пароль
const setShowPassword = () => {
  isShowPassword.value = !isShowPassword.value;
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
  &.input_address {
    .inner {
      display: flex;
      align-items: center;
    }
    input {
      margin-right: 8px;
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
      width: 20px;
      height: 18px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .address {
    position: relative;
    display: flex;
    align-items: center;
    .url {
      font-size: 20px;
      margin-right: 9px;
    }
    .tooltip {
      width: 18px;
      height: 18px;
      opacity: 0.5;
      cursor: pointer;
      flex: 0 0 auto;
      &:hover {
        opacity: 1;
      }
    }
  }
  .error {
    display: block;
  }
  .popup {
    left: 0px;
  }
}
</style>
