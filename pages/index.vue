<template>
    <NuxtLayout name="main" title="Ваши компании">
        <ul class="companies">
            <li class="company" v-for="company in companies">
                <NuxtLink :to="`/companies/${company.slug}`" @click="() => onActiveCompany(company)">{{ company.name }}</NuxtLink>
                <p>Пользователей: <span>1</span></p>
                <NuxtLink class="edit" to="edit_company">
                    <svg-icon name="edit"/>
                </NuxtLink>
            </li>
            <li class="company add_company">
                <NuxtLink to="/create_company">
                    <svg-icon name="add2"/>
                    <p>Добавить компанию</p>
                </NuxtLink>
            </li>
        </ul>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {Api} from "~/api";
import {useUserStore} from "~/stores/UserStore";
import {TCompany} from "~/api/models/company/types";

definePageMeta({
    layout: false,
});

const {companies, setActiveCompany} = useUserStore()

const onActiveCompany = (company: TCompany) => {
    setActiveCompany(company);
}
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
    white-space: nowrap;

    span {
      color: $blue;
    }
  }

  .edit {
    position: absolute;
    right: 39px;
    top: 37px;
    cursor: pointer;

    svg {
      height: 18px;
      width: 18px;
    }
  }

  &:hover {
    box-shadow: 0 0 10px rgba($blue, 0.1);
  }
}

.add_company {
  background-color: transparent;
  border: 1px solid $blue4;
  transition: 0.3s;
  cursor: pointer;
  padding: 0;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 37px 39px;

    &:hover {
      text-decoration: none;
    }
  }

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
