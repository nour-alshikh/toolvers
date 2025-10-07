
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import axiosInstance from '@/lib/axios'
import router from '@/router'
import type { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from './auth'
import type { Tool } from '@/types'

export const useToolsStore = defineStore(
  'tools',
  () => {

    const tools = ref<any[]>([])
    const isLoading = ref<boolean>(false)
    const errors = ref<Record<string, string[]> | null>(null)

    const toolsTypes = computed<string[]>(() => {
      const types = new Set<string>()
      tools.value.forEach((tool) => {
        types.add(tool.type)
      })
      return Array.from(types)
    })

    const getTools = async (): Promise<Tool[]>  => {

      const authStore = useAuthStore()
      const token = authStore.token
      
      try {
        isLoading.value = true

        const response = await axiosInstance.get('/api/clients/tools',{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      
        if(response.status === 200){
          tools.value = response.data.data
          
          return tools.value
        }

        return []
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        return []
      } finally {
        isLoading.value = false
      }
    }

    return {
      tools,
      toolsTypes,
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
