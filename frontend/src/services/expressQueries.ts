import { tokenExtractor } from '@/utils/tokenExtractor'
import { expressClient } from '../lib/expressClient'
import type { PodcastForm } from '@/types/PodcastForm'

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
  async deleteProfile(id: string) {
    return expressClient.delete(`/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await tokenExtractor()}`,
      },
    })
  },
  async editPodcaster(id: string, data: any) {
    return expressClient.put(`/podcasters/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await tokenExtractor()}`,
      },
    })
  },
  async addPodcast(username: string, data: PodcastForm) {
    return expressClient.post(`/podcasts/${username}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await tokenExtractor()}`,
      },
    })
  },
  async followPodcast(podcastId: any, userId: string) {
    return expressClient.post(
      `/followings`,
      { podcastId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await tokenExtractor()}`,
        },
      },
    )
  },
  async subscribeToPodcaster(podcasterId: string, userId: string) {
    return expressClient.post(
      `/subscriptions`,
      { podcasterId, userId, stipend: 0 },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await tokenExtractor()}`,
        },
      },
    )
  },
  async getPodcaster(username: string) {
    return expressClient.get(`/podcasters/${username}`)
  },
  async getPodcast(slug: string) {
    return expressClient.get(`/podcasts/${slug}`)
  },
  async getSingleUser( username : string) {
    return expressClient.get(`/users/${username}`)
  }
}
