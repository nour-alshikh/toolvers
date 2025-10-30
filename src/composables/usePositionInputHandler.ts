import { useToolPositionStore } from '@/store/toolPosition'

export function usePositionInputHandler() {
  const handlePositionChange = (inputItem: any, position: string) => {
    const toolPositionStore = useToolPositionStore()
    if (
      toolPositionStore.freeDesktopPosition == true ||
      toolPositionStore.freeMobilePosition == true
    ) {
      return
    }

    inputItem.default = position
    updatePositionElement(position)
  }

  const updatePositionElement = (position: string) => {
    const toolPositionStore = useToolPositionStore()
    const toolContainer = document.querySelector('#tool-container')
    const toolversWidget = document.querySelector('.toolvers-widget')

    if (position !== '') {
      switch (position) {
        case 'top-left':
          if (toolPositionStore.screen == 'desktop') {
            toolPositionStore.desktopPosition.x = 0
            toolPositionStore.desktopPosition.y = 0
          }
          if (toolPositionStore.screen == 'mobile') {
            toolPositionStore.mobilePosition.x = 0
            toolPositionStore.mobilePosition.y = 0
          }
          break
        case 'top': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = rect?.width / 2 - rectWidget?.width / 2
            toolPositionStore.desktopPosition.y = 0
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = rect?.width / 2 - rectWidget?.width / 2
            toolPositionStore.mobilePosition.y = 0
          }
          break
        }
        case 'top-right': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = rect?.width - rectWidget?.width
            toolPositionStore.desktopPosition.y = 0
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = rect?.width - rectWidget?.width
            toolPositionStore.mobilePosition.y = 0
          }
          break
        }
        case 'center-left': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = 0
            toolPositionStore.desktopPosition.y = rect?.height / 2 - rectWidget?.height / 2
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = 0
            toolPositionStore.mobilePosition.y = rect?.height / 2 - rectWidget?.height / 2
          }
          break
        }

        case 'center-right': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = rect?.width - rectWidget?.width
            toolPositionStore.desktopPosition.y = rect?.height / 2 - rectWidget?.height / 2
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = rect?.width - rectWidget?.width
            toolPositionStore.mobilePosition.y = rect?.height / 2 - rectWidget?.height / 2
          }
          break
        }
        case 'bottom-left': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = 0
            toolPositionStore.desktopPosition.y = rect?.height - rectWidget?.height
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = 0
            toolPositionStore.mobilePosition.y = rect?.height - rectWidget?.height
          }
          break
        }
        case 'bottom': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = rect?.width / 2 - rectWidget?.width / 2
            toolPositionStore.desktopPosition.y = rect?.height - rectWidget?.height
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = rect?.width / 2 - rectWidget?.width / 2
            toolPositionStore.mobilePosition.y = rect?.height - rectWidget?.height
          }
          break
        }
        case 'bottom-right': {
          const rect = toolContainer?.getBoundingClientRect()
          const toolversWidget = document.querySelector('.toolvers-widget')
          const rectWidget = toolversWidget?.getBoundingClientRect()

          if (toolPositionStore.screen == 'desktop' && rect && rectWidget) {
            toolPositionStore.desktopPosition.x = rect?.width - rectWidget?.width
            toolPositionStore.desktopPosition.y = rect?.height - rectWidget?.height
          }
          if (toolPositionStore.screen == 'mobile' && rect && rectWidget) {
            toolPositionStore.mobilePosition.x = rect?.width - rectWidget?.width
            toolPositionStore.mobilePosition.y = rect?.height - rectWidget?.height
          }

          break
        }
      }
      const rect = toolContainer?.getBoundingClientRect()
      if (toolPositionStore.screen == 'mobile' && rect) {
        if (toolPositionStore.mobilePosition.x > rect?.width / 2) {
          toolversWidget?.classList.remove('flex-row-reverse')
          toolversWidget?.classList.add('flex-row')
        } else {
          toolversWidget?.classList.remove('flex-row')
          toolversWidget?.classList.add('flex-row-reverse')
        }
      } else if(toolPositionStore.screen == 'desktop' && rect) {
        if (toolPositionStore.desktopPosition.x > rect?.width / 2) {
          toolversWidget?.classList.remove('flex-row-reverse')
          toolversWidget?.classList.add('flex-row')
        } else {
          toolversWidget?.classList.remove('flex-row')
          toolversWidget?.classList.add('flex-row-reverse')
        }
      }
    }
  }
  return {
    handlePositionChange,
    updatePositionElement,
  }
}
