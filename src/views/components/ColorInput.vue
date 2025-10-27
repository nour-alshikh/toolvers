<script setup lang="ts">
import { ref, watch } from "vue"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "vue-color-kit"
import "vue-color-kit/dist/vue-color-kit.css"
import type { PropType } from "vue"
import ar from '@/locales/ar.ts'

type ColorObject = {
  hex: string
  hsv?: { h: number; s: number; v: number }
  rgba?: { r: number; g: number; b: number; a: number }
}

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  color: {
    type: Object as PropType<ColorObject>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: "updateColor", value: ColorObject): void
}>()

// Local state
const colorInput = ref<ColorObject>({ ...props.color })

// Watch for external color updates
watch(
  () => props.color,
  (newColor) => {
    colorInput.value = { ...newColor }
  },
  { deep: true }
)

// Trigger parent update only when color picker changes
const changeColor = (newColor: ColorObject) => {
  colorInput.value = { ...newColor }
  emit("updateColor", colorInput.value)
}

// Optional: allow user to manually type in input but not emit until valid
const handleManualInput = () => {
  // Only update local model (no emit)
  // You could add hex validation here if needed
  colorInput.value.hex = colorInput.value.hex.trim()
}
</script>
<template>
  <div class="grid gap-2 mb-2">
    <div class="flex items-center flex-row-reverse gap-2">
      <Popover class="w-fit">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="min-w-6 w-6 h-6 p-0 rounded-full outline outline-[#AEA2A7] outline-offset-2"
            style="outline-width: 1px;"
            :style="{ backgroundColor: colorInput.hex }"
          />
        </PopoverTrigger>

        <PopoverContent class="p-0 w-fit">
          <ColorPicker
            theme="light"
            :color="colorInput.hex"
            @changeColor="changeColor"
          />
        </PopoverContent>
      </Popover>

      <div class="relative flex-1">
        <Label
          class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[11px] font-normal leading-[15px] tracking-[-0.16px]"
          for="color-input"
        >
          {{ ar[props.label] }}
        </Label>

        <Input
          id="color-input"
          v-model="colorInput.hex"
          class="flex-1 p-4 h-auto text-right"
          placeholder="#000000"
          @input="handleManualInput"
        />
      </div>
    </div>
  </div>
</template>
