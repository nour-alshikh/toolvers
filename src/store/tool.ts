import type { User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import axiosInstance from '@/lib/axios'
import router from '@/router'
import type { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from './auth'

export const useToolsStore = defineStore(
  'tools',
  () => {

    const tools = ref<any[]>([])
    const isLoading = ref<boolean>(false)
    const errors = ref<Record<string, string[]> | null>(null)

    const getTools = async () => {

      // try {
      //   isLoading.value = true
      //   const response = await axiosInstance.get('/api/clients/tools',{
      //     headers: {
      //       authorization: `Bearer ${data.token}`,
      //     },
      //   })
      //   tools.value = response.data.data
      // } catch (error) {
      //   const err = error as AxiosError<{ errors?: Record<string, string[]> }>
      //   errors.value = err.response?.data?.errors ?? null
      // } finally {
      //   isLoading.value = false
      // }
    }

    return {
      tools,
      isLoading,
      errors,
      getTools
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
