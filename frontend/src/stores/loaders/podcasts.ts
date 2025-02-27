import {
  podcastsPerPodcasterQuery,
  podcastsQuery,
  type PodcastsPerPodcaster,
  type Podcasts,
} from '@/services/supaQueries'
import { defineStore } from 'pinia'
import { useMemoize } from '@vueuse/core'

export const usePodcastsStore = defineStore('podcasts-store', () => {
  const podcastsPerPodcaster = ref<PodcastsPerPodcaster | null>(null)
  const podcasts = ref<Podcasts | null>(null)

  const loadPodcasts = useMemoize(async (key: string) => {
    return await podcastsQuery
  })
  const loadPodcastsPerPodcaster = useMemoize(async (podcaster_id: string) => {
    return await podcastsPerPodcasterQuery(podcaster_id)
  })

  interface ValidateCacheParams {
    ref: typeof podcasts | typeof podcastsPerPodcaster
    query: typeof podcastsQuery | typeof podcastsPerPodcasterQuery
    key: string
    loaderFn: typeof loadPodcasts | typeof loadPodcastsPerPodcaster
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getPodcastsPerPodcaster = async (podcaster_id: string) => {
    podcastsPerPodcaster.value = null
    const { data, error, status } = await loadPodcastsPerPodcaster(podcaster_id)
    if (error) console.log(error, status)
    if (data) podcastsPerPodcaster.value = data

    validateCache({
      ref: podcastsPerPodcaster,
      query: podcastsPerPodcasterQuery,
      key: 'Podcasts',
      loaderFn: loadPodcastsPerPodcaster,
    })
  }

  const getPodcasts = async () => {
    podcasts.value = null
    const { data, error, status } = await loadPodcasts('Podcasts')
    if (error) console.log(error, status)
    if (data) podcasts.value = data
    validateCache({
      ref: podcasts,
      query: podcastsQuery,
      key: 'podcasts',
      loaderFn: loadPodcasts,
    })
  }

  return {
    podcasts,
    getPodcasts,
    podcastsPerPodcaster,
    getPodcastsPerPodcaster,
  }
})
