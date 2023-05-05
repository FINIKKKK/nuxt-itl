<template>
  <div
    class="input"
    :class="{ focus: isFocus || value, password: props.type === 'password' }"
  >
    <div class="inner">
      <label
        >{{ label }}
        <svg
          v-if="isLabelTooltip"
          class="tooltip"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6667 0.426758C4.77995 0.426758 0.0104179 5.23926 0.0104179 11.083C0.0104179 16.9697 4.77995 21.7393 10.6667 21.7393C16.5104 21.7393 21.3229 16.9697 21.3229 11.083C21.3229 5.23926 16.5104 0.426758 10.6667 0.426758ZM10.6667 19.6768C5.89714 19.6768 2.07292 15.8525 2.07292 11.083C2.07292 6.35645 5.89714 2.48926 10.6667 2.48926C15.3932 2.48926 19.2604 6.35645 19.2604 11.083C19.2604 15.8525 15.3932 19.6768 10.6667 19.6768ZM15.2643 8.71973C15.2643 6.57129 12.987 4.89551 10.8815 4.89551C8.86198 4.89551 7.57292 5.75488 6.58464 7.25879C6.41276 7.47363 6.45573 7.77441 6.67057 7.94629L7.8737 8.84863C8.08854 9.02051 8.43229 8.97754 8.60417 8.7627C9.2487 7.94629 9.72136 7.47363 10.7096 7.47363C11.4831 7.47363 12.4284 7.94629 12.4284 8.71973C12.4284 9.27832 11.9557 9.53613 11.1823 9.96582C10.3229 10.4814 9.16276 11.083 9.16276 12.6299V12.9736C9.16276 13.2744 9.37761 13.4893 9.67839 13.4893H11.612C11.9128 13.4893 12.1276 13.2744 12.1276 12.9736V12.7158C12.1276 11.6416 15.2643 11.5986 15.2643 8.71973ZM12.4714 15.8955C12.4714 14.9072 11.6549 14.0908 10.6667 14.0908C9.63542 14.0908 8.86198 14.9072 8.86198 15.8955C8.86198 16.9268 9.63542 17.7002 10.6667 17.7002C11.6549 17.7002 12.4714 16.9268 12.4714 15.8955Z"
            fill="white"
          />
        </svg>
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
        <img
          v-if="!isShowPassword && value"
          @click="() => setShowPassword(true)"
          src="@/assets/img/eye.svg"
          alt="eye"
        />
        <img
          v-if="isShowPassword && value"
          @click="() => setShowPassword(false)"
          src="@/assets/img/noeye.svg"
          alt="eye"
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
      svg {
        width: 16px;
        path {
          fill: $blue;
        }
      }
    }
  }
  &.password {
    input {
      padding-right: 60px;
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
    display: flex;
    align-items: center;
    transition: 0.3s;
  }
  .error {
    font-size: 12px;
    color: $red;
  }
  .showPassword {
    position: absolute;
    top: 13px;
    right: 24px;
    cursor: pointer;
  }
  .tooltip {
    width: 18px;
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
