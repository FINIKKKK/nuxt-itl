<template>
  <div class="img">
    <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
    <span v-else>{{ shortName }}</span>
  </div>
</template>

<script lang="ts" setup>
import { TUser } from '~/api/models/user/types';

const props = defineProps<{
  user: TUser;
}>();

const shortName = props.user.firstName[0] + props.user.lastName[0];
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  background-color: $blue4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
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
