
<template>
    <div class="min-h-screen flex flex-col">
        <!-- Top Bar -->
        <TopBar class="w-full h-16 bg-blue-500 text-white flex items-center justify-center">
            <!-- TopBar content -->
        </TopBar>

        <!-- Main Content Area -->
        <div class="flex flex-1">
            <SidebarProvider>
                <SidebarTrigger class='text-red-400 p-10'/>
                <SideBarComponent>
                </SideBarComponent>
            </SidebarProvider>       
        </div>
    </div>
    <main>
        <slot/>
    </main>
</template>