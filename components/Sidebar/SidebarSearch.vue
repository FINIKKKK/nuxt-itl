<template>
  <Input
    v-if="props.activeItem === config.public.sidebar.list1.search"
    placeholder="Искать статью, раздел или пользователя"
    class="input"
    v-model="searchValue"
    :errors="[]"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  activeItem: string | null;
}>();

/**
 * Системные переменные ----------------
 */
const config = useRuntimeConfig(); // Конфиг

/**
 * Пользовательские переменные ----------------
 */
const searchValue = ref(''); // Значение поиска
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
