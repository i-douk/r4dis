<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'
import { logout } from './utils/supaAuth';
</script>
<template>



  <header>
    <div class="flex justify-center">
      <img alt="Vue logo" src="@/assets/logo.png" width="125" height="125" />
    </div>
    <nav>
        <div class="flex justify-between gap-4 ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/register">Sign up</RouterLink>
          <RouterLink to="/login">Sign in</RouterLink>
          <RouterLink to="/logout" @click="logout">
            <Button @click="logout" variant="destructive">logout</Button>
          </RouterLink>
      </div>
      </nav>
  </header>



  
  <RouterView />
</template>
