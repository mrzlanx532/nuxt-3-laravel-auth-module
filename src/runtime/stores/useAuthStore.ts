import { type Ref, watch } from 'vue'
import { navigateTo, useCookie, useRuntimeConfig, useFetch, useNuxtApp, useState } from '#imports'

type Credentials = {
  email: string
  password: string
  is_remember?: boolean
}

type IUser<T = unknown> = Ref<T | null>

export interface IUseAuthStore {
  user: IUser
  login: (credentials: Credentials) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = (): IUseAuthStore => {
  const { domain, endpoints, redirects } = useRuntimeConfig().public.laravelAuth
  const user: IUser = useState('auth', () => null)

  const nuxtApp = useNuxtApp()

  watch(user, async (newValue) => {
    if (import.meta.server) {
      return
    }

    if (newValue) {
      nuxtApp.runWithContext(() => navigateTo(redirects.auth as string))
      return
    }

    nuxtApp.runWithContext(() => navigateTo(redirects.guest as string))
  })

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

    const response = await useFetch(`${domain}/${endpoints.fetchUser}`, {
      headers: {
        Authorization: authToken.value,
        Accept: 'application/json',
      },
    }).catch((err) => {
      console.error(err)
    })

    user.value = response?.data.value
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
    }).catch((err) => {
      console.log(err)
    })

    user.value = null
    authToken.value = null
  }

  return {
    user,
    login, fetchUser, logout,
  }
}
