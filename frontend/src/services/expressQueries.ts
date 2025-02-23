import { tokenExtractor } from '@/utils/tokenExtractor'
import { expressClient } from './expressClient'
import { supabase } from '@/lib/supabaseClient'

const { data: session, error } = await supabase.auth.getSession()

export default {
  getUsers() {
    return expressClient.get(`/users`)
  },
  getPodcasters() {
    return expressClient.get('/podcasters')
  },
  getPodcasts() {
    return expressClient.get('/podcasts')
  },
  async editUser(id: string, data: any) {
    const  token   = session.session?.access_token; 
    return expressClient.put(`/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    });
  }
}
