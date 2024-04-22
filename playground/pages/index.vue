<script setup>
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: ['auth'],
})

const { $auth } = useNuxtApp()

const user = $auth().user
</script>

<template>
  <div>
    <h1>Auth page</h1>
    <p>
      {{ user }}
    </p>
  </div>
</template>
