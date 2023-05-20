<template>
  <div ref="selectRef" class="select" :class="{customClass, active: isOpen}">
    <div class="selected" @click="toggleDropdown">
      <span>{{ selectedOption }}</span>
      <svg-icon name="down"/>
    </div>
    <ul v-if="isOpen" class="dropdown">
      <li v-for="option in options" :key="option.id" @click="selectOption(option.value)"
          :class="{active: option.value === selectedOption}">
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useOutsideClick} from "~/hooks/useOutsideClick";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  customClass: {
    type: String,
    default: '',
    required: false,
  },
});


const isOpen = ref(false);
const selectedOption = ref(props.options[0].value);
const selectRef = ref(null);
useOutsideClick(selectRef, isOpen);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}
const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  user-select: none;
}

.selected {
  padding: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: $blue;
    margin-right: 10px;
  }
  svg {
    width: 10px;
    height: 10px;
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

.active {
  svg {
    transform: rotate(180deg);
  }
}
</style>