import { useAuthStore } from "./stores/useAuthStore";
import { useCookie } from '#imports'

export default defineNuxtPlugin(async (nuxtApp: any) => {
  const authToken = useCookie('laravel_auth.token')

  const $authFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.laravelAuth.backendBaseUrl,
    onRequest({ options }) {
      if (authToken.value) {
        options.headers = options.headers || {}
        options.headers['Authorization'] = `Bearer ${authToken.value}`
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
