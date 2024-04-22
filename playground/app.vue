<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
try {
  const test = await useAuthFetch('users/browse')

  console.log(test)

} catch (err) {
  console.error(err)
}
</script>
