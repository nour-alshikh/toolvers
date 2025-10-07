import type { User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import axiosInstance from '@/lib/axios'
import router from '@/router'
import type { LoginData } from '@/types'
import type { AxiosError } from 'axios'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const isLoggedIn = ref<boolean>(false)
    const token = ref<string | null>(localStorage.getItem('token'))

    const errors = ref<Record<string, string[]> | null>(null)
    const isLoading = ref<boolean>(false)
    // login function
    const login = async (formData: LoginData) => {
      isLoading.value = true
      try {
        const response = await axiosInstance.post('/api/auth/login', formData)
        if (response.status === 200) {
          user.value = response.data.data.user
          isLoggedIn.value = true
          router.push('/')
          setToken(response.data.data.token)

          errors.value = null
        }
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
      } finally {
        isLoading.value = false
      }
    }
    // logout function
    const logout = async () => {
      try {
        isLoading.value = true
        const response = await axiosInstance.post(
          '/api/auth/logout',
          {},
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          },
        )
        if (response.status === 200) {
          cleanState()

          router.push('/login')

          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }
    
    // const getUser = async () => {

    //     await axiosInstance.get('/sanctum/csrf-cookie', {
    //         baseURL: 'http://localhost:8000'
    //     });

    //     try {
    //         const response = await axiosInstance.get('/user');

    //         user.value = response.data
    //         isLoggedIn.value = true
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const logout = async () => {
    //     await axiosInstance.post('/logout')
    //     user.value = null;
    //     isLoggedIn.value = false
    //     router.push('/login')
    // }

    const setToken = (newToken: string) => {
      token.value = newToken
      localStorage.setItem('token', newToken)
    }

    const cleanState = () => {
      user.value = null
      isLoggedIn.value = false
      token.value = null
      localStorage.removeItem('token')
    }

    return {
      user,
      isLoggedIn,
      login,
      logout,
      cleanState,
      isLoading,
      errors,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['user', 'isLoggedIn'],
    },
  },
)
