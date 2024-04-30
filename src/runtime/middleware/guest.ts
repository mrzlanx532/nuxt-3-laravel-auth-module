import { useAuthStore } from './../stores/useAuthStore'
import { navigateTo, defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (auth.isLoggedIn) {
    return navigateTo('/')
  }
})
