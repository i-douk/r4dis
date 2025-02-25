import { singleUserQuery, usersQuery, type SingleUser , type Users } from '@/services/supaQueries';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useMemoize } from '@vueuse/core';


export const useUsersStore = defineStore('users-store', () => {
    const singleUser = ref<SingleUser | null >(null);
    const users = ref<Users | null>(null);

    const loadUsers = useMemoize ( async (key : string) => {
        return await usersQuery
    });
    const loadSingleUser = useMemoize( async (username: string) => {
        return await singleUserQuery(username)
    });

    interface ValidateCacheParams {
        ref: typeof users | typeof singleUser
        query: typeof usersQuery | typeof singleUserQuery
        key: string
        loaderFn: typeof loadUsers | typeof loadSingleUser
    };

    const validateCache = ({
        ref,
        query,
        key,
        loaderFn
      }: ValidateCacheParams) => {
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
      };

    const getSingleUser = async (username : string) => {
        singleUser.value = null;
        const { data , error, status }= await loadSingleUser(username);
        if (error) console.log( error, status );
        if (data) singleUser.value = data;

        validateCache({
            ref: singleUser,
            query : singleUserQuery,
            key: 'users',
            loaderFn: loadSingleUser
        })
    };

    const getUsers = async () =>{
        users.value = null;
        const { data, error, status } = await loadUsers('users');
        if (error) console.log(error,status)
            if(data) users.value = data;
        validateCache({
            ref: users,
            query: usersQuery,
            key: 'users',
            loaderFn: loadUsers
        })
    };

    return {
        users,
        getUsers,
        singleUser,
        getSingleUser
    }
})