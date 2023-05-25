<template>
  <NuxtLayout name="main" title="Ваши компании">
    <!-- Список компаний -->
    <ul class="companies">
      <!-- Компаний -->
      <li class="company" v-for="company in userStore.companies">
        <NuxtLink
          :to="`/companies/${company.slug}`"
          @click="() => onActiveCompany(company)"
          >{{ company.name }}
        </NuxtLink>
        <p>Пользователей: <span>1</span></p>
        <NuxtLink
          class="edit"
          :to="`/companies/${company.slug}/settings/general`"
        >
          <svg-icon name="edit" />
        </NuxtLink>
      </li>

      <!-- Кнопка добавления новой компании -->
      <li class="company add_company">
        <NuxtLink to="/create_company">
          <svg-icon name="add2" />
          <p>Добавить компанию</p>
        </NuxtLink>
      </li>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TCompany } from '~/api/models/company/types';
import { useUserStore } from '~/stores/UserStore';
import { useCompanyStore } from '~/stores/CompanyStore';

/**
 * Мета данные ----------------
 */
definePageMeta({
  layout: false,
});

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище пользователя
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Методы ----------------
 */
// Установление активной компании в хранилище
const onActiveCompany = (company: TCompany) => {
  companyStore.setActiveCompany(company);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

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