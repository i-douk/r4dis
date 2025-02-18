<script setup lang="ts">
import { Home, UsersRound, Search, Podcast , Headphones } from "lucide-vue-next"
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
},
{
  title: "Search",
  url: "#",
  icon: Search,
},
  {
    title: "Community",
    url: "/community",
    icon: UsersRound,
  },
  {
    title: "Podcasters",
    url: "/podcasters",
    icon: Podcast,
  },
  {
    title: "Podcasts",
    url: "/podcasts",
    icon: Headphones,
  },
]
</script>

<template>
    <Sidebar>
        <SidebarGroupContent>
            <SidebarMenu  class=" mt-20 p-4" >
                <SidebarMenuItem v-for="item in items" :key="item.title">
                  <SidebarMenuButton asChild class="text-xl font-bold">
                    <RouterLink :to='item.url'>
                      <span><item.icon /></span>
                      <span>{{item.title}}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
    </Sidebar>
</template>

