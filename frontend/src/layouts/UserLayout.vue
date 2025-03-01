<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/page'
import Footer from '@/components/Footer.vue'
const { pageData } = storeToRefs(usePageStore())
const isSidebarOpen = ref(true)
</script>
<template>
  <div class="relative -inset-px bg-gradient-to-r from-[#050505] via-[#1b1a1a] to-[#050505]">
    <div class="min-h-screen flex flex-col justify-between">
      <!-- TopBar -->
      <div class="flex flex-row border-b-2 border-dotted">
        <button
          class="flex-none p-2 m-2 cursor-pointer text-xl hover:underline"
          @click="isSidebarOpen = !isSidebarOpen"
        >
        <iconify-icon :icon="isSidebarOpen? 'lucide:panel-left-close': 'lucide:panel-left-open'"></iconify-icon>
        </button>
        <TopBar class="flex-1" />
      </div>

      <!-- Main Layout -->
      <div class="grid lg:grid-cols-7 flex-grow">
        <!-- SideBar -->
        <SideBarComponent
          :isSidebarOpen="isSidebarOpen"
          @closeSidebar="isSidebarOpen = false"
          :class="[
            'col-span-1 inset-y-0 left-0 w-64 transform lg:transform-none transition-transform ease-in-out duration-300',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute',
          ]"
        />

        <!-- Main Content -->
        <main
          :class="[isSidebarOpen ? 'lg:col-span-6 p-10 flex-grow' : 'lg:col-span-7 p-10 flex-grow']"
          :key="$route.fullPath"
        >
          <div class="flex items-grow">
            <h1 class="text-lg font-semibold md:text-xl">
              {{ pageData.title }}
            </h1>
          </div>
          <slot />
        </main>
      </div>
      <Footer />
    </div>
  </div>
</template>
