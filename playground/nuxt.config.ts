export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  laravelAuth: {
    baseUrl: 'http://backoffice-api.lsmlocal.ru',
  },
})
