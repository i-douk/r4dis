<template>
  <div class="min-h-screen flex flex-col">
    <!-- TopBar -->
    <TopBar />

    <!-- Main Layout -->
    <div class="grid lg:grid-cols-5 flex-grow">
      <!-- SideBar -->
      <SideBarComponent class="lg:col-span-1" />

      <!-- Main Content -->
      <main class="lg:col-span-4 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
