<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/loaders/users'
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page' // Ensure this is correctly imported
import type { ColumnDef } from '@tanstack/vue-table'
import { storeToRefs } from 'pinia'
import { h, onMounted } from 'vue'
import { Star, StarOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router/auto'
import expressService from '@/services/expressQueries';
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
    userId : string,
    podcastId: string
    id: string
    starred: boolean
  }
}
const handleStarToggle = (following: Following) => {
  following.following.starred = !following.following.starred
  // add logic to star or unstar
}

const handleUnfollow = async (id: string) => {
   await expressService.unfollowPocast(id)
}
const handleFollow = async (podcastId :string,userId: string) => {
   await expressService.followPodcast(podcastId,userId)
}

const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left text-blue-200' }, ''),
    cell: ({ row }) => {
      const slug = String(row.getValue('slug'))
      return h(
        RouterLink,
        { class: 'text-right font-bold text-blue-200 hover:bg-muted', to: `/podcasts/${slug}` },
        '@' + slug,
      )
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
      const rowButtonText = ref('unfollow')

      return h(
        Button,
        {
          variant: 'outline',
          class: 'cursor-pointer',
          onClick: async () => {
            if (rowButtonText.value === 'unfollow') {
              await handleUnfollow(following.id)
              rowButtonText.value = 'follow'
            } else {
              await handleFollow(following.podcastId, following.userId)
              rowButtonText.value = 'unfollow'
            }
          },
        },
        () => rowButtonText.value
      )
    },
  },
  {
    accessorKey: 'following.starred',
    header: () => h('div', ''),
    cell: ({ row }) => {
      const following = row.original.following
      return h(following.starred ? Star : StarOff, {
        class: 'cursor-pointer text-yellow-300',
        onClick: () => handleStarToggle(row.original),
      })
    },
  },
]
</script>

<template>
  <div :key='buttonText' class="container px-30 py-5">
    <div class="text-sm text-gray-400">* toggle the star icon to mark a privileged podcast</div>
    <div  v-if="singleUser?.followings"  class="mt-5 text-sm text-gray-200 ">{{singleUser.followings.length}} followed podcasts</div>
    <DataTable 
      v-if="singleUser?.followings" 
      :columns="columns"
      :data="singleUser.followings" />
  </div>
</template>
