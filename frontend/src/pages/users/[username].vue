<script setup lang="ts">
import { userQuery } from '@/utils/supaQueries'
import type { Tables } from 'database/types'

const authStore = useAuthStore()
const { userProfile } = storeToRefs(useAuthStore())

// usePageStore().pageData.title = ''
</script>

<template>
  <div
    class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center"
  >
    <div class="flex flex-col items-center justify-center pb-4">
      <!-- <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> -->

      <p class="mt-2 text-gray-500">{{ userProfile.username }}</p>
      <p classs ='text-xl font-semibold'>About me :</p>
      <p class="mt-2 text-sm">{{ (userProfile.about)? userProfile.about : "No about section" }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>
