import { defineNuxtModule, addPlugin, createResolver, addImports, addRouteMiddleware } from '@nuxt/kit'

export interface ModuleOptions {
  domain: string
  redirects: {
    auth: '/'
    guest: '/login'
  }
  endpoints: {
    login: string
    logout: string
    fetchUser: string
    register?: string
  }
}

const defaultModuleOptions: ModuleOptions = {
  domain: 'http://localhost',
  endpoints: {
    login: 'login',
    logout: 'logout',
    fetchUser: 'fetchUser',
    register: 'register',
  },
  redirects: {
    auth: '/',
    guest: '/login',
  },
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'laravel-auth',
    configKey: 'laravelAuth',
  },
  defaults: defaultModuleOptions,
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.laravelAuth = options

    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./runtime/plugin'))
    addImports([{
      name: 'useAuthFetch',
      as: 'useAuthFetch',
      from: resolve('./runtime/composables/useAuthFetch'),
    }])
    addRouteMiddleware({
      name: 'auth',
      path: resolve('./runtime/middleware/auth'),
    })
    addRouteMiddleware({
      name: 'guest',
      path: resolve('./runtime/middleware/guest'),
    })
  },
})
