export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  laravelAuth: {
    domain: 'http://backoffice-api.lsmlocal.ru',
    redirects: {
      auth: '/',
      guest: '/login',
    },
    endpoints: {
      login: 'managers/self/auth',
      logout: 'managers/self/logout',
      fetchUser: 'managers/self/detail',
      register: '/',
    },
  },
})
