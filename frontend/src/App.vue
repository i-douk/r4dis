
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'

</script>

<template>
  <header>
    <div class="flex justify-center">
      <img alt="Vue logo" src="@/assets/logo.png" width="150" height="125" />
    </div>
    <nav>
        <div class="flex justify-center gap-4 text-xl text-red-900 font-bold underline ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
  
          
      </div>


      </nav>
  </header>
  <Button>Click me</Button>

  <RouterView />
</template>
