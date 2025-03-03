<script setup lang="ts">
import { usePodcastsStore } from '@/stores/loaders/podcasts';
import expressService from '@/services/expressQueries';
usePageStore().pageData.title = 'Podcasts';
import { useAuthStore } from '@/stores/auth';
import { toast } from '@/components/ui/toast/use-toast';
const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);
const podcastsLoader = usePodcastsStore();
const { podcasts } = storeToRefs(podcastsLoader);
const { getPodcasts } = podcastsLoader;
import { HeartHandshake , X } from 'lucide-vue-next';
await getPodcasts()

// Reactive object to track subscription state
const isFollowing = reactive<Record<string, boolean>>({})

// Initialize subscription state
const setFollowing = (followers) => {
  return followers.some(follower => follower.id === userProfile.value?.id)
}

onMounted(() => {
  podcasts.value.forEach(podcast => {
    isFollowing[podcast.id] = setFollowing(podcast.followers)
  })
})

// Handlers
const handleFollow = async (podcast) => {
  const response = await expressService.followPodcast(podcast.id, userProfile.value.id)

  if (response.status === 201) {
    toast({ title: `You have just followed ${podcast.name}` })
    isFollowing[podcast.id] = true
  }
}

const handleUnfollow = async (podcast) => {
  const follower = podcast.followers.find(follower => follower.id === userProfile.value.id)

  if (!follower) {
    console.error('User is not following this podcast')
    return
  }

  const response = await expressService.unfollowPocast(follower.following.id)

  if (response.status === 204) {
    toast({ title: `You just unfollowed ${podcast.name}` })
    isFollowing[podcast.id] = false
  }
}
</script>

<template>
  <div class="p-5 grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <Card class="hover:border-dashed" v-for="podcast in podcasts" :key="podcast.id">
      <CardHeader>
        <CardTitle>{{ podcast.name }}</CardTitle>
        <CardDescription>{{ podcast.followerscount }} followers</CardDescription>
      </CardHeader>
      <CardContent>
        was posted by
        <b>{{ podcast.podcaster.username }}</b></CardContent
      >
      <CardFooter class="flex justify-center gap-2 flex-wrap">
        <Button variant="outline">
          <RouterLink :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >See podcast</RouterLink
          >
        </Button>
        <Button v-if="!isFollowing[podcast.id]" @click="handleFollow(podcast)" variant="outline">
            <HeartHandshake />
            Follow
          </Button>
          <Button v-if="isFollowing[podcast.id]" @click="handleUnfollow(podcast)" variant="outline">
            <X />
            Unfollow
          </Button>
      </CardFooter>
    </Card>
  </div>
</template>
