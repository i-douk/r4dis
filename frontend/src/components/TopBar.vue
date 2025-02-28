<script setup lang="ts">
import router from '@/router'
import { logout } from '../utils/supaAuth'
import { getPublicUrl } from '@/services/supaQueries'

const authStore = useAuthStore()
const handleLogout = async () => {
  await logout(authStore)
  router.push('/login')
}
</script>
<template>
  <header>
    <div class="flex flex-grow justify-between sm:p-2 p-0">
      <RouterLink to="/">
        <img
          alt="r4dis logo"
          src="@/assets/logo.png"
          class="hidden sm:block w-[150px] h-auto justify-center mt-2"
        />
        <img
          alt="r4dis logo"
          src="@/assets/wordmark-logo.png"
          class="sm:hidden -ml-2 w-[60px] h-auto mt-4"
        />
      </RouterLink>
      <nav>
        <div class="flex justify-between gap-4 p-5">
          <RouterLink
            to="/register"
            v-if="authStore.userProfile == null && authStore.podcasterProfile === null"
            >Sign up
          </RouterLink>
          <RouterLink
            to="/login"
            v-if="authStore.userProfile == null && authStore.podcasterProfile === null"
            >Sign in</RouterLink
          >
          <div class="sm:mt-2 lg:-mt-1 md:-mt-1">
            <Button v-if="authStore.podcasterProfile && $route.path !== '/podcasts/createPodcast'">
              <RouterLink to="/podcasts/createPodcast"> + Add podcast </RouterLink>
            </Button>
          </div>
          <RouterLink
            v-if="authStore.userProfile"
            :to="{
              name: '/account/users/[username]',
              params: { username: authStore.userProfile?.username },
            }"
            >My account</RouterLink
          >
          <a v-if="authStore.userProfile" href="#" @click.prevent="handleLogout"> Logout </a>
          <RouterLink
            v-if="authStore.podcasterProfile"
            :to="{
              name: '/account/podcasters/[username]',
              params: { username: authStore.podcasterProfile?.username },
            }"
            class="hidden sm:block"
            >My account</RouterLink
          >
          <RouterLink
            v-if="authStore.podcasterProfile"
            :to="{
              name: '/account/podcasters/[username]',
              params: { username: authStore.podcasterProfile?.username },
            }"
            class="sm:hidden"
          >
            <Avatar class="w-10 h-10 border border-dotted">
              <AvatarImage
                :src="getPublicUrl(authStore.podcasterProfile?.avatar_url) || ''"
                alt="User Avatar"
              />
              <AvatarFallback class="text-xl">{{
                authStore.podcasterProfile?.username?.[0] || '?'
              }}</AvatarFallback>
            </Avatar>
          </RouterLink>
          <a
            class="hidden sm:block"
            v-if="authStore.podcasterProfile"
            href="#"
            @click.prevent="handleLogout"
          >
            ⏻ Logout
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>
