import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToolPositionStore = defineStore(
  'toolPosition',
  () => {

    const toolPosition = ref<any>({})

    const toolWidth = ref<any>({})

    const toolHeight = ref<any>({})

    const toolX = ref<any>({})

    const toolY = ref<any>({})

    return {
      toolPosition,
      toolWidth,
      toolHeight,
      toolX,
      toolY,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
