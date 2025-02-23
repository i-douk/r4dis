<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/toast/use-toast'
import { supabase } from '@/lib/supabaseClient'
import expressService from '../../services/expressQueries'
import { ref, watch, computed, h } from 'vue'
import { getPublicUrl, userQuery } from '@/services/supaQueries'
import router from '@/router'
const { toast } = useToast()
const authStore = useAuthStore()
const { userProfile, user } = storeToRefs(authStore)

const editMode = ref(false)
const formData = ref({
  username: '',
  email: '',
  about: '',
  avatar_url: '',
})

// Watch `userProfile` changes and set form fields initially
watch(
  userProfile,
  (newProfile) => {
    if (newProfile) {
      formData.value = {
        username: newProfile.username || '',
        email: newProfile.email || '',
        about: newProfile.about || '',
        avatar_url: newProfile.avatar_url || '',
      }
    }
  },
  { immediate: true },
)

// Compute if the form has changed
const isFormChanged = computed(() => {
  return (
    formData.value.username !== userProfile.value?.username ||
    formData.value.email !== userProfile.value?.email ||
    formData.value.about !== userProfile.value?.about ||
    formData.value.avatar_url !== userProfile.value?.avatar_url
  )
})

//enter edit mode
const toggleEditMode = () => {
  editMode.value = !editMode.value
}

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  try {
    // Upload the file with upsert enabled
    const { data: storageData, error: storageError } = await supabase.storage
      .from('avatar_images')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (storageError) {
      console.log(storageError);
      toast({ title: 'Avatar upload failed', variant: 'destructive' });
    } else {
      console.log('Avatar uploaded successfully:', storageData);
      formData.value.avatar_url = storageData.path;
    }
  } catch (error) {
    console.error('Upload failed:', error);
    toast({ title: 'Avatar upload failed', variant: 'destructive' });
  }
};

const handleSubmit = async () => {
  if (!isFormChanged.value) {
    editMode.value = false
    return
  }

  console.log('Editing in progress...')

  const updates: any = {}

  if (formData.value.username !== userProfile.value?.username) {
    updates.username = formData.value.username
  }
  if (formData.value.email !== userProfile.value?.email) {
    const { error: supaError } = await supabase.auth.updateUser({ email: formData.value.email })
    if (supaError) {
      console.error('Supabase error:', supaError)
      toast({ title: 'Failed to update email', variant: 'destructive' })
      return
    }
    updates.email = formData.value.email
  }
  if (formData.value.about !== userProfile.value?.about) {
    updates.about = formData.value.about
  }
  if (formData.value.avatar_url !== userProfile.value?.avatar_url) {
    updates.avatar_url = formData.value.avatar_url
  }

  if (Object.keys(updates).length > 0) {
    const response = await expressService.editUser(user.value.id, updates)
    if (response.status === 422) {
      toast({ title: 'Something went wrong, please try again', variant: 'destructive' })
      return
    }

    const { data } = await userQuery({
      column: 'id',
      value: user.value.id,
    })

    userProfile.value = { ...data }
    toast({ title: 'Profile updated successfully' })
  }

  editMode.value = false
}

const cancelEditing = () => {
  // Reset form data to original values
  formData.value = {
    username: userProfile.value?.username || '',
    email: userProfile.value?.email || '',
    about: userProfile.value?.about || '',
    avatar_url: userProfile.value?.avatar_url || '',
  }
  editMode.value = false
}

const deleteUser = async () => {
   const response = await expressService.deleteUser(user.value.id)
   if(response.status === 204) {
     toast({ title : 'We are sad to see you go, come back around any time'});
     router.push('/login')
    } else {
      toast({ title : 'We couldn\'t delete your account , try again'});
      router.push('/')
   }
  }
</script>

<template>
  <div class="mx-auto w-full max-w-lg py-10 text-center">
    <div class="flex flex-col items-center pb-6">
      <Avatar class="w-32 h-32">
        <AvatarImage :src="getPublicUrl(userProfile?.avatar_url) || ''" alt="User Avatar" />
        <AvatarFallback class="text-4xl">{{ userProfile?.username?.[0] || '?' }}</AvatarFallback>
      </Avatar>
      <p class="mt-2 text-lg font-semibold">{{ userProfile?.username }}</p>
      <p class="mt-1 text-sm text-gray-500">{{ userProfile?.about }}</p>
    </div>

    <div class="w-full rounded-lg bg-gray-800 p-5 shadow-md">
      <div v-if="!editMode" class="mt-2 text-white">
        <p class="text-left font-bold text-white p-2">About Me</p>
        <p class="text-left font-semi text-white">
          {{ userProfile?.about || 'Tell us about you...' }}
        </p>
        <p class="text-left font-bold text-white p-2">Username</p>
        <p class="text-left font-semi text-white p-1">{{ userProfile?.username }}</p>
        <p class="text-left font-bold text-white p-2">Email</p>
        <p class="text-left font-semi text-white p-1">{{ userProfile?.email }}</p>
        <Button class="mt-4 w-full" @click="toggleEditMode">Edit Profile</Button>
        <Dialog>
    <DialogTrigger as-child>
      <Button class="mt-4 w-full"  variant="destructive">
        Delete my account
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete my account</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete your public account? This action is irreversible.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button @click="deleteUser" variant="destructive" size="sm" class="px-3"> Permenantly delete</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
      </div>

      <div v-else class="mt-3 space-y-3">
        <form class="w-full space-y-6" @submit.prevent="handleSubmit">
          <div class="grid gap-2">
            <label for="avatar_url" class="text-left">Avatar</label>
            <Input id="avatar_url" type="file" @change="handleFileUpload" />
          </div>
          <div class="grid gap-2">
            <label for="username" class="text-left">Username</label>
            <Input id="username" type="text" required v-model="formData.username" />
          </div>
          <div class="grid gap-2">
            <label for="email" class="text-left">Email</label>
            <Input id="email" type="email" disabled required v-model="formData.email" />
          </div>
          <div class="grid gap-2">
            <label for="about" class="text-left">About</label>
            <textarea
              class="border rounded-md p-2 w-full bg-gray-700 text-white"
              id="about"
              rows="3"
          
              v-model="formData.about"
            ></textarea>
          </div>
          <Button type="submit" class="w-full">Save Changes</Button>
        </form>
        <Button @click="cancelEditing" class="w-full">Cancel</Button>
      </div>
    </div>
  </div>
</template>
