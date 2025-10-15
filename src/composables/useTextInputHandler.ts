export function useTextInputHandler() {
  const updateTextElement = (id: string, property: string, value: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)
    if (!el) return

    if (property === 'innerText') {
      el.textContent = value
    }

    if (property === 'href') {
      const hrefTemplate = el.getAttribute('data-href-template')
      if (hrefTemplate) {
        el.setAttribute('href', hrefTemplate.replace('{phone}', value))
      }
    }
  }

  const handleTextInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const id = target.dataset.id!
    const property = target.dataset.property!
    const value = target.value
    updateTextElement(id, property, value)
  }

  return { handleTextInputChange, updateTextElement }
}
