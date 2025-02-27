<script setup lang="ts">
import { usePodcastsStore } from '@/stores/loaders/podcasts'

usePageStore().pageData.title = 'Podcasts'

const podcastsLoader = usePodcastsStore()
const { podcasts } = storeToRefs(podcastsLoader)
const { getPodcasts } = podcastsLoader

await getPodcasts()
</script>

<template>
  <div class=" p-5 grid grid-cols-4 gap-4">
    <Card class='hover:border-dashed' v-for="podcast in podcasts">
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
        <Button>
          <RouterLink
            :to="{ name: '/podcasts/[id]', params: { id: podcast.id } }"
            >See podcast</RouterLink
          >
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
