# Конфигурация nuxt.config.js

```ts
export default defineNuxtConfig({
  laravelAuth: {
    domain: 'http://subdomain.domain',
    redirects: {
      auth: '/',
      guest: '/login',
    },
    endpoints: {
      login: 'managers/self/auth',
      logout: 'managers/self/logout',
      fetchUser: 'managers/self/detail',
      register: 'managers/self/register', // Опционально
    },
  },
})
```

