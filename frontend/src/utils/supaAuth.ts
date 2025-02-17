import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import hashPassword from './hash';
import axios from 'axios';
import { createActiveSession } from '@/services/expressClient';
export const register = async (formData: RegisterForm) => {

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) return { error };

    if (data.user) {
      const { error } = await supabase.from('users').insert({
        username: formData.username,
        email: formData.email,
        password: await hashPassword(formData.password),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) return { error }; 
  }
  return true
}

export const login = async (formData: LoginForm) => {
  const { data ,error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })
  await createActiveSession(data)
  return { error }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.log(error)

  return true
}
