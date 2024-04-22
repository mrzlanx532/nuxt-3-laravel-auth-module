import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch, useCookie, useRouter } from '#imports'

type Credentials = {
  email: string
  password: string
  is_remember?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>({})

  const isLoggedIn = computed(() => Object.keys(user.value).length !== 0)
  const router = useRouter()

  async function login(credentials: Credentials) {
    const response = await $fetch('http://backoffice-api.lsmlocal.ru/managers/self/auth', {
      watch: false,
      method: 'POST',
      body: credentials,
    })

    const authToken = useCookie('auth_token')

    user.value = response.user
    authToken.value = `Bearer ${response.token}`

    await router.push({ path: '/' })
  }

  async function fetchUser() {
    const authToken = useCookie('auth_token')

    const response = await $fetch('http://backoffice-api.lsmlocal.ru/managers/self/detail', {
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
    const authToken = useCookie('auth_token')

    await $fetch('http://backoffice-api.lsmlocal.ru/managers/self/logout', {
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
