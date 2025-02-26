<script setup lang="ts">
const authStore = useAuthStore()
const { userProfile, podcasterProfile } = storeToRefs(authStore)

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
    to: '/account/podcasts',
  },
  {
    title: '€ Subscriptions',
    to: '/account/podcasters',
  }
]
const podcasterActivitylinks = [
  {
    title: '📊 My dashboard',
    to: '/account/podcasters',
  },
  {
    title: '📡 My Pods',
    to: '/account/podcasters',
  },
]
const settingLinks = [
  {
    title: '⚙️ My settings',
    to: '/settings',
  },
  {
    title: '❓ Help',
    to: '/help',
  },
]
</script>
<template>
  <div class="w-full flex-nowrapmt-5 lg:border-r-2 border-dotted">
    <div class="px-3 py-2">
      <div class="text-xl font-semibold p-1 mb-1 ">Discover</div>
      <div class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in discoverylinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>
      <div class="my-2 border-b-2 border-dotted"></div>
      <div v-if="userProfile && podcasterProfile"  class="text-xl font-semibold p-1 m-3">My activity</div>
          <div v-if='podcasterProfile' class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
            <Button
              v-for="link in podcasterActivitylinks"
              :key="link.to"
              variant="ghost"
              class="w-full justify-start"
            >
              <RouterLink :to="link.to">
                {{ link.title }}
              </RouterLink>
            </Button>
            <div class="my-2 border-b-2 border-dotted"></div>
            </div>
          <div v-if='userProfile' class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
            <Button
              v-for="link in userActivitylinks"
              :key="link.to"
              variant="ghost"
              class="w-full justify-start"
            >
              <RouterLink :to="link.to">
                {{ link.title }}
              </RouterLink>
            </Button>
            <div class="my-2 border-b-2 border-dotted"></div>
      </div>
      <div v-if="userProfile && podcasterProfile"  class="text-xl font-semibold p-1 m-3">Settings</div>
      <div v-if="userProfile && podcasterProfile" class="flex flex-col gap-2 md:flex-col md:gap-4 w-full">
        <Button
          v-for="link in settingLinks"
          :key="link.to"
          variant="ghost"
          class="w-full justify-start"
        >
          <RouterLink :to="link.to">
            {{ link.title }}
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
