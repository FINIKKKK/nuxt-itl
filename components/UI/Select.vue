<template>
  <div
    ref="selectRef"
    class="select"
    :class="{
      active: isOpen, // Если открыт
      page_add_users: type === 'page_add_users', // Если тип - мальнький
      page_create: type === 'page_create', // Если тип - мальнький
    }"
  >
    <!-- Выбранный элемент -->
    <div class="selected" @click="toggleDropdown">
      <span class="placeholder" v-if="type === 'page_create' && !selectedOption"
        >Выберите раздел</span
      >
      <span v-else>{{ selectedOption.value || selectedOption.title }}</span>
      <svg-icon :name="type === 'page_add_users' ? 'down' : 'triangle'" />
    </div>
    <!-- Список -->
    <ul v-if="isOpen" class="dropdown">
      <!-- Элемент списка -->
      <li
        v-for="option in options"
        :key="option.id"
        @click="
          selectOption(option) // Выбирает элемент
        "
        :class="{
          active: option === selectedOption, // Активный элемент
        }"
      >
        {{ option.value || option.title }}
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';

export type TSelect = {
  id: number;
  value?: string;
  title?: string;
};

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  options: TSelect[];
  type?: string;
}>();

const emits = defineEmits(['selectedOption']);

/**
 * Пользовательские переменные ----------------
 */
const isOpen = ref(false); // Открыт ли select
const selectedOption = ref<TSelect | null>(
  props.type === 'page_create' ? null : props.options[0],
); // Выбранный элемент
const selectRef = ref(null); // Ссылка на html элемент select'a

/**
 * Хуки ----------------
 */
// Закрыть select, при клике вне его области
useOutsideClick(selectRef, isOpen);

/**
 * Методы ----------------
 */
watch(selectedOption, () => {
  if (selectedOption.value !== null) {
    emits('selectedOption', selectedOption.value?.id);
  }
});
// Переключение между открытием и закрытием select'a
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
// Выбрать нужный элемент из списка
const selectOption = (option: TSelect) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.select {
  position: relative;
  user-select: none;
  width: 100%;
}

.selected {
  padding: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $gray2;
  span {
    font-size: 16px;
    margin-right: 10px;
  }
  svg {
    width: 13px;
    height: 13px;
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px $blue4;
  border-radius: 2px;
  z-index: 100;
}

.dropdown li {
  padding: 17px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: $blue4;
  }
  &.active {
    color: $blue;
  }
}

.select.active {
  .selected svg {
    transform: rotate(180deg);
  }
}

.select.page_add_users {
  .selected {
    border: none;
    span {
      color: $blue;
    }
    svg {
      width: 10px;
      height: 10px;
    }
  }
}

.select.page_create {
  width: 300px;
  .selected {
    border: none;
    padding: 0;
    margin-bottom: 20px;
    .placeholder {
      font-size: 14px;
      color: $gray;
      transition: 0.3s;
      &:hover {
        color: $blue;
      }
    }
    span {
      font-size: 14px;
    }
    svg {
      display: none;
    }
  }
  .dropdown {
    margin-top: 15px;
    box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.08);
    li {
      font-size: 14px;
    }
  }
}
</style>