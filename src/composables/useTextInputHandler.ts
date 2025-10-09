export function useTextInputHandler() {
    const handleTextInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const id = target.dataset.id
      const value = target.value
      const property = target.dataset.property
      const toolversTool = document.querySelector('.toolvers-tool')
      const el = toolversTool?.querySelector(`[data-id="${id}"]`)
  
      if (el && property === 'innerText') {
        el.textContent = value
      }

      if(el && property === 'href')
      {
        const hrefTemplate = el?.getAttribute('data-href-template')
        const href = hrefTemplate?.replace("{phone}", value)
      }
    }
  
    return { handleTextInputChange }
  }