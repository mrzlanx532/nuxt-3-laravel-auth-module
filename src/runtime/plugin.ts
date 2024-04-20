export default defineNuxtPlugin((nuxtApp) => {

  const authToken = useCookie('auth_token')

  const $customFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.laravelAuth.backendBaseUrl,
    onRequest({ request, options, error }) {
      if (authToken.value) {
        // Add Authorization header
        options.headers = options.headers || {}
        options.headers['Authorization'] = `Bearer ${authToken.value}`
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        return navigateTo('/login')
      }
    },
  })

  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})
