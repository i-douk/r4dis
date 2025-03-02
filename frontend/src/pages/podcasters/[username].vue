<script setup lang="ts">
import expressService from '@/services/expressQueries'
const { username } = useRoute('/podcasters/[username]').params
usePageStore().pageData.title = username + "\'s is rad"
import { getPublicUrl } from '@/services/supaQueries'
const fetchPodcaster = async (username: string) => {
  return await expressService.getPodcaster(username)
}

const response = await fetchPodcaster(username)
console.log(response.data)
const podcasterData = response.data
console.log(podcasterData)
</script>
<template>
  <div class="flex flex-col mt-5 gap-5">
    <RouterLink
      to="/podcasters"
      class="text-center w-23 font-semibold bg-neutral-800 rounded-sm border border-dotted p-1 hover:border-dashed hover:bg-transparent"
    >
      Goback
    </RouterLink>
    <div class="flex flex-col justify-between border border-dashed rounded-sm p-8">
      <div class="flex justify-start gap-5 flex-wrap">
        <Avatar class="w-30 h-30 border border-neutral-800 border-dashed">
          <AvatarImage :src="getPublicUrl(podcasterData.avatar_url) || ''" alt="Podcaster Avatar" />
          <AvatarFallback class="text-4xl">{{
            podcasterData?.username?.[0] || '?'
          }}</AvatarFallback>
        </Avatar>
        <div class="text-xl font-bold mt-10">
          {{ podcasterData.username }}
        </div>
        <div class="flex justify-end flex-grow gap-2 flex-wrap">
          <Button class="mt-8 font-semibold"> Subscribe </Button>
          <Button class="mt-8 font-semibold"> Contact </Button>
        </div>
      </div>
      <div class="text-neutral-400 text-sm text-center">
        {{ podcasterData.subscriptioncount ? podcasterData.subscriptioncount : 0 }} people
        subscribed
      </div>
      <div class="flex flex-col gap-2"></div>
      <ul class="flex flex-wrap">
        <li v-for="link in podcasterData.links" :key="link">
          <Button variant="outline"> 🔗 {{ link }}</Button>
        </li>
      </ul>
      <div>about: {{ podcasterData.about }}</div>
    </div>
    <div>
      <h3>Podcasts</h3>
      <ul>
        <li v-for="podcast in podcasterData.podcasts" :key="podcast.id">
          {{ podcast.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
