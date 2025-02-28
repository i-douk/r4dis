<script setup lang="ts">
const { username } = useRoute('/podcasters/[username]').params;

</script>
<template>
    @{{ $route.path}}

    <div>
        <div class="mx-auto w-full max-w-lg py-10 text-center">
    <div class="flex flex-col items-center pb-6">
      <Avatar class="w-32 h-32 border bg-gray-500">
        <AvatarImage
          :src="getPublicUrl(podcasterProfile.avatar_url) || ''"
          alt="Podcaster Avatar"
        />
        <AvatarFallback class="text-4xl">{{
          podcasterProfile?.username?.[0] || '?'
        }}</AvatarFallback>
      </Avatar>
      <p class="mt-2 text-lg font-semibold">{{ podcasterProfile.username }}</p>
      <p class="mt-1 text-sm text-gray-500">{{ podcasterProfile.about }}</p>
    </div>

    <div class="w-full rounded-lg bg-zinc-800 border border-dashed p-5 shadow-md">
      <div v-if="!editMode" class="mt-2 text-white">
        <p class="text-left font-bold text-white p-2">About Me</p>
        <p class="text-left font-semi text-white">
          {{ podcasterProfile.about || 'Tell us about you...' }}
        </p>
        <p class="text-left font-bold text-white p-2">Username</p>
        <p class="text-left font-semi text-white p-1">{{ podcasterProfile.username }}</p>
        <p class="text-left font-bold text-white p-2">Email</p>
        <p class="text-left font-semi text-white p-1">{{ podcasterProfile.email }}</p>
        <Button class="mt-4 w-full" @click="toggleEditMode">Edit Profile</Button>
        <!-- <Dialog>
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
  </Dialog> -->
      </div>
   </div>
  </div>
    </div>
</template>