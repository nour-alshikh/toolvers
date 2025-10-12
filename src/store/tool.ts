
import { defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'

import axiosInstance from '@/lib/axios'
import type { AxiosError } from 'axios'
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

    const toolDetails = ref<any>({})

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

    const getToolDetails = async (toolId : number) =>{
      const authStore = useAuthStore()
      const token = authStore.token
      
      try {
        isLoading.value = true

        const response = await axiosInstance.get(`/api/clients/tools/${toolId}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      
        if(response.status === 200){
          toolDetails.value = response.data.data
          
          return toolDetails.value
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

    const installTool = async (toolId : number , formData : FormData) => {
      const authStore = useAuthStore()
      const token = authStore.token
      
      try {
        isLoading.value = true

        const response = await axiosInstance.post(`/api/clients/tools/${toolId}/install` , formData,{
        
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
      
        if(response.status === 200){
          toolDetails.value = response.data.data
          
          return toolDetails.value
          
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
      toolDetails,
      toolsTypes,
      isLoading,
      errors,
      getTools,getToolDetails,installTool
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
