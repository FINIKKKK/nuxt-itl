<template>
    <NuxtLayout name="main" title="Ваши компании">

        <ul class="companies">
            <li class="company" v-for="company in companies">
                <NuxtLink to="/">{{ company.name }}</NuxtLink>
                <p>Пользователей: <span>1</span></p>
                <svg-icon class="edit" name="edit"/>
            </li>
            <li class="company add_company">
                <svg-icon name="add"/>
                <p>Добавить компанию</p>
            </li>
        </ul>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";

definePageMeta({
    layout: false,
});

const {companies} = useUserStore()


</script>

<style lang="scss" scoped>
.companies {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  flex-wrap: wrap;
}

.company {
  height: 140px;
  background-color: $white;
  padding: 37px 39px;
  border-radius: 2px;
  position: relative;
  transition: 0.3s;

  a {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 26px;
  }

  p {
    font-size: 14px;
    line-height: 20px;

    span {
      color: $blue;
    }
  }

  .edit {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 39px;
    top: 37px;
    cursor: pointer;
  }

  &:hover {
    box-shadow: 0 0 10px rgba($blue, 0.1);
  }
}

.add_company {
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $blue4;
  transition: 0.3s;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 20px;
  }

  p {
    color: $blue;
    font-size: 16px;
    line-height: 20px;
  }

  &:hover {
    border-color: $blue;
  }
}
</style>
