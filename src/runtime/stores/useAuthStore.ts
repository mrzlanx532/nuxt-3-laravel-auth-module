import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCookie, useRouter, useRuntimeConfig } from '#imports'

type Credentials = {
  email: string
  password: string
  is_remember?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>({})

  const isLoggedIn = computed(() => user.value !== undefined && Object.keys(user.value).length !== 0)
  const router = useRouter()
  const backendBaseUrl = useRuntimeConfig().public.laravelAuth.backendBaseUrl

  async function login(credentials: Credentials) {
    const response = await $fetch(`${backendBaseUrl}/managers/self/auth`, {
      watch: false,
      method: 'POST',
      body: credentials,
    })

    const authToken = useCookie('laravel_auth.token')

    user.value = response.user
    authToken.value = `Bearer ${response.token}`

    await router.push({ path: '/' })
  }

  async function fetchUser() {
    const authToken = useCookie('laravel_auth.token')

    const response = await $fetch(`${backendBaseUrl}/managers/self/detail`, {
      headers: {
        Authorization: authToken.value,
        Accept: 'application/json',
      },
    }).catch(err => {
      console.log(err)
    })

    user.value = response
  }

  async function logout() {
    const authToken = useCookie('laravel_auth.token')

    await $fetch(`${backendBaseUrl}/managers/self/logout`, {
      method: 'POST',
      headers: {
        Authorization: authToken.value,
        Accept: 'application/json',
      },
    }).catch(err => {
      console.log(err)
    })

    user.value = null

    await router.push({ path: '/login' })
  }

  return {
    user, isLoggedIn,
    login, fetchUser, logout,
  }
})
