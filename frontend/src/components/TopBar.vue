<script setup lang="ts">
import router from '@/router';
import { logout } from '../utils/supaAuth';


const handleLogout = async () => {
  await logout();
  authStore.clearSession();
};

const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);
</script>
<template>
     <header>
       <div flex flex-grow class="flex justify-between p-5">
      <RouterLink to="/">
          <img alt="Vue logo" src="@/assets/logo.png" width="175" height="125" />
        </RouterLink>
        <nav>
          <div class="flex justify-between gap-4 p-5">
            <RouterLink to="/register" v-if="!userProfile" activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700">Sign up </RouterLink>
            <RouterLink to="/login" v-if="!userProfile" activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700">Sign in</RouterLink>
            <RouterLink to="/:id/myaccount" v-if="userProfile" activeClass="border-indigo-500"
            exactActiveClass="border-indigo-700">My account</RouterLink>
            <Button @click="handleLogout" v v-if="!userProfile">
              <RouterLink to="/">
                Logout
              </RouterLink></Button>
          </div>
            </nav>
          </div>
        </header>
</template>