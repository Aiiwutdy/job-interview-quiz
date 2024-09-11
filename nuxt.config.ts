// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-10',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  build: {
    transpile: ['@popperjs/core']
  },
})

