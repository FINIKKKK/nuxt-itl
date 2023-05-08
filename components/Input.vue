<template>
  <div
    class="input"
    :class="{ focus: isFocus || value, password: props.type === 'password' }"
  >
    <div class="inner">
      <label
        >{{ label }}
        <svg-icon name="tooltip" v-if="isLabelTooltip" class="tooltip" />
      </label>
      <input
        :type="
          props.type !== 'password' || isShowPassword ? 'text' : 'password'
        "
        v-model="value"
        :name="name"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @input="handleInput('input')"
        @keydown.enter="handleInput('keydown')"
        ref="inputField"
      />
      <div v-if="props.type === 'password'" class="showPassword">
        <svg-icon
          name="eye"
          v-if="!isShowPassword && value"
          @click="() => setShowPassword(true)"
        />
        <svg-icon
          name="noeye"
          v-if="isShowPassword && value"
          @click="() => setShowPassword(false)"
        />
      </div>
      <div v-if="props.type === 'url_address'" class="address">.itl.wiki</div>
    </div>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { AddUsersScheme } from "~/utils/validation/AddUsersScheme";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isLabelTooltip: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  handleInput: {
    type: Function,
    required: false,
  },
});
const emits = defineEmits(["inputValue"]);

const inputField = ref<HTMLInputElement | null>(null);
const isFocus = ref(false);
const isShowPassword = ref(false);
const { errorMessage: error, value: inputValue } = useField(props.name);
const value = ref(props.type === "add_users" ? "" : inputValue);
const errorMessage = ref(props.type === "add_users" ? "" : error);

const setShowPassword = (value: boolean) => {
  isShowPassword.value = value;
};

const handleInput = async (type: string) => {
  if (props.type === "add_users") {
    emits("inputValue", value.value);
    try {
      await AddUsersScheme.validate(
        { email: value.value },
        { abortEarly: false }
      );
      errorMessage.value = "";
      if (type === "input") {
        const emailsArr = value?.value?.split(",");
        if (emailsArr.length > 1) {
          props.handleInput?.(emailsArr[0]);
          value.value = "";
          inputField.value?.focus();
        }
      } else if (type === "keydown") {
        if (value.value !== "") {
          props.handleInput?.(value.value);
          value.value = "";
          inputField.value?.focus();
        }
      }
    } catch (err: any) {
      errorMessage.value = err.message;
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  &.password {
    input {
      padding-right: 60px;
    }
  }
  .showPassword {
    position: absolute;
    top: 13px;
    right: 24px;
    cursor: pointer;
    svg {
      fill: $blue;
      width: 24px;
      height: 24px;
    }
  }
  .tooltip {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    fill: $blue3;
    path {
      transition: 0.3s;
    }
  }
  .address {
    position: absolute;
    top: 5.5px;
    right: 5.5px;
    padding: 8px 19.5px;
    background-color: $blue4;
    background-repeat: 2px;
  }
}
</style>
