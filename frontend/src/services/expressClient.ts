import type { User, Session, WeakPassword } from '@supabase/supabase-js';
import axios from 'axios'

export const expressClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createActiveSession = async (sessionData: { user: User; session: Session; weakPassword?: WeakPassword; } | { user: null; session: null; weakPassword?: null; }) => {
  try {
    const response = await axios.post('/api/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: sessionData.session?.access_token }),
    });
    console.log(response)
    console.log('Session created successfully');
    }catch(error) {
    console.error('Failed to create session', error);
  }

}
