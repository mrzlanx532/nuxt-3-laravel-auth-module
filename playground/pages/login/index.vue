<script setup>
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: ['guest'],
})

const { $auth } = useNuxtApp()

const email = ref('denis_danilov_97@mail.ru')
const password = ref('4aWvh75t')

const onAuthorize = () => {
  $auth().login({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div>
    <h1>Guest page</h1>
    <form>
      <label for="email">
        Email
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Email"
        >
      </label>
      <label for="password">
        Password
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="password"
        >
      </label>
      <button @click.prevent="onAuthorize">
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

button {
  width: 50px;
}
</style>
