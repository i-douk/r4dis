<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import expressService from '../../services/expressQueries';
const authStore = useAuthStore();
const { userProfile , user } = storeToRefs(authStore);
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

const formData = ref({
  username: '',
  email: '',
  about: '',
  avatar_url: '',
})

const editMode = ref(false)

const toggleMode = () => {
  editMode.value = !editMode.value
}

const handleSubmit = async () => {
  const { error : supaError } = await supabase.auth.updateUser({
    email: formData.email.value,
  })
  const { error : expressError } = await expressService.editUser(
    user.id , {
      username : formData.username.value,
      avatar_url: formData.avatar_url.value,
      about : formData.about.value
    
  })

  if( expressError || supaError){
    toast({
      title: 'Something went wrong, please try again',
      variant: 'destructive'
    })
  }

  toast({
    title: 'You updated your user Profile',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(formData, null, 2)),
    ),
  })
}

const cancelEditing = () => {
  editMode.value = !editMode.value
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
        <p class="text-left font-bold text-white p-2">About Me</p>
        <p class="text-left font-semi text-white">
          {{ userProfile?.about || 'Tell us about you!' }}
        </p>
        <p class="text-left font-bold text-white p-2">Username</p>
        <p class="text-left font-semi text-white">{{ userProfile.username }}</p>
        <p class="text-left font-bold text-white p-2">Email</p>
        <p class="text-left font-semi text-white">{{ userProfile.email }}</p>
        <Button class="mt-4 w-full" @click="toggleMode">Edit Profile</Button>
      </div>
      <!-- Edit moode on -->
      <div v-else class="mt-3 space-y-3">
        <form class="w-full space-y-6" @submit="handleSubmit">
          <div class="grid gap-2">
            <Label for="avatar_url">Avatar</Label>
            <Input id="avatar_url" type="file" />
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
              :value="userProfile.email"
              id="email"
              type="email"
              required
              v-model="formData.email"
            />
          </div>
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
          <Button type="submit" class="w-full"> Save Edited </Button>
        </form>
        <Button @click="cancelEditing" class="w-full"> Leave without saving </Button>
      </div>
    </div>
  </div>
</template>
