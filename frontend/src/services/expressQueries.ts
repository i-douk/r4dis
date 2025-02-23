import { tokenExtractor } from '@/utils/tokenExtractor'
import { expressClient } from './expressClient'

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
    return expressClient.put(`/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await tokenExtractor()}`,
      },
    })
  },
}
