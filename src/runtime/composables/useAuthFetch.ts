import type { UseFetchOptions } from 'nuxt/app'
import { useFetch, useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export function useAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const headers: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const authToken = useCookie('auth_token')

  if (authToken.value) {
    headers['Authorization'] = authToken
  }

  const runtimeConfig = useRuntimeConfig()
  const backendBaseUrl = runtimeConfig.public.laravelAuth.backendBaseUrl

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
