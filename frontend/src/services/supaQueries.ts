import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const usersQuery = supabase.from('users').select()

export type Users = QueryData<typeof usersQuery>

export const singleUserQuery = (username: string) =>
  supabase
    .from('users')
    .select(
      `
      email,
      id,
      username,
      avatar_url,
      
      `,
    )
    .eq('username', username)
    .single()

export type SingleUser = QueryData<typeof singleUserQuery>

export const userQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('users').select().eq(column, value).single()
}
export const podcasterQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('podcasters').select().eq(column, value).single()
}

export const getPublicUrl = (fileLocalPath: string) => {
  const { data } = supabase.storage.from('avatar_images').getPublicUrl(fileLocalPath)
  return data.publicUrl
}
