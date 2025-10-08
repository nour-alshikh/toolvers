// composables/useColorHandler.ts
export function useColorHandler() {
  /**
   * Handle color updates for tool elements
   * @param newColor - The new color object (e.g., { hex: '#ff0000' })
   * @param inputItem - The input item containing id and property info
   */
  const handleColorChange = (newColor: any, inputItem: any) => {
    // Update the local input item value
    inputItem.value = newColor

    const { id, property } = inputItem
    const toolversTool = document.querySelector('.toolvers-tool')

    // If multiple ids (array of targets)
    if (Array.isArray(id)) {
      id.forEach((i: string) => {
        const el = toolversTool?.querySelector(`[data-id="${i}"]`)
        if (el instanceof HTMLElement && property) {
          el.style[property as any] = newColor.hex
        }
      })
    } else {
      // Single id
      const el = toolversTool?.querySelector(`[data-id="${id}"]`)
      if (el instanceof HTMLElement && property) {
        el.style[property as any] = newColor.hex
      }
    }
  }

  return { handleColorChange }
}
