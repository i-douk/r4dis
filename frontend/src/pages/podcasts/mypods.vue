<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { usePodcastsStore } from '@/stores/loaders/podcasts'
usePageStore().pageData.title = 'My pods'
const authStore = useAuthStore()
const { podcasterProfile} = storeToRefs(authStore)
const myPodsLoader = usePodcastsStore()
const { podcastsPerPodcaster } = storeToRefs(myPodsLoader)
const { getPodcastsPerPodcaster } = myPodsLoader
const formatTimeAgo = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
  return dayjs(date).fromNow(); 
};

await getPodcastsPerPodcaster(podcasterProfile?.value?.id)
</script>

<template>
  <div class=" p-5 grid grid-cols-4 gap-4">
    <Card class='hover:border-dashed' v-for="podcast in podcastsPerPodcaster">
      <CardHeader>
        <CardTitle>{{ podcast.name }}</CardTitle>
        <CardDescription
          >{{ podcast.followcount }} followers</CardDescription
        >
        <CardDescription
          > Added {{  formatTimeAgo(podcast.created_at) }}</CardDescription
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
