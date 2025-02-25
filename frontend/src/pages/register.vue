<script setup lang="ts">
import { register } from '@/utils/supaAuth'
usePageStore().pageData.title = ''

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const router = useRouter()

const roleDescr = ref({
  role: 'user',
  emoji: '👤',
})

const toggleRole = () => {
  const { emoji, role } = roleDescr.value
  roleDescr.value = {
    emoji: emoji === '👤' ? '🎙️' : '👤',
    role: role === 'user' ? 'podcaster' : 'user',
  }
}

const signup = async () => {
  const isRegistered = await register(formData.value, roleDescr.value.role)
  if (isRegistered) {
    console.log('registration successful')
    router.push('/')
  }
}
</script>

<template>
  <div
    class="mx-auto mt-2 flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]"
  >
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> {{ roleDescr.emoji }} Register </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="signup">
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe19"
              required
              v-model="formData.username"
            />
          </div>
          <div class="flex flex-col sm:flex-row justify-between gap-4"></div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
            />
          </div>

          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.password"
            />
          </div>

          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full"> Register </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink to="/login" class="underline"> Login </RouterLink>
        </div>
        <div  v-if='roleDescr.role==="user"'  class="mt-4 text-sm text-center text-muted-foreground p-y-10">
          Do you wish to register as a podcaster ?
          <div class="mt-5 grid gap-2 ">
            <Button @click="toggleRole">
              🎙️ Switch to podcaster's sign up
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
