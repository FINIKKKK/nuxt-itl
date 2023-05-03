<template>
  <div class="input" :class="{ focus: isFocus || value }">
    <div class="inner">
      <label>{{ label }}</label>
      <input
        :type="isShowPassword ? 'text' : 'password'"
        v-model="value"
        :name="name"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <div v-if="props.isPassword" class="password">
        <img
          v-if="!isShowPassword"
          @click="() => setShowPassword(true)"
          src="@/assets/img/eye.svg"
          alt="eye"
        />
        <img
          v-if="isShowPassword"
          @click="() => setShowPassword(false)"
          src="@/assets/img/noeye.svg"
          alt="eye"
        />
      </div>
    </div>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isPassword: {
    type: Boolean,
    required: false,
  },
});

const isFocus = ref(false);
const isShowPassword = ref(false);
const { errorMessage, value } = useField(props.name);

const setShowPassword = (value) => {
  isShowPassword.value = value;
};
</script>

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  .inner {
    position: relative;
    width: 100%;
    border: 1px solid $blue3;
    border-radius: 2px;
    color: $black;
    input {
      padding: 16px 24px;
      width: 100%;
    }
  }
  &.focus {
    label {
      font-size: 14px;
      top: -10px;
      color: $blue;
    }
  }
  label {
    pointer-events: none;
    line-height: 20px;
    color: $blue3;
    position: absolute;
    left: 19px;
    top: 16px;
    padding: 0 5px;
    background-color: $white;
    transition: 0.3s;
  }
  .error {
    font-size: 12px;
    color: $red;
  }
  .password {
    position: absolute;
    top: 14px;
    right: 19px;
    cursor: pointer;
  }
}
</style>
