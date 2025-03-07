<script setup lang="ts">
import { ArrowLeft , Link , Mail, HeartHandshake} from 'lucide-vue-next';
import { getPublicUrl } from '@/services/supaQueries'
import expressService from '@/services/expressQueries'
const { slug } = useRoute('/podcasts/[slug]').params
usePageStore().pageData.title = slug + "\'s is a radpod"

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
      class="text-center w-fit font-semibold bg-neutral-800 rounded-sm border border-dotted p-2 hover:border-dashed hover:bg-transparent">
      <div class="flex">
        <ArrowLeft /> Go back
      </div>
    </RouterLink>
    <div class="flex flex-col border border-dashed rounded-sm">
      <img
        v-if="podcastData.cover_url"
        :src="getPublicUrl(podcastData.cover_url) || ''"
        alt="Podcast Cover"
        class="w-full h-64 object-cover"
      />
      <img v-else src="@/assets/r4dis-cover.png" alt="Podcast Cover" class="w-full h-64 object-cover" />

      <div class="flex justify-between items-center p-4">
        <div class="text-xl font-bold">
          {{ podcastData.name }}
        </div>
        <div class="flex gap-2">
          <Button class="font-semibold" variant="outline"><HeartHandshake />Follow </Button>
          <Button class="font-semibold" variant="outline"> <Mail /> Newsletter </Button>
        </div>
      </div>

      <div class="text-neutral-400 text-sm text-center p-4">
        {{ podcastData.followcount ? podcastData.followcount : 0 }} people are following
      </div>

      <ul class="flex flex-wrap gap-2 p-4">
        <li v-for="url in podcastData.urls" :key="url">
          <a :href="url" target="_blank">
          <Button variant="link"> <Link />{{ url }}
          </Button>
        </a>
        </li>
      </ul>
      <div class="p-4"><span class="font-bold">description: </span>{{ podcastData.description }}</div>
    </div>
  </div>
</template>
