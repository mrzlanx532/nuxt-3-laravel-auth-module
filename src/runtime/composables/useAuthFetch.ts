import type {} from 'ofetch'
import { useFetch, useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

type useFetchArgs = Parameters<typeof useFetch>

export function useAuthFetch(request: useFetchArgs[0], opts: useFetchArgs[1] = {}) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (!(opts.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const authToken = useCookie('laravel_auth.token')

  if (authToken.value) {
    headers['Authorization'] = authToken.value
  }

  const runtimeConfig = useRuntimeConfig()
  const backendBaseUrl: string = runtimeConfig.public.laravelAuth.domain

  return useFetch(`${backendBaseUrl}/${request}`, {
    watch: false,
    ...opts,
    $fetch: useNuxtApp().$authFetch,
    headers: {
      ...headers,
      ...opts?.headers,
    },
  })
}
