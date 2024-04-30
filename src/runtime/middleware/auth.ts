import { useAuthStore } from './../stores/useAuthStore'
import { navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    return navigateTo('/login')
  }
})
