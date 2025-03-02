<script setup lang="ts">
import { usePodcastersStore } from '@/stores/loaders/podcasters'
import { useAuthStore } from '@/stores/auth'
usePageStore().pageData.title = 'Podcasters'
import expressService from '@/services/expressQueries'
const authStore = useAuthStore()
const podcastersLoader = usePodcastersStore()
const { podcasters } = storeToRefs(podcastersLoader)
import { toast } from '@/components/ui/toast/use-toast';
const { getPodcasters } = podcastersLoader;
const { userProfile } = storeToRefs(authStore);
await getPodcasters();
import { Award } from 'lucide-vue-next';

const handleSubscribe = async (podcaster, podcasterId: string) => {
  const response = await expressService.subscribeToPodcaster(podcasterId, userProfile.value.id)
  if (response.status === 201) {
    toast({
      title: `You just subscribed to ${podcaster}`,
    })
  } else {
    toast({
      title: `You are already subscribed to ${podcaster}`,
    })
  }
}
</script>

<template>
  <div class="p-5 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <Card class="hover:border-dashed" v-for="podcaster in podcasters">
      <CardHeader>
        <CardTitle>{{ podcaster.username }}</CardTitle>
        <CardDescription
          >{{
            podcaster.subscriberscount ? podcaster.subscriberscount : 0
          }}
          subscriptions</CardDescription
        >
      </CardHeader>
      <CardContent>
        has posted
        <b>{{
          podcaster.podcasts && podcaster.podcasts.length > 0
            ? podcaster.podcasts[0].name
            : 'nothing yet'
        }}</b></CardContent
      >
      <CardFooter>
        <div class="flex gap-2 flex-wrap">
          <Button>
            <RouterLink
              :to="{ name: '/podcasters/[username]', params: { username: podcaster.username } }"
              >See podcaster</RouterLink
            >
          </Button>
          <Button @click="handleSubscribe(podcaster.username, podcaster.id)" variant="outline">
            <Award />
            Subscribe
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
