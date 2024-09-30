import type {} from 'ofetch'
import { useFetch, useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export function useAuthFetch(path: string, options = {}) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  // @ts-expect-error: difficult to type
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const authToken = useCookie('laravel_auth.token')

  if (authToken.value) {
    headers['Authorization'] = authToken.value
  }

  const runtimeConfig = useRuntimeConfig()
  const backendBaseUrl: string = runtimeConfig.public.laravelAuth.domain

  return useFetch(`${backendBaseUrl}/${path}`, {
    watch: false,
    ...options,
    $fetch: useNuxtApp().$authFetch,
    headers: {
      ...headers,
      // @ts-expect-error: difficult to type
      ...options?.headers,
    },
  })
}
