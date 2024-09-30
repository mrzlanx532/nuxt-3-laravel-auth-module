<script setup>
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: ['auth'],
})

const { $auth, $authFetch } = useNuxtApp()

const user = $auth().user

async function logout() {
  await $auth().logout()
}

const test = () => {
  const fd = new FormData()

  $authFetch('users/create', {
    method: 'POST',
    body: fd,
    headers: {
      'X-API': 'application/json',
    },
  })
}
</script>

<template>
  <div>
    <h1>Auth page</h1>
    <p>
      {{ user }}
    </p>
    <button @click="test">Чек</button>
    <button @click="logout">
      Выйти
    </button>
  </div>
</template>
