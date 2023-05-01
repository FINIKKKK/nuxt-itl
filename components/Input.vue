<template>
  <div class="input">
    <input
      type="text"
      v-model="value"
      :name="name"
      :placeholder="placeholder"
    />
    <span>{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const { errorMessage, value } = useField(props.name);
</script>

<style lang="scss" scoped></style>
