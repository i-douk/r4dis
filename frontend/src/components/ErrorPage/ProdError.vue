<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode: number
  code: string
  statusCode: number
  hint: string | null
  details: string
  isCustomError: boolean
}>()
const error = ref({
  code: 500,
  message: 'Something went wrong',
})

if (props.isCustomError) {
  error.value.code = props.customCode
  error.value.message = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.message = 'Sorry, we couldnt reach this page'
}
</script>
<template>
  <div
    class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
  >
    <div class="flex flex-col items-center gap-4">
      <div>Looks like you've lost your way ...</div>
      <iconify-icon class="text-5xl text-red-400" icon="lucide:traffic-cone"></iconify-icon>
      <div class="text-5xl font-extrabold opacity-30">{{ error.code }}</div>
      <p class="font-bold">{{ error.message }}</p>

      <RouterLink
        class="border-2 border-dotted border-red-400 font-bold rounded-sm p-2 hover:border-dashed"
        to="/"
      >
        Go back home</RouterLink
      >
    </div>
  </div>
</template>
