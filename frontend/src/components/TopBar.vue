<script setup lang="ts">
import router from '@/router'
import { logout } from '../utils/supaAuth'

const authStore = useAuthStore()
const handleLogout = async () => {
  await logout(authStore)
  router.push('/login')
}
</script>
<template>
  <header>
    <div flex flex-grow class="flex justify-between p-2 border-dotted border-b-2">
      <RouterLink to="/">
        <img alt="Vue logo" src="@/assets/logo.png" class="w-[175px] h-auto ml-2" />
      </RouterLink>
      <nav>
        <div class="flex justify-between gap-4 p-5">
          <RouterLink
            to="/register"
            v-if="authStore.userProfile == null && authStore.podcasterProfile === null"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >Sign up
          </RouterLink>
          <RouterLink
            to="/login"
            v-if="authStore.userProfile == null && authStore.podcasterProfile === null"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >Sign in</RouterLink
          >
          <Button
            v-if="authStore.podcasterProfile && $route.path !== '/podcasts/createPodcast'"
            class="-my-1"
            variant="outline"
          >
            <RouterLink to="/podcasts/createPodcast"> + Add podcast </RouterLink>
          </Button>
          <RouterLink
            v-if="authStore.userProfile"
            :to="{
              name: '/account/users/[username]',
              params: { username: authStore.userProfile?.username },
            }"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >My account</RouterLink
          >
          <a v-if="authStore.userProfile" href="#" @click.prevent="handleLogout"> Logout </a>
          <RouterLink
            v-if="authStore.podcasterProfile"
            :to="{
              name: '/account/podcasters/[username]',
              params: { username: authStore.podcasterProfile?.username },
            }"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >My account</RouterLink
          >
          <a v-if="authStore.podcasterProfile" href="#" @click.prevent="handleLogout"> Logout </a>
        </div>
      </nav>
    </div>
  </header>
</template>
