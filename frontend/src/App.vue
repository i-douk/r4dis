<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page'
onMounted(() => {
  useAuthStore().trackAuthChanges()
  usePageStore()
})
</script>
<template>
  <UserLayout>
    <Toaster />
    <RouterView />
  </UserLayout>
</template>
