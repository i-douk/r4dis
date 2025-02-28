<script setup lang="ts">
import expressService from '@/services/expressQueries';
const { username } = useRoute('/podcasters/[username]').params;

const fetchPodcaster = async ( username: string) =>{
  return await expressService.getPodcaster(username)
}

expressService
usePageStore().pageData.title = ''
const response = await fetchPodcaster(username)
console.log(response.data)
</script>
<template>
  <div>
    {{ response.data.username }}
  </div>
  <div>
    {{ response.data.podcasts }}
  </div>
  <div>
    {{ response.data.earnings }}
  </div>
  <div>
    {{ response.data.subscribers }}
  </div>
</template>