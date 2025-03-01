<script setup lang="ts">
const users = ref([])
import { usePageStore } from '@/stores/page'
import expressService from '../../services/expressQueries'
import { getPublicUrl } from '@/services/supaQueries'

usePageStore().pageData.title = 'Users List'

const fetchUsers = async () => {
  const response = await expressService.getUsers()
  users.value = response.data
}
fetchUsers()
</script>

<template>
  <div>
    <ul class="w-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
      <li v-for="user in users" :key="user.id">
        <div class="flex flex-col items-center text-center p-5 my-5 border border-dotted rounded-md gap-2">
            <Avatar class="w-15 h-15 border border-neutral-500 border-dashed">
              <AvatarImage :src="getPublicUrl(user.avatar_url) || ''" alt="User Avatar" />
              <AvatarFallback class="text-4xl">{{ user?.username?.[0] || '?' }}</AvatarFallback>
            </Avatar>
            <div class=" font-bold">
              {{ user.username }}
              <div class="mt-1">
                <Button variant="outline"> ✉️ Contact</Button>
              </div>
              </div>
        </div>
      </li>
    </ul>
  </div>
</template>