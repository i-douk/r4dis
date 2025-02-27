<script setup lang="ts">
import { usePodcastsStore } from '@/stores/loaders/podcasts'
import expressService from '@/services/expressQueries'
usePageStore().pageData.title = 'Podcasts'
import { useAuthStore } from '@/stores/auth'
import { toast } from '@/components/ui/toast/use-toast'
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const podcastsLoader = usePodcastsStore()
const { podcasts } = storeToRefs(podcastsLoader)
const { getPodcasts } = podcastsLoader

await getPodcasts()

const handleFollow = async (podcastId : number) => {
  const response = await expressService.followPodcast(podcastId,userProfile.value.id);
  if( response.status === 201) {
    toast({
      title : ' You just followed this pod'
    })
  } else if ( response.status === 422) {
     toast({
       title : ' You are already following this pod'
     })

   }
}
console.log(podcasts.value)
</script>

<template>
  <div class=" p-5 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <Card class='hover:border-dashed' v-for="podcast in podcasts">
      <CardHeader>
        <CardTitle>{{ podcast.name }}</CardTitle>
        <CardDescription
          >{{ podcast.followerscount }} followers</CardDescription
        >
      </CardHeader>
      <CardContent>
        was posted by
        <b>{{
          podcast.podcaster.username
        }}</b></CardContent
      >
      <CardFooter class="flex gap-2">
        <Button>
          <RouterLink
            :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >See podcast</RouterLink
          >
        </Button>
        <Button @click='handleFollow(podcast.id)' variant ='outline'>
          ♥ Follow
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
