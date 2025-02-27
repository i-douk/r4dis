<script setup lang="ts">
const authStore = useAuthStore()
const { userProfile, podcasterProfile } = storeToRefs(authStore)
import router from '@/router'
import { logout } from '../utils/supaAuth'
import { useWindowSize } from '@vueuse/core'

const emit = defineEmits(['closeSidebar'])
const { width } = useWindowSize()
const isSmallScreen = computed(() => width.value < 1024)
console.log(isSmallScreen)
defineProps({
  isSidebarOpen: Boolean,
})

// Define event emitter to notify parent

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
  },
]
const userActivitylinks = [
  {
    title: '💛 Followings',
    to: `/follows/${userProfile.value?.username}`,
  },
  {
    title: '€ Subscriptions',
    to: `/subs/${userProfile.value?.username}`,
  },
]
const podcasterActivitylinks = [
  {
    title: '📡 My Pods',
    to: `/podcasts/podcasts`,
  },
  {
    title: '📊 Insights',
    to: '/podcasters/insights',
  },
]
const settingLinks = [
  {
    title: '⚙️ My settings',
    to: '/account/settings',
  },
  {
    title: '❓ Help',
    to: '/help',
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
  <div class="w-full flex-nowrap lg:border-r-2 border-dotted">
    <div class="px-3 py-2">
      <div class="text-xl font-semibold p-1 mb-1">Discover</div>
      <div class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in discoverylinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
          @click="closeSidebar"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>

      <div class="my-2 border-b-2 border-dotted" v-if="userProfile || podcasterProfile"></div>

      <div v-if="userProfile || podcasterProfile" class="text-xl font-semibold p-1 m-3">
        My activity
      </div>

      <div v-if="podcasterProfile" class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in podcasterActivitylinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
          @click="closeSidebar"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
        <div class="my-2 border-b-2 border-dotted"></div>
      </div>

      <div v-if="userProfile" class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in userActivitylinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
          @click="closeSidebar"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
        <div class="my-2 border-b-2 border-dotted"></div>
      </div>

      <div v-if="userProfile || podcasterProfile" class="text-xl font-semibold p-1 m-3">
        Settings
      </div>

      <div
        v-if="userProfile || podcasterProfile"
        class="flex flex-col gap-2 md:flex-col md:gap-4 w-full"
      >
        <Button
          v-for="link in settingLinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
          @click="closeSidebar"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>

      <div class="my-2 border-b-2 border-dotted" v-if="userProfile || podcasterProfile"></div>

      <div
        v-if="userProfile || podcasterProfile"
        class="flex flex-col gap-2 md:flex-col md:gap-4 w-full"
      >
        <Button class="justify-start" variant="ghost">
          <a @click.prevent="handleLogout"> ⏻ Log out</a>
        </Button>
      </div>
    </div>
  </div>
</template>
