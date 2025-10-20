import { defineStore } from 'pinia'
import { computed, reactive, ref, watch, watchEffect } from 'vue'

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

    const initialDisplayInputs = [
      {
        title: 'اسم الاداة',
        isOpen: true,
        class: 'grid grid-cols-1 gap-4',
        inputs: [
          {
            label: 'اسم الاداة',
            default_value: '',
            id: 'name',
            class: 'my-1 col-span-1',
            type: 'text',
            property: 'name',
            name: 'name',
          },
        ],
      },
      {
        title: 'مدة العرض',
        isOpen: true,
        class: 'grid grid-cols-3 gap-4',
        inputs: [
          {
            label: 'مدة العرض',
            default_value: '0',
            id: 'show_delay',
            class: 'my-1 col-span-1',
            type: 'number',
            property: 'show_delay',
            name: 'show_delay',
          },
          {
            label: 'مدة التأخير',
            default_value: '0',
            id: 'hide_after',
            class: 'my-1 col-span-1',
            type: 'number',
            property: 'hide_after',
            name: 'hide_after',
          },
          {
            label: 'عدد مرات الظهور',
            default_value: '0',
            id: 'appearance_count',
            class: 'my-1 col-span-1',
            type: 'number',
            property: 'appearance_count',
            name: 'appearance_count',
          },
        ],
      },
      {
        title: 'صفحات العرض',
        isOpen: true,
        class: 'grid grid-cols-1 gap-4',
        inputs: [
          {
            label: 'صفحات العرض',
            id: 'display-pages',
            class: 'my-1 col-span-1',
            type: 'display-pages',
            property: 'display-pages',
            name: 'all_pages',
            default_value: 'true',
            urls: [],
            pages: [],
          },
        ],
      },
      {
        title: 'اعدادت العرض',
        isOpen: true,
        class: 'grid grid-cols-2 gap-4',
        inputs: [
          {
            label: 'عرض على الجوال',
            name: 'show_on_mobile',
            default_value: 'on',
            id: 'show_on_mobile',
            type: 'switch',
            class: 'my-1 col-span-1 flex justify-center items-center',
            property: 'toggleVisible',
          },
          {
            label: 'عرض على سطح المكتب',
            name: 'show_on_desktop',
            default_value: 'on',
            id: 'show_on_desktop',
            type: 'switch',
            class: 'my-1 col-span-1 flex justify-center items-center',
            property: 'toggleVisible',
          },
        ],
      },
    ]

    const displayInputs = reactive(JSON.parse(JSON.stringify(initialDisplayInputs)))

    const displayInputsValues = ref<any>({})

    const toolsTypes = computed<string[]>(() => {
      const types = new Set<string>()
      tools.value.forEach((tool) => {
        types.add(tool.type)
      })
      return Array.from(types)
    })

    const toolDetails = ref<any>({})

    const toolValues = ref<any>({})

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
      const authStore = useAuthStore()
      const token = authStore.token

      const $toast = useToast()
      try {
        const response = await axiosInstance.patch(
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

        throw error
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

    const uploadImage = async (formData: FormData) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        const response = await axiosInstance.post(`/api/clients/tools/upload`, formData, {
          headers: {
            authorization: `Bearer ${token}`,

            Accept: 'application/json',
          },
        })

        if (response.status === 200) {
          return response.data.path
        }

        return
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        return []
      } finally {
        isLoading.value = false
      }
    }

    const getToolDetailsAndValues = async (toolId: number, userToolId: number) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        const response = await axiosInstance.get(
          `/api/clients/tools/${toolId}/user-tools/${userToolId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
          toolDetails.value = response.data.data
          toolValues.value = response.data.data.user_tool.values
          const settings = response.data.data.user_tool.view_settings

          // Save the raw response if you need it
          displayInputsValues.value = settings

          
          // Loop through displayInputs and assign values dynamically
          displayInputs.forEach((group: any) => {
            group.inputs?.forEach((input: any) => {
              // Try to match API key by 'property' or 'name'
              const key = input.name
              if (key && settings[key] !== undefined) {
                // Assign the new value from API

                if (key === 'all_pages') {
                  input.default_value = settings[key]
                  input.urls = [...JSON.parse(settings['urls'])]
                }
                input.default_value = settings[key]
              }
            })
          })

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

    const updateToolValues = async (toolId: number, userToolId: number, formData: FormData) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        await axiosInstance.put(`/api/clients/tools/${toolId}/user-tools/${userToolId}`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        return []
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        return []
      } finally {
        isLoading.value = false
      }
    }

    const deleteTool = async (userToolId: number) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        await axiosInstance.delete(`/api/clients/user-tools/${userToolId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })

        return []
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        return []
      } finally {
        isLoading.value = false
      }
    }

    const duplicateTool = async (userToolId: number) => {
      const authStore = useAuthStore()
      const token = authStore.token

      try {
        isLoading.value = true

        await axiosInstance.post(
          `/api/clients/user-tools/${userToolId}/duplicate`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )

        return []
      } catch (error) {
        const err = error as AxiosError<{ errors?: Record<string, string[]> }>
        errors.value = err.response?.data?.errors ?? null
        return []
      } finally {
        isLoading.value = false
      }
    }

    const clearStore = () => {
      toolValues.value = {}
      toolDetails.value = {}
      displayInputsValues.value = {}
      const reset = JSON.parse(JSON.stringify(initialDisplayInputs))
      displayInputs.splice(0, displayInputs.length, ...reset)
    }

    return {
      tools,
      toolDetails,
      toolValues,
      displayInputs,
      displayInputsValues,
      toolsTypes,
      isLoading,
      errors,
      getTools,
      getToolDetails,
      installTool,
      getInstalledTools,
      toggleToolStatus,
      uploadImage,
      getToolDetailsAndValues,
      updateToolValues,
      deleteTool,
      duplicateTool,
      clearStore,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
