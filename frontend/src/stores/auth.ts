import { supabase } from '@/lib/supabaseClient';
import { userQuery } from '@/services/supaQueries';
import type { Session, User } from '@supabase/supabase-js';
import type { Tables } from 'database/types';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null);
  const userProfile = ref<null | Tables<'users'>>(null);
  const isTrackingAuthChanges = ref(false);

  const setUserProfile = async () => {
    if (!user.value) {
      userProfile.value = null;
      return;
    }

    if (!userProfile.value || userProfile.value.id !== parseInt(user.value.id)) {
      try {
        const { data, error } = await userQuery({
          column: 'id',
          value: user.value.id,
        });

        if (error) {
          console.error('Error fetching user profile:', error);
          userProfile.value = null;
        } else {
          userProfile.value = data || null;
        }
      } catch (err) {
        console.error('Unexpected error in setUserProfile:', err);
        userProfile.value = null;
      }
    }
  };

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null;
      userProfile.value = null;
      return;
    }

    user.value = userSession.user;
    await setUserProfile();
  };

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else if (data.session?.user) {
        await setAuth(data.session);
      }
    } catch (err) {
      console.error('Unexpected error in getSession:', err);
    }
  };

  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) return;

    isTrackingAuthChanges.value = true;
    supabase.auth.onAuthStateChange(async (event, session) => {
      await setAuth(session);
    });
  };

  return {
    user,
    userProfile,
    setAuth,
    getSession,
    trackAuthChanges,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}