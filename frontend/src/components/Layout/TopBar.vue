<script setup lang="ts">
import { logout } from '../../utils/supaAuth';

</script>

<template>
     <header>
    <div class="flex justify-between p-5">
      <img alt="Vue logo" src="@/assets/logo.png" width="150" height="150" />
      <nav>
          <div class="flex justify-between gap-4 p-5">
              <RouterLink to="/register">Sign up</RouterLink>
              <RouterLink to="/login">Sign in</RouterLink>
              <RouterLink to="/logout" @click="logout">
                  <Button @click="logout" variant="destructive">logout</Button>
                </RouterLink>
            </div>
        </nav>
    </div>
  </header>
  <RouterView />
</template>