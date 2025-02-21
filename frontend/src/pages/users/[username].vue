<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore)
console.log()
</script>

<template>
  <div
    class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center"
  >
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="userProfile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>{{ userProfile?.username[0] }}</AvatarFallback>
      </Avatar>

      <p class="mt-2 text-gray-500">{{ userProfile?.username }}</p>
      <p class="mt-2 text-sm">{{ userProfile?.about }}</p>
    </div>
    <Button>Edit userProfile</Button>
  </div>
</template>
