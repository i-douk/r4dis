<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);

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
      <p class="text-left font-bold text-white">About Me</p>

      <div v-if="editMode == false" class="mt-2 text-white">
        <p>{{ userProfile?.about || "Tell us about you!" }}</p>
        <Button class="mt-4 w-full" @click="toggleMode">Edit Profile</Button>
      </div>

      <div v-else class="mt-3 space-y-3">
        <form class="w-full space-y-6" @submit.prevent="handleSubmit">
          <FormField v-slot="{ componentField }" name="about">
  <FormItem>
    <FormLabel>About</FormLabel>
    <FormControl>
      <Textarea
        placeholder="Tell us a little bit about yourself, make it short and catchy"
        class="resize-none"
        v-bind="componentField"
      />
    </FormControl>
    <FormDescription>
      You can <span>@mention</span> other users and organizations.
    </FormDescription>
    <FormMessage />
  </FormItem>
</FormField>
  </form>
      </div>
    </div>
  </div>
</template>
