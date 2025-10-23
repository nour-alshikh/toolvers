export function usePositionInputHandler() {
  const handlePositionChange = (inputItem: any, position: string) => {
    inputItem.default = position
    const toolversTool = document.querySelector('.toolvers-tool')
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
    toolversTool?.classList.add(position)
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
  const updatePositionElement = (position: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
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
    toolversTool?.classList.add(position)
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
  return {
    handlePositionChange,
    updatePositionElement,
  }
}
