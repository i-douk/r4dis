<script setup lang="ts">
import { defineProps } from 'vue'
interface LinkProp {
  title: string
  to: string
  icon: string
}
defineProps<{
  links: LinkProp[]
  closeSidebar: any
}>()
</script>
<template>
  <div class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
    <Button
      v-for="link in links"
      :key="link.to"
      variant="ghost"
      class="w-full justify-start"
      @click="closeSidebar"
    >
      <iconify-icon 
      :icon="link.icon"></iconify-icon>
      <RouterLink
      activeClass="font-bold text-green-200"
      :to="link.to">
        {{ link.title }}
      </RouterLink>
    </Button>
  </div>
</template>
