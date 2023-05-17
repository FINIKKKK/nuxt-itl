<template>
    <div class="popup" :class="{ active: props.isShow && props.activeItem }">
        <div class="popup__inner">
            <h3 class="popup__title">
                {{ props.activeItem && innerItems.find(obj => obj.id === props.activeItem).title }}
            </h3>
            <ul>
                <li
                        class="popup__item"
                        v-if="props.activeItem"
                        v-for="item in innerItems.find(obj => obj.id === props.activeItem).items"
                        :key="item.id"
                >
                    <NuxtLink :to="item.link">
                        <svg-icon :name="item.icon"/>
                        <p>{{ item.label }}</p>
                    </NuxtLink>
                </li>
            </ul>
            <div v-if="props.activeItem === 1" class="sections">
                <h3>Разделы</h3>
                <ul>
                    <li
                            class="popup__item"
                            v-if="props.activeItem"
                            v-for="section in sections"
                            :key="section.id"
                    >
                        <NuxtLink :to="`/sections/${section.id}`">
                            <svg-icon name="folder"/>
                            <p>{{ section.title }}</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {innerItems} from "~/utils/data/sidebar";
import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";

const props = defineProps({
    isShow: {
        type: Boolean,
        required: true,
    },
    activeItem: {
        type: Number as () => number | null,
        required: true,
    },
});

const userStore = useUserStore()
const {data: sections} = useAsyncData(async () => {
    const params = {
        company_id: userStore.activeCompany?.id || 1,
    }
    const {data} = await Api().section.getAll(params);
    return data;
});
console.log(sections);
</script>

<style lang="scss" scoped>
.popup {
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  background-color: $blue3;
  transition: 0.3s;
  transform: translateX(-100%);
  box-shadow: 0 0 10px rgba($blue, 0.2);

  .popup__inner {
    padding: 41px 50px;
    opacity: 0;
    transition: 0.3s;
  }

  .popup__title {
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
  }

  &.active {
    width: 300px;
    transform: translateX(0px);

    .popup__inner {
      opacity: 1;
    }
  }
}

.popup__item {
  transition: 0.3s;
  margin-left: -16px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 3px;
  }

  svg {
    width: 22px;
    height: 22px;
    margin-right: 15px;
    fill: $blue;
    flex: 0 0 auto;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: $black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: $blue4;

    a {
      text-decoration: none;
    }
  }
}

.sections {
  margin-top: 49px;

  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}
</style>
