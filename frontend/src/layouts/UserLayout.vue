<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/page'
import Footer from '@/components/Footer.vue'
const { pageData } = storeToRefs(usePageStore())
const isSidebarOpen = ref(false)
</script>
<template>
  <div class="min-h-screen flex flex-col justify-between">
    <!-- TopBar -->
    <div class="flex flex-row border-b-2 border-dotted">
      <button
        class="flex-none p-2 m-2 text-xl hover:underline"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        ၊၊||၊
      </button>
      <TopBar class="flex-1" />
    </div>

    <!-- Main Layout -->
    <div class="grid lg:grid-cols-6 flex-grow">
      <!-- SideBar -->
      <SideBarComponent
        :class="[
          'col-span-1 inset-y-0 left-0 w-64 transform lg:transform-none transition-transform ease-in-out duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
      />

      <!-- Main Content -->
      <main class="lg:col-span-4 p-4 flex-grow">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-xl">
            {{ pageData.title }}
          </h1>
        </div>
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
