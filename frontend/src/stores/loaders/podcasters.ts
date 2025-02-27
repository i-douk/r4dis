import {
  singlePodcasterQuery,
  podcastersQuery,
  type SinglePodcaster,
  type PodcastersType,
} from '@/services/supaQueries'
import expressService from '@/services/expressQueries'
import { defineStore } from 'pinia'
import { useMemoize } from '@vueuse/core'

export const usePodcastersStore = defineStore('podcasters-store', () => {
  const singlePodcaster = ref<SinglePodcaster | null>(null)
  const podcasters = ref<PodcastersType | null>(null)

  const loadpodcasters = useMemoize(async (key: string) => {
    return await expressService.getPodcasters()
  })
  const loadSinglePodcaster = useMemoize(async (username: string) => {
    return await singlePodcasterQuery(username)
  })

  interface ValidateCacheParams {
    ref: typeof podcasters | typeof singlePodcaster
    query: typeof podcastersQuery | typeof singlePodcasterQuery
    key: string
    loaderFn: typeof loadpodcasters | typeof loadSinglePodcaster
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

  const getSinglePodcaster = async (username: string) => {
    singlePodcaster.value = null
    const { data, error, status } = await loadSinglePodcaster(username)
    if (error) console.log(error, status)
    if (data) singlePodcaster.value = data

    validateCache({
      ref: singlePodcaster,
      query: singlePodcasterQuery,
      key: 'podcasters',
      loaderFn: loadSinglePodcaster,
    })
  }

  const getPodcasters = async () => {
    podcasters.value = null
    const { data, error, status } = await loadpodcasters('podcasters')
    if (error) console.log(error, status)
    if (data) podcasters.value = data
    validateCache({
      ref: podcasters,
      query: podcastersQuery,
      key: 'podcasters',
      loaderFn: loadpodcasters,
    })
  }

  return {
    podcasters,
    getPodcasters,
    singlePodcaster,
    getSinglePodcaster,
  }
})
