import { useAuthStore } from './stores/useAuthStore'
import { useCookie, defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authToken = useCookie('laravel_auth.token')

  const $authFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.laravelAuth.backendBaseUrl,
    onRequest({ options }) {
      const headers: HeadersInit = {
        Accept: 'application/json',
      }

      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }

      if (authToken.value) {
        headers['Authorization'] = authToken.value
      }

      options.headers = {
        ...headers,
        ...options?.headers,
      }
    },
  })

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    await auth.fetchUser()
  }

  return {
    provide: {
      authFetch: $authFetch,
      auth: useAuthStore,
    },
  }
})
