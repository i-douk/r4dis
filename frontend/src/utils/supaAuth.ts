import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import hashPassword from './hash';

export const register = async (formData: RegisterForm) => {

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  console.log(error)
  console.log(data)
  if (error) return { error };
  if (data.user) {
      const { error : insertError } = await supabase.from('users').insert({
        username: formData.username,
        email: formData.email,
        password: await hashPassword(formData.password),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      if (insertError) return { insertError }; 
  }
  return true
}

export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })
  return { error }
}

export const logout = async (authStore: { clearSession: () => void; }) => {
  try {
    authStore.clearSession();
    await supabase.auth.signOut();
    console.log('signed out')
  } catch (error) {
    console.error('Logout failed:', error);
  }
};