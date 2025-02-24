<script setup lang="ts">
import router from '@/router'
import { logout } from '../utils/supaAuth'

const authStore = useAuthStore()
const { userProfile } = storeToRefs(useAuthStore())

const handleLogout = async () => {
  await logout(authStore) // Pass the store as an argument
  router.push('/login')
}
console.log(userProfile)
</script>
<template>
  <header>
    <div flex flex-grow class="flex justify-between p-2 border border-amber-800 border-dotted border-b-1">
      <RouterLink to="/">
        <img alt="Vue logo" src="@/assets/logo.png" width="175" height="125" />
      </RouterLink>
      <nav>
        <div class="flex justify-between gap-4 p-5">
          <RouterLink
            to="/register"
            v-if="authStore.userProfile == null"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >Sign up
          </RouterLink>
          <RouterLink
            to="/login"
            v-if="authStore.userProfile == null"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >Sign in</RouterLink
          >
          <RouterLink
            v-if="authStore.userProfile"
            :to="{
              name: '/users/[username]',
              params: { username: authStore.userProfile?.username },
            }"
            activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700"
            >My account</RouterLink
          >
          <a
            v-if="authStore.userProfile"
            href="#"
            @click.prevent="handleLogout"
            class="border-indigo-500"
          >
            Logout
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>
