<script setup lang="ts">
import { usePodcastsStore } from '@/stores/loaders/podcasts'

usePageStore().pageData.title = 'Podcasts'

const podcastsLoader = usePodcastsStore()
const { podcasts } = storeToRefs(podcastsLoader)
const { getPodcasts } = podcastsLoader

await getPodcasts()
</script>

<template>
  <ul>
    <li v-for="podcast in podcasts" :key="podcast.id">
      {{ podcast.name }} by {{ podcast.podcaster_id }}
    </li>
  </ul>
  <div class="grid grid-cols-4 gap-4">
    <Card v-for="podcast in podcasts">
      <CardHeader>
        <CardTitle>{{ podcast.name }}</CardTitle>
        <CardDescription
          >{{ podcast.followcount }} followers</CardDescription
        >
      </CardHeader>
      <CardContent>
        was posted by
        <b>{{
          podcast.podcaster_id
        }}</b></CardContent
      >
      <CardFooter>
        <!-- <Button>
          <RouterLink
            :to="{ name: '/podcasts/[name]', params: { name: podcast.name } }"
            >See podcaster</RouterLink
          >
        </Button> -->
      </CardFooter>
    </Card>
  </div>
</template>
