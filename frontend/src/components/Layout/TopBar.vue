<script setup lang="ts">
import { logout } from '../../utils/supaAuth';

</script>

<template>
     <header>
       <div class="flex justify-between p-5">
      <RouterLink to="/">
          <img alt="Vue logo" src="@/assets/logo.png" width="175" height="125" />
        </RouterLink>
        <nav>
          <div class="flex justify-between gap-4 p-5">
              <RouterLink to="/register">Sign up</RouterLink>
              <RouterLink to="/login">Sign in</RouterLink>
              <Button @click="logout" variant="destructive">logout</Button>
              </div>
            </nav>
          </div>
  </header>
  <RouterView />
</template>