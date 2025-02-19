<template>
  <TopBar />
  <div class="min-h-screen flex flex-col">
    <div class="grid lg:grid-cols-5 flex-grow">
      <SideBarComponent class="lg:col-span-1" />
      <main class="lg:col-span-4">
        <slot />
        </main>
      </div>
    </div>
  </template>