<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col transition-[margin]">
        <TopBar/>
    </div>
    <SidebarProvider>
      <SideBarComponent />
        <SidebarTrigger />
        <slot />
    </SidebarProvider>
    <SideBarComponent/>
    <main>
        <slot />
    </main>
</template>