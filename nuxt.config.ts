// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  css: ["~/assets/styles/style.scss"],
  modules: [
    // ...
    "@pinia/nuxt",
  ],
});
