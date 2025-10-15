import type { ToolInputField } from "@/types"

export function useSwitchInputHandler() {

  const updateSwitchElement = (id: string, property: string, value: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)
    if (!el) return

    if (property === 'toggleVisible') {
      el.style.display = value === 'on' ? 'flex' : 'none'
    }

  }

  const handleSwitchChange = (inputItem: ToolInputField, newState: boolean) => {

  inputItem.default_value = newState ? 'on' : 'off'

  updateSwitchElement(inputItem.id, inputItem.property, inputItem.default_value)
}

  return { handleSwitchChange, updateSwitchElement }
}
