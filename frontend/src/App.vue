<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="flex justify-center">
      <img alt="Vue logo" src="@/assets/logo.png" width="125" height="125" />
    </div>
  </header>

  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/register">Go to Signup</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>
