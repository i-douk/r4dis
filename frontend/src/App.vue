<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page'
import { useErrorStore } from './stores/error'
const {activeError} = storeToRefs(useErrorStore())
import ErrorPage from './components/ErrorPage/ErrorPage.vue'
const authStore = useAuthStore()
const errorStore = useErrorStore()
onMounted(() => {
  authStore.trackUserAuthChanges()
  authStore.trackPodcasterAuthChanges()
  usePageStore()
})

onErrorCaptured((error) => {
  errorStore.setError({error})
})
</script>
<template>
  <UserLayout>
    <Toaster />
    <RouterView v-slot="{Component, route}" >
      <ErrorPage v-if="activeError"/>
      <Suspense v-if="Component" :timeout="0">
        <template #default>
          <Component  :is="Component" :key="route.name"/>
      </template>
      <template #fallback>
        <div
        class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
        >
        <iconify-icon icon="lucide:loader-circle"></iconify-icon>
      </div>
    </template>
  </Suspense>
</RouterView>
  </UserLayout>
</template>
