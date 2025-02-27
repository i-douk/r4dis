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
  const isTrackingAuthChanges = ref(false)

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

  const setUSerAuth = async (session: Session | null) => {
    if (!session) {
      user.value = null
      userProfile.value = null
      return
    }
    user.value = session.user
    await setUserProfile()
  }
  const setPodcasterAuth = async (session: Session | null) => {
    if (!session) {
      user.value = null
      podcasterProfile.value = null
      return
    }
    user.value = session.user
    await setPodcasterProfile()
  }

  const getUserSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
        await setUSerAuth(null)
      } else if (data.session?.user) {
        await setUSerAuth(data.session)
      }
    } catch (err) {
      console.error('Unexpected error in getSession:', err)
      await setUSerAuth(null)
    }
  }
  const getPodcasterSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
        await setPodcasterAuth(null)
      } else if (data.session?.user) {
        await setPodcasterAuth(data.session)
      }
    } catch (err) {
      console.error('Unexpected error in getSession:', err)
      await setPodcasterAuth(null)
    }
  }

  const trackPodcasterAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setPodcasterAuth(session)
      }, 0)
    })
  }
  const trackUserAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setUSerAuth(session)
      }, 0)
    })
  }

  const clearSession = () => {
    console.log('Clearing session...') // Debugging
    user.value = null
    userProfile.value = null
    console.log('Session cleared:', user.value, userProfile.value) // Debugging
  }
  return {
    user,
    userProfile,
    setUSerAuth,
    setPodcasterAuth,
    getUserSession,
    trackUserAuthChanges,
    trackPodcasterAuthChanges,
    getPodcasterSession,
    clearSession,
    podcasterProfile,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
