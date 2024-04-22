import { useAuthStore } from "./stores/useAuthStore";

export default defineNuxtPlugin((nuxtApp: any) => {
  const authToken = useCookie('auth_token')

  const $authFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.laravelAuth.backendBaseUrl,
    onRequest({ options }) {
      if (authToken.value) {
        // Add Authorization header
        options.headers = options.headers || {}
        options.headers['Authorization'] = `Bearer ${authToken.value}`
      }
    },
  })

  return {
    provide: {
      authFetch: $authFetch,
      auth: useAuthStore,
    },
  }
})
