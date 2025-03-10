import { podcastsPerPodcasterQuery, type PodcastsPerPodcaster } from '@/services/supaQueries';
import { defineStore } from 'pinia';
import { useMemoize } from '@vueuse/core';
import expressService from '@/services/expressQueries';
import type { ExtendedPodcast } from '@/types/ExtendedTableTypes';
export const usePodcastsStore = defineStore('podcasts-store', () => {
const podcastsPerPodcaster = ref<PodcastsPerPodcaster[]>([]) 
const podcasts = ref<null | ExtendedPodcast[]>(null)

  const loadPodcasts = useMemoize(async (key: string) => {
    return await expressService.getPodcasts()
  })
  const loadPodcastsPerPodcaster = useMemoize(async (podcaster_id: string) => {
    return await podcastsPerPodcasterQuery(podcaster_id)
  })

  interface ValidateCacheParams {
    ref: typeof podcasts | typeof podcastsPerPodcaster
    query: typeof expressService.getPodcasts | typeof podcastsPerPodcasterQuery
    key: string
    loaderFn: typeof loadPodcasts | typeof loadPodcastsPerPodcaster
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
        }
      })
    }
  }

  const getPodcastsPerPodcaster = async (podcaster_id: string) => {
    loadPodcastsPerPodcaster.delete(podcaster_id);
    podcastsPerPodcaster.value = [];
    const { data, error, status } = await loadPodcastsPerPodcaster(podcaster_id)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) {
      podcastsPerPodcaster.value = data as PodcastsPerPodcaster
    }

    validateCache({
      ref: podcastsPerPodcaster,
      query: podcastsPerPodcasterQuery,
      key: 'Podcasts',
      loaderFn: loadPodcastsPerPodcaster,
    })
  }

  const getPodcasts = async () => {
    podcasts.value = null
    const { data } = await loadPodcasts('podcasts')
    if (data) podcasts.value = data
    validateCache({
      ref: podcasts,
      query: expressService.getPodcasts,
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
