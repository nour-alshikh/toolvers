import { defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'

import axiosInstance from '@/lib/axios'
import type { AxiosError } from 'axios'
import { useAuthStore } from './auth'
import type { InstalledTool, Tool } from '@/types'
import { useToast } from 'vue-toast-notification'

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

    const getTools = async (): Promise<Tool[]> => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        const response = await axiosInstance.get('/api/clients/tools', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
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

    const getInstalledTools = async (): Promise<InstalledTool[]> => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true
        const response = await axiosInstance.get('/api/clients/user-tools', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
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
const toggleToolStatus = async (userToolId: number) => {
    // NOTE: Renamed argument for clarity: `userTool` -> `userToolId`
    const authStore = useAuthStore()
    const token = authStore.token

    const $toast = useToast()

    try {
        isLoading.value = true

        const response = await axiosInstance.patch(
            // Use the passed ID in the endpoint
            `/api/clients/user-tools/${userToolId}/toggle-active`,
            {},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        )

        if (response.status === 200) {
            $toast.success('تم تغيير حالة العنصر بنجاح')
        }
    } catch (error) {
        $toast.error('حدث خطأ أثناء تغيير حالة العنصر')
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        
        // CRITICAL: Ensure the error is thrown so `handleToggle` can catch it
        throw error 
    } finally {
        isLoading.value = false
    }
}
    const getToolDetails = async (toolId: number) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        const response = await axiosInstance.get(`/api/clients/tools/${toolId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
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

    const installTool = async (toolId: number, formData: FormData) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        const response = await axiosInstance.post(
          `/api/clients/tools/${toolId}/install`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )

        if (response.status === 200) {
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
      getTools,
      getToolDetails,
      installTool,
      getInstalledTools,
      toggleToolStatus,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
