<script setup lang="ts">
const authStore = useAuthStore()
const { userProfile, podcasterProfile } = storeToRefs(authStore)
import SideBarLinks from './SideBarLinks.vue'
import router from '@/router'
import { logout } from '../utils/supaAuth'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
// Define event emitter to notify parent
const emit = defineEmits(['closeSidebar'])
const { width } = useWindowSize()
const isSmallScreen = computed(() => width.value < 1024)
defineProps({
  isSidebarOpen: Boolean,
})

const discoverylinks = [
  {
    title: ' Feed',
    to: '/',
    icon: 'lucide:book-open-text',
  },
  {
    title: ' Podcasters',
    to: '/podcasters',
    icon: 'lucide:mic',
  },
  {
    title: ' Podcasts',
    to: '/podcasts',
    icon: 'lucide:headphones',
  },
]
const userActivitylinks = [
  {
    title: 'Followings',
    to: '/followings',
    icon: 'lucide:heart-handshake',
  },
  {
    title: 'Subscriptions',
    to: '/subscriptions',
    icon: 'lucide:award',
  },
]
const podcasterActivitylinks = [
  {
    title: 'My Pods',
    to: '/mypods',
    icon: 'lucide:satellite-dish',
  },
  {
    title: 'Insights',
    to: '/podcasters/insights',
    icon: 'lucide:chart-line',
  },
]
const settingLinks = [
  {
    title: 'My settings',
    to: '/account/settings',
    icon: 'lucide:settings',
  },
  {
    title: 'Help',
    to: '/help',
    icon: 'lucide:circle-help',
  },
]

const handleLogout = async () => {
  await logout(authStore)
  router.push('/login')
  emit('closeSidebar')
}

// Close sidebar only for small screen
const closeSidebar = () => {
  if (isSmallScreen.value) {
    emit('closeSidebar')
  }
}
</script>
<template>
  <div :class="['w-full flex-nowrap', isSidebarOpen ? 'lg:border-r-2 border-dotted' : '']">
    <div class="px-3 py-2">
      <div class="text-xl font-semibold p-1 mb-1">Discover</div>
      <SideBarLinks :links="discoverylinks" :closeSidebar="closeSidebar" />
      <div class="my-2 border-b-2 border-dotted" v-show="userProfile || podcasterProfile"></div>

      <div v-show="userProfile || podcasterProfile" class="text-xl font-semibold p-1 m-3">
        My activity
      </div>

      <div v-show="podcasterProfile" class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <SideBarLinks :links="podcasterActivitylinks" :closeSidebar="closeSidebar" />
        <div class="my-2 border-b-2 border-dotted"></div>
      </div>

      <div v-show="userProfile" class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <SideBarLinks :links="userActivitylinks" :closeSidebar="closeSidebar" />

        <div class="my-2 border-b-2 border-dotted"></div>
      </div>

      <div v-show="userProfile || podcasterProfile" class="text-xl font-semibold p-1 m-3">
        Settings
      </div>

      <div
        v-if="userProfile?.id || podcasterProfile?.id"
        class="flex flex-col gap-2 md:flex-col md:gap-4 w-full"
      >
        <SideBarLinks :links="settingLinks" :closeSidebar="closeSidebar" />
      </div>

      <div class="my-2 border-b-2 border-dotted" v-show="userProfile || podcasterProfile"></div>

      <div
        v-if="userProfile || podcasterProfile"
        class="flex flex-col gap-2 md:flex-col md:gap-4 w-full"
      >
        <Button class="justify-start" variant="ghost">
          <iconify-icon icon="lucide:log-out"></iconify-icon>
          <a @click.prevent="handleLogout">Log out</a>
        </Button>
      </div>
    </div>
  </div>
</template>
