import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToolPositionStore = defineStore(
  'toolPosition',
  () => {

    const screen = ref<'desktop' | 'mobile'>('desktop')

    const desktopPosition = ref({ x: 0, y: 0 })

    const mobilePosition = ref({ x: 0, y: 0 })

    const freeDesktopPosition = ref(false)
    const freeMobilePosition = ref(false)


    return {
      screen,
      desktopPosition,
      mobilePosition,
      freeDesktopPosition,
      freeMobilePosition
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: [],
    },
  },
)
