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
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </UserLayout>
</template>
