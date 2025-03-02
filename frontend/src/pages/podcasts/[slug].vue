<script setup lang="ts">
import { getPublicUrl } from '@/services/supaQueries'
import expressService from '@/services/expressQueries'
const { slug } = useRoute('/podcasts/[slug]').params
usePageStore().pageData.title = slug + "\'s is a radpod"
// import { getPublicUrl } from '@/services/supaQueries'
const fetchPodcast = async (slug: string) => {
  return await expressService.getPodcast(slug)
}

const response = await fetchPodcast(slug)
console.log(response.data)
const podcastData = response.data
console.log(podcastData)
</script>
<template>
  <div class="flex flex-col mt-5 gap-5">
    <RouterLink
      to="/podcasts"
      class="text-center w-23 font-semibold bg-neutral-800 rounded-sm border border-dotted p-1 hover:border-dashed hover:bg-transparent">
      Goback
    </RouterLink>
    <div class="flex flex-col justify-between border border-dashed rounded-sm p-8">
      <div class="flex justify-start gap-5 flex-wrap">
        <img
          v-if="podcastData.cover_url"
          :src="getPublicUrl(podcastData.cover_url) || ''"
          alt="Podcast Cover"
        />
        <img v-else src="@/assets/r4dis-cover.png" alt="Podcast Cover" />
        <div class="text-xl font-bold mt-10">
          {{ podcastData.name }}
        </div>
        <div class="flex justify-end flex-grow gap-2 flex-wrap">
          <Button class="mt-8 font-semibold"> 🤍 Follow </Button>
          <Button class="mt-8 font-semibold"> Newsletter </Button>
        </div>
      </div>
      <div class="text-neutral-400 text-sm text-center">
        {{ podcastData.followcount ? podcastData.followcount : 0 }} people are following
      </div>
      <div class="flex flex-col gap-2"></div>
      <ul class="flex flex-wrap">
        <li v-for="url in podcastData.urls" :key="url">
          <Button variant="outline"> 🔗 {{ url }}</Button>
        </li>
      </ul>
      <div>description: {{ podcastData.description }}</div>
    </div>
    <div></div>
  </div>
</template>
