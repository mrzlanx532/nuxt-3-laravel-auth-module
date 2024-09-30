import { navigateTo, defineNuxtRouteMiddleware, useState, useRuntimeConfig } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { redirects } = useRuntimeConfig().public.laravelAuth

  if (useState('auth').value !== null) {
    return navigateTo(redirects.auth, { replace: true })
  }
})
