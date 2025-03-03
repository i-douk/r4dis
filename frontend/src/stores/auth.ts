import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import { podcasterQuery, userQuery } from '@/services/supaQueries'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const userProfile = ref<null | Tables<'users'>>(null)
  const podcasterProfile = ref<null | Tables<'podcasters'>>(null)
  const isTrackingUserAuthChanges = ref(false)
  const isTrackingPodcasterAuthChanges = ref(false)

  //role : podcaster
  const setPodcasterProfile = async () => {
    if (!user.value) {
      podcasterProfile.value = null
      return
    }

    try {
      const { data, error } = await podcasterQuery({
        column: 'id',
        value: user.value.id,
      })

      if (error) {
        console.error('Error fetching podcaster profile:', error)
        podcasterProfile.value = null
      } else {
        podcasterProfile.value = data || null
      }
    } catch (err) {
      console.error('Unexpected error in setPodcasterProfile:', err)
      podcasterProfile.value = null
    }
  }

  // role : user
  const setUserProfile = async () => {
    if (!user.value) {
      userProfile.value = null
      return
    }

    try {
      const { data, error } = await userQuery({
        column: 'id',
        value: user.value.id,
      })

      if (error) {
        console.error('Error fetching user profile:', error)
        userProfile.value = null
      } else {
        userProfile.value = data || null
      }
    } catch (err) {
      console.error('Unexpected error in setUserProfile:', err)
      userProfile.value = null
    }
  }

  const setAuth = async (session: Session | null) => {
    if (!session) {
      user.value = null
      userProfile.value = null
      return
    } else if (session.user.user_metadata.role === 'user'){
      
      user.value = session.user
      await setUserProfile()
    } else if(session.user.user_metadata.role === 'podcaster') {
      
      user.value = session.user
      await setPodcasterProfile()
    }
  }
 
  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
        await setAuth(null)
      } else if (data.session?.user && data.session.user.user_metadata.role ==='user') {
        await setAuth(data.session)
      } else if (data.session?.user && data.session.user.user_metadata.role ==='podcaster') {
        await setAuth(data.session)
      }
    } catch (err) {
      console.error('Unexpected error in getSession:', err)
      await setAuth(null)
    }
  }

  const trackPodcasterAuthChanges = () => {
    if (isTrackingPodcasterAuthChanges.value) return

    isTrackingPodcasterAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }
  const trackUserAuthChanges = () => {
    if (isTrackingUserAuthChanges.value) return

    isTrackingUserAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  const clearSession = () => {
    user.value = null
    userProfile.value = null
    podcasterProfile.value = null
  }
  return {
    user,
    userProfile,
    getSession,
    trackUserAuthChanges,
    trackPodcasterAuthChanges,
    clearSession,
    podcasterProfile,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
