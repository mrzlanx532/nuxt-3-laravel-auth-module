import { defineNuxtModule, addPlugin, createResolver, addImports, addRouteMiddleware, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  baseUrl: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'laravel-auth',
    configKey: 'laravelAuth',
  },
  async setup(options, nuxt) {
    await installModule('@pinia/nuxt')

    nuxt.options.runtimeConfig.public.laravelAuth = {
      backendBaseUrl: options.baseUrl,
    }

    if (!Object.hasOwn(options, 'baseUrl')) {
      throw new Error('Missing `laravelAuth->baseUrl` in nuxt.config.json')
    }

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
