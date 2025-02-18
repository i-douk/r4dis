<script setup lang="ts">


</script>

<template>
    <TopBar/>
    <SidebarProvider>
        <SidebarTrigger />
        <SideBarComponent />
    </SidebarProvider>
<main>
    <div class="flex items-center">
            <h1 class="text-lg font-semibold md:text-2xl">
            </h1>
    </div>
    <slot />
</main>
    
</template>