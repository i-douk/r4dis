import { singleUserQuery, usersQuery, type SingleUser, type Users } from '@/services/supaQueries'
import { defineStore } from 'pinia'
import { useMemoize } from '@vueuse/core'
import expressService from '@/services/expressQueries'
import type { Tables } from 'database/types'
export const useUsersStore = defineStore('users-store', () => {
  const singleUser = ref<null | Tables<'users'>>(null)
  const users = ref<Users | null>(null)

  const loadUsers = useMemoize(async (key: string) => {
    return await usersQuery
  })
  const loadSingleUser = useMemoize(async (username: string) => {
    return await expressService.getSingleUser(username)
  })

  interface ValidateCacheParams {
    ref: typeof users | typeof singleUser
    query: typeof usersQuery | typeof expressService.getSingleUser
    key: string
    loaderFn: typeof loadUsers | typeof loadSingleUser
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (data) ref.value = data
        }
      })
    }
  }

  const getSingleUser = async (username: string) => {
    singleUser.value = null
    const { data } = await loadSingleUser(username)
    if (data) singleUser.value = data

    validateCache({
      ref: singleUser,
      query: expressService.getSingleUser,
      key: username,
      loaderFn: loadSingleUser,
    })
  }

  const getUsers = async () => {
    users.value = null
    const { data, error, status } = await loadUsers('users')
    if (error) console.log(error, status)
    if (data) users.value = data
    validateCache({
      ref: users,
      query: usersQuery,
      key: 'users',
      loaderFn: loadUsers,
    })
  }

  return {
    users,
    getUsers,
    singleUser,
    getSingleUser,
  }
})
