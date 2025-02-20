import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js';

export const allUsersQuery = supabase.from('users').select()

export const singleUserQuery = (email: string) =>
  supabase
    .from('users')
    .select(`
      email,
      id,
      avatar_url,
      podcasts {
      }
      `)
    .eq('email', email)
    .single()

export type UserProfile = QueryData<typeof singleUserQuery>;

export const userQuery = ({
  column,
  value
}: {
  column: string
  value: string
}) => {
  return supabase.from('users').select().eq(column, value).single()
}

