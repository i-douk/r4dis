import { supabase } from '@/lib/supabaseClient';
import type { LoginForm } from '@/types/AuthForm';
import axios from 'axios'

export const expressClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const expressServerAuth = async () => {
 
}
