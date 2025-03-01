<script setup lang="ts">
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
// State

interface Following {
  name: string
  slug: string
  following: {
    id: string
    starred: boolean
  }
} 

// Columns for the table
const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-right' }, 'followed podcast'),
    cell: ({ row }) => {
      const podcast = String(row.getValue('name'))
      return h('div', { class: 'text-right font-medium' }, podcast)
    },
  },
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-right' }, 'see podcast'),
    cell: ({ row }) => {
      const slug = String(row.getValue('slug'))
      return h('div', { class: 'text-right font-medium' }, slug)
    },
  },
  {
    accessorKey: 'following',
    header: () => h('div', { class: 'text-right' }, 'Fav'),
    cell: ({ row }) => {
      let rendered = ''
      const following = Object(row.getValue('following'))
      following.starred? rendered = 'yes' : "no"
      return h('div', { class: 'text-right font-medium' }, rendered)
    },
  },
]
await getSingleUser(userProfile.value.username)
const followings = singleUser.value.followings
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="followings" />
  </div>
</template>
