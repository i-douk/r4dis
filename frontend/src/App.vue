<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page'

const authStore = useAuthStore()
onMounted(() => {
  authStore.trackUserAuthChanges()
  authStore.trackPodcasterAuthChanges()
  usePageStore()
})
</script>
<template>
  <UserLayout>
    <Toaster />
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <iconify-icon icon="lucide:loader-circle"></iconify-icon>
      </template>
    </Suspense>
  </UserLayout>
</template>
