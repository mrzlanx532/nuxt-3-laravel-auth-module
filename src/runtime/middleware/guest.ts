import { useAuthStore } from './../stores/useAuthStore'
import { navigateTo, defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()

  if (auth.isLoggedIn) {
    return navigateTo('/', { replace: true })
  }
})
