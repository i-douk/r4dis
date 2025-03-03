<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/page'
import Footer from '@/components/Footer.vue'
import { useWindowSize } from '@vueuse/core'
import { useSidebar } from '../composables/sidebar';
const { pageData } = storeToRefs(usePageStore())

const { sidebarOpen , toggleSidebar , isSmallScreen} = useSidebar()

</script>
<template>
    <div class="min-h-screen flex flex-col justify-between">
      <!-- TopBar -->
      <div class="flex flex-row border-b-2 border-dotted">
        <button
          class="p-5 mt-2 text-xl cursor-pointer hover:text-gray-400"
          @click="toggleSidebar"
        >
          <iconify-icon
            :icon="sidebarOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
          ></iconify-icon>
        </button>
        <TopBar class="flex-1" />
      </div>

      <!-- Main Layout -->
      <div class="grid lg:grid-cols-7 flex-grow">
        <!-- SideBar -->
        <SideBarComponent
          :isSidebarOpen="sidebarOpen"
          @closeSidebar="sidebarOpen = false"
          :class="[
            'col-span-1 inset-y-0 left-0 w-64 transform lg:transform-none transition-transform ease-in-out duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute',
          ]"
        />

        <!-- Main Content -->
        <main
          :class="[sidebarOpen ? 'lg:col-span-6 p-10 flex-grow' : 'lg:col-span-7 p-10 flex-grow']"
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
</template>
