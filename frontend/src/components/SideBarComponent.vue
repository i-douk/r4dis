<script setup lang="ts">
const links = [
  {
    title: '📋 Feed',
    to: '/',
  },
  {
    title: '🎙️ Podcasters',
    to: '#',
  },
  {
    title: '🎧 Podcasts',
    to: '#',
  },
  {
    title : '👥Community',
    to: '/users'
  }
]
</script>
<template>
  <div class="w-full mt-5">
    <div class="px-3 py-2">
      <div class="flex flex-row gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in links"
          :key="link.to"
          variant="ghost"
          class="text-xl w-full justify-start"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
