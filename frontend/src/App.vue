<script setup lang="ts">
onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>
<template>
  <UserLayout/>
</template>
