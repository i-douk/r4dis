<script setup lang="ts">
const users = ref([])
import { usePageStore } from '@/stores/page'
import expressService from '../services/expressQueries'

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
          <b>{{ user.username }}</b> just signed up.
        </div>
      </li>
    </ul>
  </div>
</template>
