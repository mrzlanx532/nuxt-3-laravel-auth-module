import { navigateTo, defineNuxtRouteMiddleware, useState, useRuntimeConfig, useCookie } from '#imports'

export default defineNuxtRouteMiddleware((route) => {
  const { redirects, isSaveRequestedPath } = useRuntimeConfig().public.laravelAuth

  if (useState('auth').value === null) {
    useCookie('laravel_auth.unauthorized_requested_path').value = isSaveRequestedPath ? route.fullPath : undefined

    return navigateTo(redirects.guest, { replace: true })
  }
})
