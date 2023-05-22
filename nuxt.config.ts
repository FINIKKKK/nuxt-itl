// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/style.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/svg-sprite'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/assets/variables";',
        },
      },
    },
  },
  svgSprite: {
    input: '~/assets/img',
    output: '~/assets/sprite',
  },
  ssr: true,
  runtimeConfig: {
    public: {
      sidebar: {
        list1: {
          home: 'home',
          add: 'add',
          search: 'search',
        },
        list2: {
          tooltip: 'tooltip',
          settings: 'settings',
          user: 'user',
        },
      },
    },
  },
});
