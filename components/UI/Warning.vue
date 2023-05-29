<template>
  <div class="errors" v-if="errors.length">
    <svg-icon name="warning" />
    <div class="items">
      <span v-for="error in errors">{{ error }}</span>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
const props = defineProps<{
  errors: string[];
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.errors {
  background-color: $red2;
  display: flex;
  align-items: center;
  padding: 21px 50px;
  svg {
    width: 23px;
    height: 23px;
    margin-right: 16px;
    fill: $red;
  }
  .items span {
    display: block;
    color: $red;
    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }
}
</style>
