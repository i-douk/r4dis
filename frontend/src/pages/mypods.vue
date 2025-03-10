<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
import { usePodcastsStore } from '@/stores/loaders/podcasts';
import expressService from '@/services/expressQueries';
import { formatTimeAgo } from '@/utils/timeAgo';
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();
usePageStore().pageData.title = 'My pods';
const authStore = useAuthStore();
const { podcasterProfile } = storeToRefs(authStore);
const myPodsLoader = usePodcastsStore();
const { podcastsPerPodcaster : mypods } = storeToRefs(myPodsLoader);
const { getPodcastsPerPodcaster } = myPodsLoader;

if (podcasterProfile.value) {
  await getPodcastsPerPodcaster(podcasterProfile?.value?.id)
};

const handleDeletePodcast = async (id: string) => {
  const response = await expressService.deletePodcast(id);
  if(response.status === 204) {
    toast({ title: 'Podcast deleted' })
    myPodsLoader.podcastsPerPodcaster = myPodsLoader.podcastsPerPodcaster?.filter((podcast: { id: string; }) => podcast.id !== id);
  } else {
    toast({ title: 'Failed to delete podcast', variant: 'destructive' })
  }
};

watch(
  mypods,
  (newMypods) => {
    if (newMypods) {
      mypods.value = newMypods;
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="p-5 grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <Card class="hover:border-dashed" v-for="podcast in mypods" :key="podcast.id" >
      <CardHeader>
        <CardTitle>{{ podcast.name }}</CardTitle>
        <CardDescription>{{ podcast.followcount }} followers</CardDescription>
        <CardDescription> Added {{ formatTimeAgo(podcast.created_at) }}</CardDescription>
      </CardHeader>
      <CardContent> <b></b></CardContent>
      <CardFooter class="flex gap-2 flex-nowrap">
        <Button variant="outline">
          <RouterLink :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >See podcast</RouterLink
          >
        </Button>
        <Button variant="outline">
          <RouterLink :to="{ name: '/podcasts/[slug]', params: { slug: podcast.slug } }"
            >Edit</RouterLink
          >
        </Button>
        <Button variant="outline" @click="handleDeletePodcast(podcast.id)">
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
