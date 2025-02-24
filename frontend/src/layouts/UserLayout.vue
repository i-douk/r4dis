<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/page'

const { pageData } = storeToRefs(usePageStore())
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <!-- TopBar -->
    <TopBar />

    <!-- Main Layout -->
    <div class="grid lg:grid-cols-5 flex-grow">
      <!-- SideBar -->
      <SideBarComponent class="lg:col-span-1" />

      <!-- Main Content -->
      <main class="lg:col-span-4 p-4">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">
            {{ pageData.title }}
          </h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
