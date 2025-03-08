<script setup lang="ts">
import { ArrowLeft , Link , Award ,Mail} from 'lucide-vue-next';
import expressService from '@/services/expressQueries'
const { username } = useRoute('/podcasters/[username]').params
usePageStore().pageData.title = username + "\'s is rad"
import { getPublicUrl } from '@/services/supaQueries'

const fetchPodcaster = async (username: string) => {
  return await expressService.getPodcaster(username)
}
const response = await fetchPodcaster(username)
const podcasterData = response.data
</script>

<template>
  <div class="flex flex-col mt-5 gap-5">
    <RouterLink
      to="/podcasters"
      class="text-center w-fit font-semibold bg-neutral-800 rounded-sm border border-dotted p-2 hover:border-dashed hover:bg-transparent">
      <div class="flex">
        <ArrowLeft /> Go back
      </div>
    </RouterLink>
    <div class="flex flex-col border border-dashed rounded-sm p-8 gap-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-5">
          <Avatar class="w-24 h-24 border border-neutral-800 border-dashed">
            <AvatarImage :src="getPublicUrl(podcasterData.avatar_url) || ''" alt="Podcaster Avatar" />
            <AvatarFallback class="text-4xl">
              {{ podcasterData?.username?.[0] || '?' }}
            </AvatarFallback>
          </Avatar>
          <div class="text-xl font-bold">
            {{ podcasterData.username }}
          </div>
        </div>
        <div class="flex gap-2">
          <Button class="font-semibold" variant="outline"><Award /> Subscribe </Button>
          <Button class="font-semibold"variant="outline"><Mail /> Contact </Button>
        </div>
      </div>

      <div class="text-neutral-400 text-sm text-center">
        {{ podcasterData.subscriptioncount ? podcasterData.subscriptioncount : 0 }} people subscribed
      </div>

      <ul class="flex flex-wrap gap-2">
        <li v-for="link in podcasterData.links" :key="link">
          <a :href="link" target="_blank">
          <Button variant="link"> <Link />{{ link }}
          </Button>
        </a>
        </li>
      </ul>

      <div class="text-neutral-300">
        <strong>About:</strong> {{ podcasterData.about }}
      </div>
    </div>

    <div>
      <h3 class="text-xl font-bold mb-4">Podcasts</h3>
      <ul class="flex flex-col gap-2">
        <li v-for="podcast in podcasterData.podcasts" :key="podcast.id">
          {{ podcast.title }}
        </li>
      </ul>
    </div>
  </div>
</template>