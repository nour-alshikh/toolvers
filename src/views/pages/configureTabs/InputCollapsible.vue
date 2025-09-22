<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { defineProps } from 'vue'

import ColorInput from '@/views/components/ColorInput.vue'

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
const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
})

const isOpen = ref(true)
</script>

<template>
  <Collapsible class="bg-secondaryBackground mb-2 rounded-lg p-2" v-model:open="isOpen">
    <CollapsibleTrigger
      class="cursor-pointer p-4 flex items-center justify-between flex-row-reverse bg-background rounded-lg mb-2 w-full"
    >
      {{ props.input.title }}
      <img :class="!isOpen ? 'rotate-180' : ''" src="@/assets/images/ArrowUp.svg" alt="" />
    </CollapsibleTrigger>

    <!-- Add transition -->
    <Transition
      enter-active-class="transition-all duration-300 ease-in-out"
      leave-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <CollapsibleContent v-show="isOpen" class="overflow-hidden px-6 py-3">
        <div v-for="input in props.input.inputs" :key="input.label" class="relative w-full">
          <div v-if="input.type === 'text'">
            <Label
              class="text-[#AEA2A7] absolute top-0 right-2 -translate-y-1/2 bg-secondaryBackground px-2 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
              for="color-input "
            >
              {{ input.label }}
            </Label>

            <!-- Hex input -->
            <Input class="flex-1 p-4 h-12 text-right" placeholder="" v-model="input.value" />
          </div>
          <div v-if="input.type === 'color'">
            <ColorInput :label="input.label" :color="color" />
          </div>
          <div v-if="input.type === 'number'">
            <Label
              class="text-[#AEA2A7] absolute top-0 right-2 -translate-y-1/2 bg-secondaryBackground px-2 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
              for="color-input "
            >
              {{ input.label }}
            </Label>

            <!-- Hex input -->
            <Input class="flex-1 p-4 h-12 text-right" type="number" placeholder="" v-model="input.value" />
            <Input class="flex-1 p-4 h-12 text-right" placeholder="" min="0" max="24" step="1" v-model="input.value" type="range" onchange="console.log(this.value)" />
          </div>
        </div>
      </CollapsibleContent>
    </Transition>
  </Collapsible>
</template>
