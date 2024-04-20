<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'

try {
  const { $customFetch } = useNuxtApp()

  const test = await $customFetch('users/browse')
} catch (err) {
  console.error(err)
}

</script>
