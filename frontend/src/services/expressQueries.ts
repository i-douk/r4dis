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
    if (error) return error
    return expressClient.put(`/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.session?.access_token}`,
      },
    })
  },
}
