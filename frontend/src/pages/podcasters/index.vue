<script setup lang="ts">
import { usePodcastersStore } from '@/stores/loaders/podcasters'

usePageStore().pageData.title = 'Podcasters'

const podcastersLoader = usePodcastersStore()
const { podcasters } = storeToRefs(podcastersLoader)
const { getPodcasters } = podcastersLoader

await getPodcasters()
</script>

<template>
  <div class="p-5 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <Card class="hover:border-dashed" v-for="podcaster in podcasters">
      <CardHeader>
        <CardTitle>{{ podcaster.username }}</CardTitle>
        <CardDescription
          >{{
            podcaster.subscriptioncount ? podcaster.subscriptioncount : 0
          }}
          subscriptions</CardDescription
        >
      </CardHeader>
      <CardContent>
        has posted
        <b>{{
          podcaster.podcasts && podcaster.podcasts.length > 0
            ? podcaster.podcasts[0].name
            : 'nothing yet'
        }}</b></CardContent
      >
      <CardFooter>
        <div class="flex gap-2">
          <Button>
            <RouterLink
              :to="{ name: '/podcasters/[username]', params: { username: podcaster.username } }"
              >See podcaster</RouterLink
            >
          </Button>
          <Button @click="handleSubscribe(podcast.id)" variant="outline"> 🎁 Subscribe </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
