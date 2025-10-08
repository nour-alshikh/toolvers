<script setup lang="ts">
import { ref, watch } from "vue"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "vue-color-kit"
import "vue-color-kit/dist/vue-color-kit.css"
import type { PropType } from "vue"

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
  (e: 'updateColor', value: ColorObject): void
}>()

// Reactive color model (clone from props)
const colorInput = ref<ColorObject>({ ...props.color })

// Sync when parent updates color prop
watch(
  () => props.color,
  (newColor) => {
    colorInput.value = { ...newColor }
  },
  { deep: true }
)

const changeColor = (newColor: ColorObject) => {
  colorInput.value = { ...newColor }
  emit('updateColor', colorInput.value)
}
</script>

<template>
  <div class="grid gap-2 mb-8">
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
          class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
          for="color-input"
        >
          {{ props.label }}
        </Label>

        <Input
          id="color-input"
          v-model="colorInput.hex"
          class="flex-1 p-4 h-12 text-right"
          placeholder="#000000"
        />
      </div>
    </div>
  </div>
</template>
