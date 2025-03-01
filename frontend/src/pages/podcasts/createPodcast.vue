<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import expressService from '@/services/expressQueries'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { toSlug } from '@/utils/slug.ts'
import { isValidSlug } from '../../utils/slug.ts'
const authStore = useAuthStore()
const { podcasterProfile } = storeToRefs(authStore)
const formData = ref({
  name: '',
  description: '',
  urls: [''],
  slug: '',
})

// Watch the name field and update the slug only if the user hasn't modified it
watch(
  () => formData.value.name,
  (newName, oldName) => {
    if (!formData.value.slug || formData.value.slug === toSlug(oldName)) {
      formData.value.slug = toSlug(newName)
    }
  },
)

const handleSubmit = async () => {
  if (!isValidSlug(formData.value.slug)) {
    toast({
      title: 'make sure your slug does not contain any spaces',
      variant: 'destructive',
    })
  } else {
    if (podcasterProfile.value) {
      const response = await expressService.addPodcast(
        podcasterProfile?.value?.username,
        formData.value,
      )
      if (response.status === 404) {
        toast({ title: 'Podcast creating failed', variant: 'destructive' })
      }
      if (response.status === 201) {
        toast({
          title: `${formData.value.name} was added sucessfully by ${podcasterProfile?.value?.username}`,
          variant: 'destructive',
        })
        router.push('/podcasts/mypods')
      }
    }
  }
}

const addLink = () => {
  formData.value.urls.push('')
}
const removeLink = (index: number) => {
  formData.value.urls.splice(index, 1)
}
const cancelCreate = (e: Event) => {
  e.preventDefault()
  router.push('/')
}

usePageStore().pageData.title = 'Create a podcast'
</script>

<template>
  <div class="mt-3 space-y-3">
    <form class="w-full space-y-6" @submit.prevent="handleSubmit">
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
        <label for="slug" class="text-left">Slug</label>
        <Input
          placeholder="Enter a slug to easily identify your podcast"
          id="slug"
          type="text"
          required
          v-model="formData.slug"
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
        <label for="urls" class="text-left">urls</label>
        <div v-for="(link, index) in formData.urls" :key="index" class="flex space-x-2">
          <Input v-model="formData.urls[index]" type="text" required />
          <Button @click="removeLink(index)">Remove</Button>
        </div>
        <Button @click="addLink">Add Link</Button>
      </div>
      <Button type="submit" class="w-full">Save Changes</Button>
    </form>
    <Button @click="cancelCreate" class="w-full">Cancel</Button>
  </div>
</template>
