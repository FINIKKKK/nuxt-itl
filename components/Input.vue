<template>
    <div
            class="input"
            :class="{ focus: isFocus || value, password: props.type === 'password' }"
    >
        <div class="inner" :class="{input_address: props.type === 'url_address'}">
            <input
                    :placeholder="label"
                    :type=" props.type !== 'password' || isShowPassword ? 'text' : 'password'"
                    v-model="value"
                    :name="name"
                    @input="handleInput('input')"
                    @keydown.enter="handleInput('keydown')"
                    ref="inputField"
                    maxlength="200"
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
            <div v-if="props.type === 'url_address'" class="address">
                <div class="url">.itl.wiki</div>
                <svg-icon class="tooltip" name="tooltip2"/>
            </div>
        </div>
        <span class="error">{{ errorMessage }}</span>
    </div>
</template>

<script lang="ts" setup>
import {useField} from "vee-validate";
import {AddUsersScheme} from "~/utils/validation/Scheme";

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
const {errorMessage: error, value: inputValue} = useField(props.name);
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
                {email: value.value},
                {abortEarly: false}
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
watch(value, () => {
    emits("inputValue", value.value)
})
</script>

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

  .input_address {
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
    }
  }

  .address {
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

      &:hover {
        opacity: 1;
      }
    }
  }

}
</style>
