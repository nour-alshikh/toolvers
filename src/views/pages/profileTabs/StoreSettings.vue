<script setup lang="ts">
import ColorInput from '@/views/components/ColorInput.vue'
import { ref } from 'vue'

interface ColorObject {
    hex: string
    hsv: { h: number, s: number, v: number }
    rgba: { r: number, g: number, b: number, a: number }
}
const color = ref<ColorObject>({
    hex: "#504F7F",
    hsv: {h: 241, s: 0.38, v: 0.5},
    rgba: {r: 80, g: 79, b: 127, a: 1}
})
</script>

<template>
      <div class="border flex-1 flex flex-col gap-4 rounded-lg p-4">
    <p class="text-black text-right font-[Almarai] text-[20px] not-italic font-normal leading-normal capitalize">
        الوان متجرك
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <ColorInput label="لون الخلفية" :color="color" />
    <ColorInput label="لون الخلفية" :color="color" />
    <ColorInput label="لون الخلفية" :color="color" />
    <ColorInput label="لون الخلفية" :color="color" />
  
    </div>
    </div>
</template>
