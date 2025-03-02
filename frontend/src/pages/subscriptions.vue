<script setup lang="ts">
import { useUsersStore } from '@/stores/loaders/users'
import { useAuthStore } from '@/stores/auth'
import { usePageStore } from '@/stores/page' // Ensure this is correctly imported
import type { ColumnDef } from '@tanstack/vue-table'
import { storeToRefs } from 'pinia'
import { h, onMounted } from 'vue'
import { CircleDollarSign, CircleOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
// Page title
usePageStore().pageData.title = 'My subscriptions list'

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

interface Subscription {
  username: string
  subscription: {
    id: string
    frozen: boolean
  }
  links: string[]
}

const handleToggle = (subscription: Subscription) => {
  subscription.subscription.frozen = !subscription.subscription.frozen
  // add logic to freeze or unfreeze
}
const handleSubscribe = (id: string) => {
  // add logic to unsubscribe
}

const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: 'username',
    header: () => h('div', { class: 'text-left text-blue-200' }, ''),
    cell: ({ row }) => {
      const username = String(row.getValue('username'))
      return h(
        'a',
        { class: 'text-right font-bold text-blue-200', href: `/podcasters/${username}` },
        '@' + username,
      )
    },
  },
  {
    accessorKey: 'following.id',
    header: () => h('div', ''),
    cell: ({ row }) => {
      const following = row.original.subscription
      return h(
        Button,
        {
          variant: 'outline',
          onClick: () => handleSubscribe(row.original.subscription.id),
        },
        following.id ? 'unsubscribe' : 'subscribe',
      )
    },
  },
  {
    accessorKey: 'subscription.frozen',
    header: () => h('div', ''),
    cell: ({ row }) => {
      const subscription = row.original.subscription
      return h(subscription.frozen ? CircleDollarSign : CircleOff, {
        class: 'cursor-pointer text-blue-300',
        onClick: () => handleToggle(row.original),
      })
    },
  },
]
</script>

<template>
  <div class="container px-30 py-10">
    <div class="text-sm text-gray-400">
      * toggle the blue icon to freeze or unfreeze a subscription to a podcaster
    </div>
    <DataTable
      v-if="singleUser?.subscriptions"
      :columns="columns"
      :data="singleUser.subscriptions"
    />
  </div>
</template>
