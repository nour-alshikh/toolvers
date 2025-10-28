import { useToolPositionStore } from "@/store/toolPosition"

export function usePositionInputHandler() {
  const handlePositionChange = (inputItem: any, position: string) => {

    const toolPositionStore = useToolPositionStore()

    if(toolPositionStore.freeDesktopPosition == true || toolPositionStore.freeMobilePosition == true){
      return
    }



    inputItem.default = position
    const toolversTool = document.querySelector('.toolvers-tool')
    const vdrContainer = document.querySelector('.vdr-container')
    const toolversWidget = document.querySelector('.toolvers-widget')
    toolversTool?.classList.remove(
      'top-left',
      'top',
      'top-right',
      'center-left',
      'center',
      'center-right',
      'bottom-left',
      'bottom',
      'bottom-right',
    )
    if (position !== '') {
      toolversTool?.classList.add(position)
      vdrContainer?.classList.remove(
        'top-left',
        'top',
        'top-right',
        'center-left',
        'center',
        'center-right',
        'bottom-left',
        'bottom',
        'bottom-right',
      )
      vdrContainer?.classList.add(position)
      if (toolversWidget) {
        if (position.includes('left')) {
          toolversWidget.classList.remove('flex-row')
          toolversWidget.classList.add('flex-row-reverse')
        }
        if (position.includes('right')) {
          toolversWidget.classList.remove('flex-row-reverse')
          toolversWidget.classList.add('flex-row')
        }
      }
    }
  }
  const updatePositionElement = (position: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
    const vdrContainer = document.querySelector('.vdr-container')
    const toolversWidget = document.querySelector('.toolvers-widget')
    toolversTool?.classList.remove(
      'top-left',
      'top',
      'top-right',
      'center-left',
      'center',
      'center-right',
      'bottom-left',
      'bottom',
      'bottom-right',
    )
    if (position !== '') {
    toolversTool?.classList.add(position)
    vdrContainer?.classList.remove(
      'top-left',
      'top',
      'top-right',
      'center-left',
      'center',
      'center-right',
      'bottom-left',
      'bottom',
      'bottom-right',
    )
    vdrContainer?.classList.add(position)
    if (toolversWidget) {
      if (position.includes('left')) {
        toolversWidget.classList.remove('flex-row')
        toolversWidget.classList.add('flex-row-reverse')
      }
      if (position.includes('right')) {
        toolversWidget.classList.remove('flex-row-reverse')
        toolversWidget.classList.add('flex-row')
      }
    }
  }
  }
  return {
    handlePositionChange,
    updatePositionElement,
  }
}
