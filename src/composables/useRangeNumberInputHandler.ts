export function useRangeNumberInputHandler() {
  const handleRangeNumberInput = (inputItem: any) => {

    updateRangeNumberChange(inputItem.id, inputItem.property, inputItem.default)
  }

  const updateRangeNumberChange = (id: string | string[], property: string, value: string) => {

    const toolversTool = document.querySelector('.toolvers-tool')
    const vdrContainer = document.querySelector('.vdr-container')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)
    const toolversWidget = toolversTool?.querySelector('.toolvers-widget')

    if (el instanceof HTMLElement && property) {
      if (property === 'animationDuration') {
        el.style.animationDuration = value + 's'
      } else if (property === 'scale' && toolversWidget instanceof HTMLElement) {
        if (vdrContainer?.classList.contains('top-left')) {
          toolversWidget.style.transformOrigin = 'top left'
        } else if (vdrContainer?.classList.contains('top-right')) {
          toolversWidget.style.transformOrigin = 'top right'
        } else if (vdrContainer?.classList.contains('top')) {
          toolversWidget.style.transformOrigin = 'top center'
        } else if (vdrContainer?.classList.contains('bottom-left')) {
          toolversWidget.style.transformOrigin = 'bottom left'
        } else if (vdrContainer?.classList.contains('bottom-right')) {
          toolversWidget.style.transformOrigin = 'bottom right'
        } else if (vdrContainer?.classList.contains('bottom')) {
          toolversWidget.style.transformOrigin = 'bottom center'
        } else if (vdrContainer?.classList.contains('center-left')) {
          toolversWidget.style.transformOrigin = 'center left'
        } else if (vdrContainer?.classList.contains('center-right')) {
          toolversWidget.style.transformOrigin = 'center right'
        } else if (vdrContainer?.classList.contains('center')) {
          toolversWidget.style.transformOrigin = 'center center'
        }
        el.style.scale = value
      } else {
        el.style[property as any] = value + 'px'
      }
    }
  }
  return { handleRangeNumberInput, updateRangeNumberChange }
}
