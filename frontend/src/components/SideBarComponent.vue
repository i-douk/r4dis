<script setup lang="ts">
import { cn } from '@/lib/utils'
const links = [
  {
    title: 'Feed',
    to: '/',
  },
  {
    title: 'Podcasters',
    to: '#',
  },
  {
    title: 'Podcasts',
    to: '#',
  }
]
</script>
<template>
  <div class="w-full">
    <div class="px-3 py-2">
      <div class="flex flex-row gap-2 md:flex-col md:gap-4 w-full">
        <Button 
          v-for="link in links" 
          :key="link.to" 
          variant="ghost" 
          class="w-full justify-start"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>

