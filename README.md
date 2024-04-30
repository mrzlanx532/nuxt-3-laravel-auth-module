# Конфигурация nuxt.config.js

```ts
export default defineNuxtConfig({
  laravelAuth: {
    domain: 'http://subdomain.domain',
    endpoints: {
      login: 'managers/self/auth',
      logout: 'managers/self/logout',
      fetchUser: 'managers/self/detail',
      register: 'managers/self/register', // Опционально
    },
  },
})
```

