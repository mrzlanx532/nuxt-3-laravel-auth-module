<script setup>
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: ['auth'],
})

const { $auth } = useNuxtApp()

const user = $auth().user

async function logout() {
  await $auth().logout()
}
</script>

<template>
  <div>
    <h1>Auth page</h1>
    <p>
      {{ user }}
    </p>
    <button @click="logout">
      Выйти
    </button>
  </div>
</template>
