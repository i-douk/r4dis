import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const usersQuery = supabase.from('users').select()

export type UserProfiles = QueryData<typeof allUsersQuery>

export const singleUserQuery = (email: string) =>
  supabase
    .from('users')
    .select(
      `
      email,
      id,
      avatar_url,
      podcasts {
      }
      `,
    )
    .eq('email', email)
    .single()

export type UserProfile = QueryData<typeof singleUserQuery>

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
