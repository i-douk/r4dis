<script setup lang="ts">
const discoverylinks = [
  {
    title: '📋 Feed',
    to: '/',
  },
  {
    title: '🎙️ Podcasters',
    to: '/podcasters',
  },
  {
    title: '🎧 Podcasts',
    to: '/podcasts',
  },
  {
    title: '👥 Community',
    to: '/users',
  }
]
const activitylinks = [
  {
    title: '➜ My podcasts',
    to: '/account/podcasts'
  },
  {
    title: '➜ My podcasters',
    to: '/account/podcasters'
  },

]
const settingLinks = [
  {
    title: '⚙️ My settings',
    to: '/account/settings'
  },
  {
    title: '❓ Help',
    to: '/account/help'
  },
]
</script>
<template>
  <div class="w-full mt-5 border-r-2 border-dotted">
    <div class="px-3 py-2 ">
      <div class="text-xl font-semibold p-1 mb-1 " > Discover</div>
        <div class="flex flex-row gap-2 md:flex-col md:gap-4 w-full">
          <Button
            v-for="link in discoverylinks"
            :key="link.to"
            variant="ghost"
            class=" w-full justify-start"
          >
            <RouterLink :to="link.to">
              {{ link.title }}
            </RouterLink>
          </Button>
        </div>
      <div class="my-2 border-b-2 border-dotted"></div>
      <div class="text-xl font-semibold p-1 m-3"> My activity </div>
      <div class="flex flex-row gap-2 md:flex-col md:gap-4 w-full">
        <Button
        v-for="link in activitylinks"
        :key="link.to"
        variant="ghost"
        class=" w-full justify-start"
        >
        <RouterLink :to="link.to">
          {{ link.title }}
        </RouterLink>
      </Button>
      <div class="my-2 border-b-2 border-dotted"></div>
    </div>
    <div class="text-xl font-semibold p-1 m-3"> Settings </div>
    <div class="flex flex-row gap-2 md:flex-col md:gap-4 w-full">
      <Button
      v-for="link in settingLinks"
            :key="link.to"
            variant="ghost"
            class=" w-full justify-start"
          >
            <RouterLink :to="link.to">
              {{ link.title }}
            </RouterLink>
          </Button>
        </div>
    </div>
  </div>
</template>
