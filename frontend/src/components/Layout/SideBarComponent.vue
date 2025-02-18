<script setup lang="ts">
import { Home, UsersRound, Search, Podcast , Headphones } from "lucide-vue-next"
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
},
{
  title: "Search",
  url: "#",
  icon: Search,
},
  {
    title: "Community",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Podcasters",
    url: "#",
    icon: Podcast,
  },
  {
    title: "Podcasts",
    url: "#",
    icon: Headphones,
  },
]
console.log(Home)
</script>

<template>
    <Sidebar>
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                  <SidebarMenuButton asChild>
                    <RouterLink to={item.url}>
                      <item.icon />
                      <span>{{item.icon}}</span>
                      <span>{{item.title}}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
    </Sidebar>
</template>

