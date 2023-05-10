<template>
  <div class="img" :class="props.class">
    <img v-if="props.user.avatar" :src="props.user.avatar" alt="avatar" />
    <span v-else>{{ shortName }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
});

const shortName = props.user.firstName[0] + props.user.lastName[0];
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  background-color: $blue4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  span {
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: $blue;
  }
}
</style>
