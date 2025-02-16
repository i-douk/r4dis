import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js';

export const usersQuery = supabase.from('users').select()

export const singleUserQuery = (email: string) =>
  supabase
    .from('users')
    .select(`
      email,
      role
      `)
    .eq('email', email)
    .single()

export type CountriesWithCities = QueryData<typeof singleUserQuery>;

