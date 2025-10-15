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

</script>

<template>
  <div class="toolvers-tool">
    <div class="relative" v-html="widget ?? ''"></div>
  </div>
</template>
