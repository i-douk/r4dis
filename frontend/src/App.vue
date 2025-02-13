<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="flex justify-center">
      <img alt="Vue logo" src="@/assets/logo.png" width="125" height="125" />
    </div>
    <nav>
        <div class="flex justify-center gap-4 text-xl text-red-900 font-bold underline ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
      </div>
      </nav>
  </header>

  <RouterView />
</template>
