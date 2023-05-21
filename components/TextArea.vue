<template>
  <div
    class="input"
    :class="{ focus: isFocus || value, comment: isCommentInput }"
  >
    <div class="inner">
      <label>{{ label }}</label>
      <textarea
        ref="textareaRef"
        v-model="value"
        @focus="isFocus = true"
        @blur="isFocus = false"
        :class="class"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  isCommentInput: boolean;
}>();

const emits = defineEmits(['value']);
</script>

<style lang="scss" scoped>
.input {
  textarea {
    overflow: hidden;
    height: 55px;
  }
  &.comment {
    textarea {
      padding-right: 185px;
    }
  }
}
</style>