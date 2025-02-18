import { supabase } from '@/lib/supabaseClient'
import { userQuery } from '@/services/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const userProfile = ref<null | Tables<'users'>>(null)
  const isTrackingAuthChanges = ref(false)

  const setUserProfile = async () => {
    if (!user.value) {
      userProfile.value = null
      return
    }

    if (!userProfile.value || userProfile.value.id !== parseInt(user.value.id)) {
      const { data } = await userQuery({
        column: 'id',
        value: user.value.id
      })

      userProfile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      userProfile.value = null
      return
    }

    user.value = userSession.user
    await setUserProfile()
  }
  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) await setAuth(data.session)
  }

  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    userProfile,
    setAuth,
    getSession,
    trackAuthChanges
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
