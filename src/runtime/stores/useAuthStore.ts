import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { navigateTo, useCookie, useRuntimeConfig, useFetch } from '#imports'

type Credentials = {
  email: string
  password: string
  is_remember?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})

  const isLoggedIn = computed(() => {
    if (user.value === undefined) {
      return false
    }

    if (user.value === null) {
      return false
    }

    return Object.keys(user.value).length > 0
  })

  watch(isLoggedIn, async (newValue, prev) => {

    if (import.meta.server) {
      return
    }

    if (newValue) {
      navigateTo('/')
      return
    }

    navigateTo('/login')
  })

  const { domain, endpoints } = useRuntimeConfig().public.laravelAuth

  async function login(credentials: Credentials) {
    const response = await $fetch(`${domain}/${endpoints.login}`, {
      watch: false,
      method: 'POST',
      body: credentials,
    })

    const authToken = useCookie('laravel_auth.token')

    authToken.value = `Bearer ${response.token}`
    user.value = response.user
  }

  async function fetchUser() {
    const authToken = useCookie('laravel_auth.token')

    if (!authToken.value) {
      return
    }

    const { data } = await useFetch(`${domain}/${endpoints.fetchUser}`, {
      headers: {
        Authorization: authToken.value,
        Accept: 'application/json',
      },
    }).catch(err => {
      console.log(err)
    })

    user.value = data.value
  }

  async function logout() {
    const authToken = useCookie('laravel_auth.token')

    if (!authToken.value) {
      return
    }

    await $fetch(`${domain}/${endpoints.logout}`, {
      method: 'POST',
      headers: {
        Authorization: authToken.value,
        Accept: 'application/json',
      },
    }).catch(err => {
      console.log(err)
    })

    user.value = {}
    authToken.value = null
  }

  return {
    user, isLoggedIn,
    login, fetchUser, logout,
  }
})
