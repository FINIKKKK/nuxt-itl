<template>
  <div
    ref="selectRef"
    class="select"
    :class="{
      active: isOpen, // Если открыт
      mini: isMini, // Если тип - мальнький
    }"
  >
    <!-- Выбранный элемент -->
    <div class="selected" @click="toggleDropdown">
      <span>{{ selectedOption }}</span>
      <svg-icon :name="isMini ? 'down' : 'triangle'" />
    </div>
    <!-- Список -->
    <ul v-if="isOpen" class="dropdown">
      <!-- Элемент списка -->
      <li
        v-for="option in options"
        :key="option.id"
        @click="
          selectOption(option.value) // Выбирает элемент
        "
        :class="{
          active: option.value === selectedOption, // Активный элемент
        }"
      >
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  options: { id: number; value: string }[];
  isMini?: boolean;
}>();

/**
 * Пользовательские переменные ----------------
 */
const isOpen = ref(false); // Открыт ли select
const selectedOption = ref(props.options[0].value); // Выбранный элемент
const selectRef = ref(null); // Ссылка на html элемент select'a

/**
 * Хуки ----------------
 */
// Закрыть select, при клике вне его области
useOutsideClick(selectRef, isOpen);

/**
 * Методы ----------------
 */
// Переключение между открытием и закрытием select'a
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
// Выбрать нужный элемент из списка
const selectOption = (option: string) => {
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

.select.mini {
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
</style>