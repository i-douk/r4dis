import type { LoginForm } from '@/types/AuthForm'
import { expressClient } from './expressClient'

export default {
  getUsers() {
    return expressClient.get(`/users`)
  },
  userslogin(formData: LoginForm) {
    return expressClient.post('/userlogin', formData)
  }
}