// composables/useColorHandler.ts
export function useColorHandler() {
  /**
   * Handle color updates for tool elements
   * @param newColor - The new color object (e.g., { hex: '#ff0000' })
   * @param inputItem - The input item containing id and property info
   */
  const handleColorChange = (newColor: any, inputItem: any) => {
    // Update the local input item default (not value)
    inputItem.default = newColor.hex

    const { id, property } = inputItem
    const toolversTool = document.querySelector('.toolvers-tool')

    // If multiple ids (array of targets)
    if (Array.isArray(id)) {
      id.forEach((i: string , index) => {
        const el = toolversTool?.querySelector(`[data-id="${i}"]`)
        if (el && property && typeof(property) === 'string') {
          if (el instanceof HTMLElement) {
            el.style[property as any] = newColor.hex
          } else if (el instanceof SVGElement) {
            (el as SVGElement).style.fill = newColor.hex
          }
        } else if (el && property && typeof(property) === 'object') {
          if (el instanceof HTMLElement) {
            el.style[property[index] as any] = newColor.hex
          } else if (el instanceof SVGElement) {
            (el as SVGElement).style.fill = newColor.hex
          }
          
        }
      })
    } else {
      // Single id
      const el = toolversTool?.querySelector(`[data-id="${id}"]`)

      if (el && property) {
        if (el instanceof SVGElement) {
          (el as SVGElement).style.fill = newColor.hex
        } else if (el instanceof HTMLElement) {
          (el.style as any)[property] = newColor.hex
        }
      }
    }
  }

  const updateColorChange = (id: string | string[], property: string, color: string) => {
    
    const toolversTool = document.querySelector('.toolvers-tool');

    if (!color || !id || !property || !toolversTool) return;

    const updateStyle = (el: Element | null, value: string, prop: string) => {
        if (!el) return;
        if (el instanceof SVGElement) {
            (el as SVGElement).style.fill = value;
        } else if (el instanceof HTMLElement) {
            (el.style as any)[prop] = value;
        }
    };

    if (Array.isArray(id)) {
        id.forEach((i: string) => {
          const el = toolversTool.querySelector(`[data-id="${i}"]`);
            updateStyle(el, color, property);
        });
    } else {
        const el = toolversTool.querySelector(`[data-id="${id}"]`);
        updateStyle(el, color, property);
    }
}


  return { handleColorChange, updateColorChange }
}