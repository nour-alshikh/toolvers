<script setup lang="ts">
import { useToolPositionStore } from '@/store/toolPosition';

import { ref, onMounted, onUpdated, nextTick } from 'vue'

defineProps({
  widget: {
    type: String,
    required: false,
  },
})

const toolPositionStore = useToolPositionStore()
// reference to the wrapper div
const wrapperRef = ref(null)
const getScale = () => {
  if (wrapperRef.value) {
    const style = window.getComputedStyle(wrapperRef.value)
    const transform = style.transform

    if (transform && transform !== 'none') {
      // Example: "matrix(0.8, 0, 0, 0.8, 0, 0)"
      const match = transform.match(/^matrix\(([^,]+), [^,]+, [^,]+, ([^,]+),/)
      if (match) {
        const scaleX = parseFloat(match[1])
        const scaleY = parseFloat(match[2])
        console.log('ScaleX:', scaleX, 'ScaleY:', scaleY)
        return { scaleX, scaleY }
      }
    }

    console.log('No scale transform found')
    return { scaleX: 1, scaleY: 1 }
  }
}
const getDimensions = () => {
  if (wrapperRef.value) {
    const { offsetWidth, offsetHeight } = wrapperRef.value


    const { scaleX, scaleY } = getScale()
    const widthPercentage = (offsetWidth / 1370) * 100
    const heightPercentage = (offsetHeight / 700) * 100

    toolPositionStore.toolWidth.value = widthPercentage
    toolPositionStore.toolHeight.value = heightPercentage
  }
}

// on mount
onMounted(async () => {
  await nextTick()
  getDimensions()
})

// on DOM updates
onUpdated(async () => {
  await nextTick()
  getDimensions()
})
</script>

<template>
  <div class="toolvers-tool">
    <div class="relative" v-html="widget ?? ''" ref="wrapperRef"></div>
  </div>
</template>
