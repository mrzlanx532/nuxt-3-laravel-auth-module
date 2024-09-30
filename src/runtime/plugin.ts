import { useAuthStore } from './stores/useAuthStore'
import { useCookie, defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.laravelAuth.backendBaseUrl,
    onRequest({ options }) {
      const authToken = useCookie('laravel_auth.token')
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

  if (auth.user.value === null) {
    await auth.fetchUser()
  }

  return {
    provide: {
      authFetch,
      auth: useAuthStore,
    },
  }
})
