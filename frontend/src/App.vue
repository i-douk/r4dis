<script setup lang="ts">
import UserLayout from './layouts/UserLayout.vue'
onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>
<template>
  <UserLayout>
    <RouterView />
  </UserLayout>
</template>
