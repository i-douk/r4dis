<script setup lang="ts">
import type { ExtendedPodcaster } from '@/types/ExtendedTableTypes'
import { reactive, onMounted } from 'vue'
import { usePodcastersStore } from '@/stores/loaders/podcasters'
import { useAuthStore } from '@/stores/auth'
import expressService from '@/services/expressQueries'
import { toast } from '@/components/ui/toast/use-toast'
import { Award , X } from 'lucide-vue-next'
import router from '@/router'
usePageStore().pageData.title = 'Podcasters'

// Stores
const authStore = useAuthStore()
const podcastersLoader = usePodcastersStore()
const { podcasters } = storeToRefs(podcastersLoader)
const { getPodcasters } = podcastersLoader
const { userProfile } = storeToRefs(authStore)

// Fetch podcasters
await getPodcasters()

// Reactive object to track subscription state
const isSubscribed = reactive<Record<string, boolean>>({})

// Initialize subscription state
const setSubscription = (subscribers: any[]) => {
  return subscribers.some((subscriber: { id: string | undefined }) => subscriber.id === userProfile.value?.id)
}

onMounted(() => {
  podcasters.value?.forEach(podcaster => {
    isSubscribed[podcaster.id] = setSubscription(podcaster.subscribers)
  })
})

// Handlers
const handleSubscribe = async (podcaster: ExtendedPodcaster) => {
  if(!userProfile.value) return router.push('/login')
  const response = await expressService.subscribeToPodcaster(podcaster.id, userProfile.value.id)

  if (response.status === 201) {
    toast({ title: `You have just subscribed to ${podcaster.username}` })
    isSubscribed[podcaster.id] = true
  }
}

const handleUnsubscribe = async (podcaster: ExtendedPodcaster) => {
  const subscriber = podcaster.subscribers.find(subscriber => subscriber.id === userProfile.value?.id)

  if (!subscriber) {
    console.error('User is not subscribed')
    return
  }

  const response = await expressService.unsubscribeToPocaster(subscriber.subscription.id)

  if (response.status === 204) {
    toast({ title: `You just unsubscribed from ${podcaster.username}` })
    isSubscribed[podcaster.id] = false
  }
}
</script>

<template>
  <div class="p-4 grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1">
    <Card class="hover:border-dashed" v-for="podcaster in podcasters" :key="podcaster.id">
      <CardHeader>
        <CardTitle>{{ podcaster.username }}</CardTitle>
        <CardDescription>{{ podcaster.subscriberscount || 0 }} subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        has posted
        <b>{{ podcaster.podcasts?.length ? podcaster.podcasts[0].name : 'nothing yet' }}</b>
      </CardContent>
      <CardFooter class="flex justify-evenly gap-4 flex-nowrap">
          <Button variant="outline">
            <RouterLink
              :to="{ name: '/podcasters/[username]', params: { username: podcaster.username } }"
              >See podcaster</RouterLink
            >
          </Button>
          <Button v-if="!isSubscribed[podcaster.id] && userProfile" @click="handleSubscribe(podcaster)" variant="outline">
            <Award />
            Subscribe
          </Button>
          <Button v-if="isSubscribed[podcaster.id] && userProfile" @click="handleUnsubscribe(podcaster)" variant="outline">
            <X />
            Unsubscribe
          </Button>
      </CardFooter>
    </Card>
  </div>
</template>
