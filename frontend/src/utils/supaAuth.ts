import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

export const register = async (formData: RegisterForm) => {

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  if (error) return { error };
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