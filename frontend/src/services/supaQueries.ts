import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// User store queries
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

// Podcaster store Queries
export const podcastersQuery = supabase.from('podcasters').select()

export type Podcasters = QueryData<typeof podcastersQuery>

export const singlePodcasterQuery = (username: string) =>
  supabase
    .from('podcasters')
    .select(
      `
        email
        id,
        username,
        avatar_url,
        `,
    )
    .eq('username', username)
    .single()

export type SinglePodcaster = QueryData<typeof singlePodcasterQuery>

// User and Podcaster Queries for Authentification
export const userQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('users').select().eq(column, value).single()
}

export const podcasterQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('podcasters').select().eq(column, value).single()
}

//  Fetch Public URL for public profile from supabase s3 storage
export const getPublicUrl = (fileLocalPath: string) => {
  const { data } = supabase.storage.from('avatar_images').getPublicUrl(fileLocalPath)
  return data.publicUrl
}
