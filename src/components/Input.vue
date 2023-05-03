<template>
  <div class="input" :class="{ focus: isFocus || value }">
    <div class="inner">
      <label>{{ label }}</label>
      <input
        type="text"
        v-model="value"
        :name="name"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <!-- <svg class="password" width="20" height="20">
      <use xlink:href="./img/icons/icons.svg#eye" />
    </svg> -->
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
});

const isFocus = ref(false);
const { errorMessage, value } = useField(props.name);

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
    background-color: $bg;
    transition: 0.3s;
  }
  .error {
    font-size: 12px;
    color: $red;
  }
}
</style>
