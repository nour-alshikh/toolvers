<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import ColorInput from '@/views/components/ColorInput.vue'
import ImageTab from './imageTabs/ImageTab.vue'
import IconTab from './imageTabs/IconTab.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'

import type { ToolInputGroup } from '@/types'

import { useTextInputHandler } from '@/composables/useTextInputHandler'
import { useColorHandler } from '@/composables/useColorInputHandler'
import { useRangeNumberInputHandler } from '@/composables/useRangeNumberInputHandler'

const { handleTextInputChange } = useTextInputHandler()
const { handleColorChange } = useColorHandler()
const { handleRangeNumberInput } = useRangeNumberInputHandler()

const props = defineProps<{
  inputs: ToolInputGroup[]
}>()
</script>

<template>
  <Collapsible
    v-for="input in inputs"
    :key="input.title"
    class="bg-secondaryBackground mb-2 rounded-lg p-2"
    v-model:open="input.isOpen"
  >
    <CollapsibleTrigger
      class="cursor-pointer p-4 flex items-center justify-between flex-row-reverse bg-background rounded-lg w-full"
    >
      {{ input?.title }}
      <img :class="!input.isOpen ? 'rotate-180' : ''" src="@/assets/images/ArrowUp.svg" alt="" />
    </CollapsibleTrigger>

    <!-- Add transition -->
    <Transition
      enter-active-class="transition-all duration-100 ease-in-out"
      leave-active-class="transition-all duration-100 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <CollapsibleContent
        v-show="input.isOpen"
        class="overflow-hidden px-3 py-3 flex flex-wrap gap-x-4"
        :class="input.class"
      >
        <div
          v-for="inputItem in input.inputs"
          :key="inputItem.label"
          class="relative"
          :class="inputItem.class"
        >
          <!-- Text input -->
          <div v-if="inputItem.type === 'text'">
            <Label
              class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
              for="color-input "
            >
              {{ inputItem.label }}
            </Label>

            <Input
              class="flex-1 p-4 h-auto text-right"
              placeholder=""
              v-model="inputItem.default_value"
              @input="handleTextInputChange"
              :data-id="inputItem.id"
              :data-property="inputItem.property"
            />
          </div>

          <!-- Color input -->
          <div v-if="inputItem.type === 'color'" class="mt-5 relative">
            <ColorInput
              @updateColor="(newColor) => handleColorChange(newColor, inputItem)"
              :label="inputItem.label"
              :color="{ hex: String(inputItem.default_value) }"
            />
          </div>

          <!-- Range input -->
          <div v-if="inputItem.type === 'range'" class="mt-5 relative flex gap-3 flex-1">
            <Slider
              :model-value="[Number(inputItem.default_value) || 0]"
              @update:model-value="
                (val) => {
                  inputItem.default_value = Number(val[0])
                  handleRangeNumberInput(inputItem)
                }
              "
              :min="Number(inputItem.min) || 12"
              :max="Number(inputItem.max) || 24"
              :step="Number(inputItem.step) || 1"
              :data-id="inputItem.id"
              :property="inputItem.property"
            />
            <div class="relative max-w-[70px]">
              <Label
                class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
                for="color-input"
              >
                {{ inputItem.label }}
              </Label>

              <Input
                class="p-4 h-12 text-right"
                type="number"
                placeholder=""
                :min="Number(inputItem.min) || 12"
                :max="Number(inputItem.max) || 24"
                :step="Number(inputItem.step) || 1"
                v-model="inputItem.default_value"
                :data-id="inputItem.id"
                @input="handleRangeNumberInput(inputItem)"
                @change="handleRangeNumberInput(inputItem)"
              />
            </div>
          </div>

          <!-- Number input -->
          <div v-if="inputItem.type === 'number'" class="mt-5 relative flex gap-3 flex-1">
            <div class="relative max-w-[70px]">
              <Label
                class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
                for="color-input"
              >
                {{ inputItem.label }}
              </Label>

              <Input
                class="p-4 h-12 text-right"
                type="number"
                placeholder=""
                v-model="inputItem.default_value"
                :data-id="inputItem.id"
              />
            </div>
          </div>

          <!-- Image input -->
          <div v-if="inputItem.type === 'image'" class="relative w-full">
            <Tabs default-value="image" class="flex flex-col items-center justify-center">
              <TabsList
                class="grid w-fit grid-cols-2 bg-[#FDF5F8] rounded-lg border border-[#F0F0F0]"
              >
                <TabsTrigger value="image" class="border-none"> صورة </TabsTrigger>
                <TabsTrigger value="icon" class="border-none"> رمز </TabsTrigger>
              </TabsList>

              <TabsContent value="image">
                <ImageTab />
              </TabsContent>
              <TabsContent value="icon">
                <IconTab />
              </TabsContent>
            </Tabs>
          </div>

          <div v-if="inputItem.type === 'display-pages'">
            <Tabs default-value="all" class="flex flex-col items-end justify-center">
              <TabsList
                class="flex w-fit m-auto justify-center items-center bg-[#FDF5F8] rounded-lg border border-[#F0F0F0] lg:py-[10px] py-1 px-1"
              >
                <TabsTrigger value="selected" class="border-none"> تخصيص </TabsTrigger>
                <TabsTrigger value="all" class="border-none"> صفحات المتجر </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <AllTab />
              </TabsContent>

              <TabsContent value="selected">
                <SelectedTab />
              </TabsContent>
            </Tabs>
          </div>

          <div v-if="inputItem.type === 'display-settings'" class="relative flex gap-2 w-full">
            <div
              class="flex items-center justify-between space-x-2 border rounded-lg py-3 px-3 flex-1"
            >
              <Label for="display-mobile" class="text-primary"> عرض على الجوال</Label>
              <Switch id="display-mobile" />
            </div>
            <div
              class="flex items-center justify-between space-x-2 border rounded-lg py-3 px-3 flex-1"
            >
              <Label for="display-desktop" class="text-primary"> عرض على سطح المكتب</Label>
              <Switch id="display-desktop" />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Transition>
  </Collapsible>
</template>

<style scoped>
button[data-state='active'] {
  background-color: #f0dae3;
  color: #be185d;
}
</style>
