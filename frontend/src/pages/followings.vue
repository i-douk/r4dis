<script setup lang="ts">
import { useUsersStore } from '@/stores/loaders/users'
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page' // Ensure this is correctly imported
import type { ColumnDef } from '@tanstack/vue-table'
import { storeToRefs } from 'pinia'
import { h, onMounted } from 'vue'
import { Star, StarOff } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
// Page title
usePageStore().pageData.title = 'My followings list'

// Stores
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)

const myUserLoader = useUsersStore()
const { singleUser } = storeToRefs(myUserLoader)
const { getSingleUser } = myUserLoader

onMounted(async () => {
  if (userProfile.value?.username) {
    await getSingleUser(userProfile.value.username)
  }
})

interface Following {
  name: string
  slug: string
  following: {
    id: string
    starred: boolean
  }
}

const handleToggle = (following: Following) => {
  following.following.starred = !following.following.starred
  // add logic to star or unstar
}
const handleFollow = (_id: string) => {
  //add logic to delete following relation
}

const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left text-blue-200' }, ''),
    cell: ({ row }) => {
      const slug = String(row.getValue('slug'))
      return h('a', { class: 'text-right font-bold text-blue-200', href: `/podcasts/${slug}` }, '@' + slug)
    },
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, ''),
    cell: ({ row }) => {
      const podcast = String(row.getValue('name'))
      return h('div', { class: 'text-left font-medium' }, podcast)
    },
  },
  {
    accessorKey: 'following.id',
    header: () => h('div', ''),
    cell: ({ row }) => {
      const following = row.original.following
      return h(
        Button,
        {
          variant: 'outline',
          onClick: () => handleFollow(row.original.following.id),
        },
        following.id? 'unfollow' : 'follow'
      )
    },
  },
  {
    accessorKey: 'following.starred',
    header: () => h('div', ''),
    cell: ({ row }) => {
      const following = row.original.following
      return h(
        following.starred ? Star : StarOff,
        {
          class: 'cursor-pointer text-yellow-300',
          onClick: () => handleToggle(row.original),
        }
      )
    },
  },
]
</script>

<template>
  <div class="container px-30 py-5">
    <div class="text-sm text-gray-400"> * toggle the star icon to mark a privileged podcast</div>
    <DataTable v-if="singleUser?.followings" :columns="columns" :data="singleUser.followings" />
  </div>
</template>
