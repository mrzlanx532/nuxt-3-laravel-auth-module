import { defineNuxtModule, addPlugin, createResolver, addImports, addRouteMiddleware, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  domain: string
  endpoints: {
    login: string
    logout: string
    fetchUser: string
    register?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'laravel-auth',
    configKey: 'laravelAuth',
  },
  async setup(options, nuxt) {
    await installModule('@pinia/nuxt')

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
