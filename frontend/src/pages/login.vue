<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login } from '@/utils/supaAuth'
import { useToast } from '@/components/ui/toast/use-toast'
import { supabase } from '@/lib/supabaseClient'
const { toast } = useToast()
const authStore = useAuthStore()
const router = useRouter()
const formData = ref({
  email: '',
  password: ''
})
const isLoading = ref(false)

const signin = async () => {
  try {
    isLoading.value = true
    if (!formData.value.email || !formData.value.password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      })
      return
    }

      const { error } = await login(formData.value)

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message || 'Failed to login',
          variant: 'destructive'
        })}
        else {
          toast({
          title: 'Success',
          description: 'Logged in successfully'
          })
            router.push('/');
        }

  } finally {
    isLoading.value = false
  }

//   const session = await supabase.auth.getSession()
//   console.log(session)
// if (!session.data.session) {
//   // Handle unauthenticated state
//   throw new Error('User not authenticated')
// }
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
            />
          </div>

          <div class="grid gap-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <RouterLink
                to="/forgot-password"
                class="text-xs text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </RouterLink>
            </div>
            <Input id="password" type="password" required v-model="formData.password" />
          </div>

          <Button type="submit" :disabled="isLoading">
            <template v-if="isLoading"> Logging in... </template>
            <template v-else> Login </template>
          </Button>
        </form>

        <div class="mt-4 text-sm text-center text-muted-foreground">
          Don't have an account?
          <RouterLink to="/register" class="text-primary hover:underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
