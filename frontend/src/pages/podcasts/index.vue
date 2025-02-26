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
      {{ podcast.name }} by {{  podcast.podcaster_id }}
    </li>
  </ul>
</template>
