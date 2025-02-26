<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
usePageStore().pageData.title = 'Create a podcast'
const formData = ref({
  name: '',
  description: '',
  links: [],
})

const cancelCreate = (e :Event) => {
    e.preventDefault()
    router.push('/')
}
</script>
<template>
  <div class="mt-3 space-y-3">
    <form class="w-full space-y-6" @submit.prevent="">
      <div class="grid gap-2">
        <label for="name" class="text-left">Name</label>
        <Input
          placeholder="What is your podcast called?"
          id="name"
          type="text"
          required
          v-model="formData.name"
        />
      </div>
      <div class="grid gap-2">
        <label for="description" class="text-left">Description</label>
        <textarea
          placeholder="What is your podcast about?"
          class="border rounded-md p-2 w-full bg-gray-700 text-white"
          id="description"
          rows="3"
          v-model="formData.description"
        ></textarea>
      </div>
      <div class="grid gap-2">
        <label for="links" class="text-left">Links</label>
        <Input id="links" required v-model="formData.links" />
      </div>
      <Button type="submit" class="w-full">Save Changes</Button>
    </form>
    <Button @click="cancelCreate" class="w-full">Cancel</Button>
  </div>
</template>
