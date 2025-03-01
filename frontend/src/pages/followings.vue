<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/loaders/users'
import { useAuthStore } from '@/stores/auth'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

// Stores
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const myUserLoader = useUsersStore()
const { singleUser } = storeToRefs(myUserLoader)
const { getSingleUser } = myUserLoader
const followings: Following[]= []
// State

interface Following {
  name: string
  slug: string
  following: {
    id: string
    starred: boolean
  }
}

  if (userProfile.value?.username && singleUser.value) {
    await getSingleUser(userProfile.value.username)
    followings = singleUser.value.followings || [] 
  }

// Columns for the table
const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'following',
    header: () => h('div', { class: 'text-right' }, 'Podcast'),
    cell: ({ row }) => {
      const podcast = String(row.getValue('name'))
      return h('div', { class: 'text-right font-medium' }, podcast)
    },
  },
]
console.log(followings)
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="followings" />
  </div>
</template>
