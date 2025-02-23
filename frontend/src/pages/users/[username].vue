<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);

const formData = ref({
  username: '',
  email: '',
  about: '',
})

const editMode = ref(false);

const toggleMode = () => {
  editMode.value = !editMode.value
}


const handleSubmit = (values) => {
  toast({
    title: 'You updated your user Profile',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}

</script>

<template>
  <div class="mx-auto w-full max-w-lg py-10 text-center">
    <div class="flex flex-col items-center pb-6">
      <Avatar class="w-20 h-20">
        <AvatarImage :src="userProfile?.avatar_url || ''" alt="User Avatar" />
        <AvatarFallback>{{ userProfile?.username[0] }}</AvatarFallback>
      </Avatar>
      <p class="mt-2 text-lg font-semibold">{{ userProfile?.username }}</p>
      <p class="mt-1 text-sm text-gray-500">{{ userProfile?.about }}</p>
    </div>

    <div class="w-full rounded-lg bg-gray-900 p-5 shadow-md">
      
      <!-- Edit moode off -->
      <div v-if="editMode == false" class="mt-2 text-white">
        <p class="text-left font-bold text-white">About Me</p>
        <p>{{ userProfile?.about || "Tell us about you!" }}</p>
        <Button class="mt-4 w-full" @click="toggleMode">Edit Profile</Button>
      </div>
      <!-- Edit moode on -->
      <div v-else class="mt-3 space-y-3">
        <form class="w-full space-y-6" @submit="onSubmit">
          <div class="grid gap-2">
            <Label id="about" class="text-left">About</Label>
            <TextArea
              id="about"
              type="about"
              :placeholder="userProfile?.about"
              required
              v-model="formData.email"
            />
          </div>
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              type="text"
              :placeholder="userProfile.username"
              required
              v-model="formData.username"
            />
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              :placeholder="userProfile?.email"
              required
              v-model="formData.abnout"
            />
          </div>
          <Button type="submit" class="w-full"> Save Edited </Button>
          <Button @click="" class="w-full"> Leave without saving </Button>
        </form>
      </div>
    </div>
  </div>
</template>
