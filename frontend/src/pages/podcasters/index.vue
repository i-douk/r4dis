<script setup lang="ts">
import { usePodcastersStore } from '@/stores/loaders/podcasters'

usePageStore().pageData.title = 'Podcasters'

const podcastersLoader = usePodcastersStore()
const { podcasters } = storeToRefs(podcastersLoader)
const { getPodcasters } = podcastersLoader

await getPodcasters()
console.log(podcasters.value)
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <Card v-for="podcaster in podcasters">
      <CardHeader>
        <CardTitle>{{ podcaster.username }}</CardTitle>
        <CardDescription
          >{{ podcaster.subscriptioncount }} subscriptions</CardDescription
        >
      </CardHeader>
      <CardContent>
        has posted
        <b>{{
          podcaster.podcasts && podcaster.podcasts[0] ? podcaster.podcasts[0].name : 'nothing yet'
        }}</b></CardContent
      >
      <CardFooter>
        <Button>
          <RouterLink
            :to="{ name: '/podcasters/[username]', params: { username: podcaster.username } }"
            >See podcaster</RouterLink
          >
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>