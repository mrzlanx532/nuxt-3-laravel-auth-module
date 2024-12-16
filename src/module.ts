import { defineNuxtModule, addPlugin, createResolver, addImports, addRouteMiddleware } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

export interface ModuleOptions {
  domain: string
  endpoints: {
    login: string
    logout: string
    fetchUser: string
    register: string
  }
  redirects: {
    auth: string
    guest: string
  }
  isSaveRequestedPath: boolean
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
  isSaveRequestedPath: true,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'laravel-auth',
    configKey: 'laravelAuth',
  },
  defaults: defaultModuleOptions,
  async setup(options: ModuleOptions, nuxt: Nuxt) {
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
