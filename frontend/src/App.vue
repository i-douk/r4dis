<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import UserLayout from './layouts/UserLayout.vue'
onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>
<template>
  <UserLayout>
    <Toaster />
    <RouterView />
  </UserLayout>
</template>
