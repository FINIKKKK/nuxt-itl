<template>
  <main>
    <aside class="sidebar">
      <NuxtLink to="/" class="logo">
        <img src="~/assets/img/logo.svg" alt="logo" />
      </NuxtLink>
      <nav class="nav">
        <ul class="nav__list nav__list-up">
          <li class="nav__item">
            <NuxtLink to="/home"
              ><img src="~/assets/img/home.svg" alt="home"
            /></NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/add"
              ><img src="~/assets/img/plus.svg" alt="add"
            /></NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/search"
              ><img src="~/assets/img/search.svg" alt="search"
            /></NuxtLink>
          </li>
        </ul>
        <ul class="nav__list nav__list-down">
          <li class="nav__item">
            <NuxtLink to="/settings"
              ><img src="~/assets/img/settings.svg" alt="settings"
            /></NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/notices"
              ><img src="~/assets/img/bell.svg" alt="notices"
            /></NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/info"
              ><img src="~/assets/img/info.svg" alt="info"
            /></NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/register"
              ><img src="~/assets/img/user.svg" alt="info"
            /></NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <slot />
  </main>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "~/assets/styles/assets/variables";

main {
  display: flex;
}
.sidebar {
  background-color: $blue;
  width: 96px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 38px;
}
.logo {
  margin-bottom: 50px;
}
.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.nav__list {
  width: 100%;
}
.nav__item {
  cursor: pointer;
  padding: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: $blue2;
  }
}
</style>
