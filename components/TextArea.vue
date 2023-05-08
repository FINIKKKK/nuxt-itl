<template>
  <div
    class="input"
    :class="{ focus: isFocus || value, comment: props.isCommentInput }"
  >
    <div class="inner">
      <label>{{ label }}</label>
      <textarea
        ref="textareaRef"
        v-model="value"
        @focus="isFocus = true"
        @blur="isFocus = false"
        :class="props.class"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isCommentInput: {
    type: Boolean,
    required: false,
  },
});
const emits = defineEmits(["value"]);

const isFocus = ref(false);
const value = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

watch(value, () => {
  emits("value", value.value);
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
});
</script>

<style lang="scss" scoped>
.input {
  textarea {
    overflow: hidden;
    min-height: 50px;
    max-height: 150px;
  }
  &.comment {
    textarea {
      padding-right: 185px;
    }
  }
}
</style>
