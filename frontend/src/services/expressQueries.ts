import { expressClient } from './expressClient'

export default {
  getUsers() {
    return expressClient.get(`/users`)
  },
  getPodcasters(){
    return expressClient.get('/podcasters')
  },
  getPodcasts(){
    return expressClient.get('/podcasts')
  },
}