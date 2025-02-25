<script setup lang="ts">
const users = ref([])
import { usePageStore } from '@/stores/page'
import expressService from '../services/expressQueries'
import { getPublicUrl } from '@/services/supaQueries'

usePageStore().pageData.title = 'Feed'

const fetchUsers = async () => {
  const response = await expressService.getUsers()
  users.value = response.data
}
fetchUsers()
</script>

<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        <div class="flex-row p-5 my-5 border border-dotted rounded-md">
          <span>
            <Avatar class="w-15 h-15 border border-amber-800 border-dashed">
              <AvatarImage :src="getPublicUrl(user.avatar_url) || ''" alt="User Avatar" />
              <AvatarFallback class="text-4xl">{{ user?.username?.[0] || '?' }}</AvatarFallback>
            </Avatar>
          </span>
          <span>
            <div class="flex">
              <div>
                {{ user.username }}
              </div>
              <div>
                {{ user.about }}
              </div>
            </div>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
