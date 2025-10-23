import type { ToolInputField } from '@/types'

export function useSwitchInputHandler() {
  const updateSwitchElement = (id: string, property: string, value: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)
    if (!el) return

    if (el instanceof HTMLElement && property === 'toggleVisible') {
      el.style.display = value === 'on' ? 'flex' : 'none'
    }
    if (el instanceof HTMLElement && property === 'toggleMoving') {
      el.style.animationPlayState = value === 'on' ? 'running' : 'paused'
    }
  }

  const handleSwitchChange = (inputItem: ToolInputField, newState: boolean) => {
    inputItem.default = newState ? 'on' : 'off'
    if (inputItem.property) {
      updateSwitchElement(inputItem.id, inputItem.property, inputItem.default)
    }
  }

  return { handleSwitchChange, updateSwitchElement }
}
