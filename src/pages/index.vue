<template>
  <div>Главная</div>
  <header>
    <nav v-if="userData === null">
      <ul>
        <li>
          <NuxtLink to="/register">Регистрация</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">Войти</NuxtLink>
        </li>
      </ul>
    </nav>
    <p v-else>Пользователь вошел</p>
  </header>
</template>

<script setup>
import { useUserStore } from "~/stores/UserStore";

const { userData } = useUserStore();
</script>

<style lang=""></style>
