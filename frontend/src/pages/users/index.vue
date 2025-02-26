<script setup lang="ts">
import { useUsersStore } from '@/stores/loaders/users'

usePageStore().pageData.title = 'Users'

const usersLoader = useUsersStore()
const { users } = storeToRefs(usersLoader)
const { getUsers } = usersLoader

await getUsers()
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.username }}
    </li>
  </ul>
</template>
