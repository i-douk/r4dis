<script setup lang="ts">
import { usePodcastersStore } from '@/stores/loaders/podcasters'


usePageStore().pageData.title = 'Podcasters'

const podcastersLoader = usePodcastersStore()
const { podcasters } = storeToRefs(podcastersLoader)
const { getPodcasters } = podcastersLoader

await getPodcasters()

</script>

<template>
  <ul>
    <li v-for="podcaster in podcasters" :key="podcaster.id">
        {{  podcaster.username }}
    </li>
  </ul>
</template>
