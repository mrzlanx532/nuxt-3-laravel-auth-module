import { ofetch } from 'ofetch' // Хак, без этого не работает при публикации пакета npm
import type { UseFetchOptions } from '#imports'
import { useFetch, useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export function useAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  if (options.body instanceof FormData) {
    delete headers['Content-Type']
  }

  const authToken = useCookie('laravel_auth.token')

  if (authToken.value) {
    headers['Authorization'] = authToken.value
  }

  const runtimeConfig = useRuntimeConfig()
  const backendBaseUrl: string = runtimeConfig.public.laravelAuth.backendBaseUrl

  return useFetch(`${backendBaseUrl}/${path}`, {
    watch: false,
    ...options,
    $fetch: useNuxtApp().$authFetch,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })
}
