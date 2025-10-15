// useImageHandler.ts

export const useImageHandler = () => {
  const updateImageChange = (id: string, property: string, value: string) => {
   
    const toolversTool = document.querySelector('.toolvers-tool') 
    const el = toolversTool?.querySelector(`[data-id="${id}"]`) as HTMLElement | null
    
    if (el) {
      el.setAttribute(property, value)
    }
  }

  return {
    updateImageChange
  }
}