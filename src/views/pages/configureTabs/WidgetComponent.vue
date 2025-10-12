<script setup lang="ts">
defineProps({
  widget: {
    type: String,
    required: false,
  },
  screen: {
    type: String,
    required: true,
  },
})

function handleInput(input: any) {
  const toolversTool = document.querySelector('.toolvers-tool')
  const el = toolversTool?.querySelector(`[data-id="${input.id}"]`)
  if (toolversTool instanceof HTMLElement && input.type === 'position') {
    handlePosition(input, toolversTool)
  }

  if (el instanceof HTMLElement) {
    if (input.type === 'range' && input.property === 'fontSize') {
      if (Array.isArray(input.value)) {
        el.style.fontSize = `${input.value[0]}px`
      }
    }
    if (input.type === 'range' && input.property === 'scale') {
      if (Array.isArray(input.value) && toolversTool instanceof HTMLElement) {
        let transformValue = toolversTool.style.transform || ''
        if (transformValue) {
          transformValue = transformValue.replace(/scale\([^)]+\)/, '').trim()
          toolversTool.style.transform = `${transformValue} scale(${input.value[0]})`
        } else {
          toolversTool.style.transform = `scale(${input.value[0]})`
        }

        handlePosition(input, toolversTool)
      }
    }

    if (input.type === 'color' && input.property === 'color') {
      // Apply the color to the element
      if (input.value && input.value.hex) {
        el.style.color = input.value.hex
      } else if (typeof input.value === 'string') {
        // In case the color is stored as a hex string
        el.style.color = input.value
      }
    }
    if (input.type === 'color' && input.property === 'backgroundColor') {
      // Apply the color to the element
      if (input.value && input.value.hex) {
        el.style.backgroundColor = input.value.hex
      } else if (typeof input.value === 'string') {
        // In case the color is stored as a hex string
        el.style.backgroundColor = input.value
      }
    }
  }
}

function handlePosition(input: any, toolversTool: HTMLElement) {
  console.log(input)

  const parentRect = parentRef.value.getBoundingClientRect()
  const widgetRect = toolversTool.getBoundingClientRect()

  let newTopPercent: number | null = null
  let newLeftPercent: number | null = null
  let transformValue = toolversTool.style.transform || ''

  if (transformValue) {
    transformValue = transformValue.replace(/translate\([^)]+\)/, '').trim()
    toolversTool.style.transform = `${transformValue} translate(-50%, -50%)`

    if (input.value === 'top-left' || toolversTool.dataset.position === 'top-left') {
      toolversTool.dataset.position = `top-left`
      toolversTool.style.transformOrigin = 'top left'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }
    if (input.value === 'top' || toolversTool.dataset.position === 'top') {
      toolversTool.dataset.position = `top`
      toolversTool.style.transformOrigin = 'top center'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = (parentRect.width / 2 / parentRect.width) * 100
    }
    if (input.value === 'top-right' || toolversTool.dataset.position === 'top-right') {
      toolversTool.dataset.position = `top-right`
      toolversTool.style.transformOrigin = 'top right'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'center-left' || toolversTool.dataset.position === 'center-left') {
      toolversTool.dataset.position = `center-left`
      toolversTool.style.transformOrigin = 'center left'
      newTopPercent = (parentRect.height / 2 / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'center-right' || toolversTool.dataset.position === 'center-right') {
      toolversTool.dataset.position = `center-right`
      toolversTool.style.transformOrigin = 'center right'
      newTopPercent = (parentRect.height / 2 / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'bottom-left' || toolversTool.dataset.position === 'bottom-left') {
      toolversTool.dataset.position = `bottom-left`
      toolversTool.style.transformOrigin = 'bottom left'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }
    if (input.value === 'bottom' || toolversTool.dataset.position === 'bottom') {
      toolversTool.dataset.position = `bottom`
      toolversTool.style.transformOrigin = 'bottom center'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = (parentRect.width / 2 / parentRect.width) * 100
    }
    if (input.value === 'bottom-right' || toolversTool.dataset.position === 'bottom-right') {
      toolversTool.dataset.position = `bottom-right`
      toolversTool.style.transformOrigin = 'bottom right'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }
  } else {
    toolversTool.style.transform = `translate(-50%, -50%)`

    if (input.value === 'top-left' || toolversTool.dataset.position === 'top-left') {
      toolversTool.dataset.position = `top-left`
      toolversTool.style.transformOrigin = 'top left'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }
    if (input.value === 'top' || toolversTool.dataset.position === 'top') {
      toolversTool.dataset.position = `top`
      toolversTool.style.transformOrigin = 'top center'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = (parentRect.width / 2 / parentRect.width) * 100
    }
    if (input.value === 'top-right' || toolversTool.dataset.position === 'top-right') {
      toolversTool.dataset.position = `top-right`
      toolversTool.style.transformOrigin = 'top right'
      newTopPercent = ((0 + widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'center-left' || toolversTool.dataset.position === 'center-left') {
      toolversTool.dataset.position = `center-left`
      toolversTool.style.transformOrigin = 'center left'
      newTopPercent = (parentRect.height / 2 / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'center-right' || toolversTool.dataset.position === 'center-right') {
      toolversTool.dataset.position = `center-right`
      toolversTool.style.transformOrigin = 'center right'
      newTopPercent = (parentRect.height / 2 / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }

    if (input.value === 'bottom-left' || toolversTool.dataset.position === 'bottom-left') {
      toolversTool.dataset.position = `bottom-left`
      toolversTool.style.transformOrigin = 'bottom left'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((0 + widgetRect.width / 2) / parentRect.width) * 100
    }
    if (input.value === 'bottom' || toolversTool.dataset.position === 'bottom') {
      toolversTool.dataset.position = `bottom`
      toolversTool.style.transformOrigin = 'bottom center'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = (parentRect.width / 2 / parentRect.width) * 100
    }
    if (input.value === 'bottom-right' || toolversTool.dataset.position === 'bottom-right') {
      toolversTool.dataset.position = `bottom-right`
      toolversTool.style.transformOrigin = 'bottom right'
      newTopPercent = ((parentRect.height - widgetRect.height / 2) / parentRect.height) * 100
      newLeftPercent = ((parentRect.width - widgetRect.width / 2) / parentRect.width) * 100
    }
  }
}
</script>

<template>
  <div class="toolvers-tool">
    <div class="relative" v-html="widget ?? ''"></div>
  </div>
</template>
