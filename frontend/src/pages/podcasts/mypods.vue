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
  <div class=" p-5 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
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
        <b></b></CardContent
      >
      <CardFooter class='flex gap-2 flex-wrap'>
        <Button>
          <RouterLink
            :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >See podcast</RouterLink
          >
        </Button>
        <Button>
          <RouterLink
            :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >Edit</RouterLink
          >
        </Button>
        <Button variant='destructive'>
          <RouterLink
            :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >🗑️</RouterLink
          >
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
