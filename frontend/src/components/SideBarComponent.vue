<script setup lang="ts">
import { cn } from '@/lib/utils'
const links = [
  {
    title: 'Home',
    to: '/'
  },
  {
    title: 'Podcasters',
    to: '/:d/podcasters',
  },
  {
    title: 'Podcasts',
    to: '/:d/podcasts',
  },
  {
    title: 'Community',
    to: '/community',
  },
]
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
      <div class="px-3 py-2">
        <h2 class="border-1 border-amber-100  mb-2 px-4 text-lg font-semibold tracking-tight">
          Access
        </h2>
        <div class="space-y-1">
          <Button v-for="link in links" variant="outline" class="w-full justify-start">
            <RouterLink :to="link.to">
              {{ link.title }}
            </RouterLink>
          </Button>
        </div>
      </div>
  </div>
</template>