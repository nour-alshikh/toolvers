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
import { useSwitchInputHandler } from '@/composables/useSwitchInputHandler'
import { usePositionInputHandler } from '@/composables/usePositionInputHandler'
import Switch from '@/components/ui/switch/Switch.vue'

import { icons } from '@/icons'
import ar from '@/locales/ar.ts'
import { useToolPositionStore } from '@/store/toolPosition'
const { handleTextInputChange } = useTextInputHandler()
const { handleColorChange } = useColorHandler()
const { handleRangeNumberInput } = useRangeNumberInputHandler()
const { handleSwitchChange } = useSwitchInputHandler()
const { handlePositionChange } = usePositionInputHandler()

const toolPositionStore = useToolPositionStore()

const handleFreeMove = (inputItem: ToolInputGroup) => {
  if (toolPositionStore.screen === 'desktop') {
    toolPositionStore.freeDesktopPosition = !toolPositionStore.freeDesktopPosition
  } else if (toolPositionStore.screen === 'mobile') {
    toolPositionStore.freeMobilePosition = !toolPositionStore.freeMobilePosition
  }

  if (toolPositionStore.freeDesktopPosition) {
    inputItem.default = '';
  }
  if (toolPositionStore.freeMobilePosition) {
    inputItem.default = '';
  }
}
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
              class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[11px] font-normal leading-[15px] tracking-[-0.16px]"
              for="color-input "
            >
              {{ ar[inputItem.name] }}
            </Label>

            <Input
              class="flex-1 p-4 h-auto text-right"
              placeholder=""
              v-model="inputItem.default"
              @input="handleTextInputChange"
              :data-id="inputItem.id"
              :data-property="inputItem.property"
            />
          </div>

          <!-- Color input -->
          <div v-if="inputItem.type === 'color'">
            <ColorInput
              @updateColor="(newColor) => handleColorChange(newColor, inputItem)"
              :label="inputItem.name"
              :color="{ hex: String(inputItem.default) }"
            />
          </div>

          <!-- Range input -->
          <div v-if="inputItem.type === 'range'" class="relative flex gap-3 flex-1">
            <Slider
              :model-value="[Number(inputItem.default) || 0]"
              @update:model-value="
                (val) => {
                  inputItem.default = Number(val[0])
                  handleRangeNumberInput(inputItem)
                }
              "
              :min="Number(inputItem.min) || 12"
              :max="Number(inputItem.max) || 24"
              :step="Number(inputItem.step) || 1"
              :data-id="inputItem.id"
              :property="inputItem.property"
            />
            <div class="relative">
              <Label
                class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[11px] font-normal leading-[15px] tracking-[-0.16px]"
                for="color-input"
              >
                {{ ar[inputItem.name] }}
              </Label>

              <Input
                class="py-4 px-2 min-w-[85px] h-auto text-right"
                type="number"
                placeholder=""
                :min="Number(inputItem.min) || 12"
                :max="Number(inputItem.max) || 24"
                :step="Number(inputItem.step) || 1"
                v-model="inputItem.default"
                :data-id="inputItem.id"
                @input="handleRangeNumberInput(inputItem)"
                @change="handleRangeNumberInput(inputItem)"
              />
            </div>
          </div>

          <!-- Number input -->
          <div v-if="inputItem.type === 'number'" class="relative flex gap-3 flex-1">
            <div class="relative">
              <Label
                class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[11px] font-normal leading-[15px] tracking-[-0.16px]"
                for="color-input"
              >
                {{ ar[inputItem.name] }}
              </Label>

              <Input
                class="p-4 h-auto text-right"
                type="number"
                placeholder=""
                v-model="inputItem.default"
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
                <ImageTab
                  v-model="inputItem.default"
                  :data-id="inputItem.id"
                  :data-property="inputItem.property"
                />
              </TabsContent>
              <TabsContent value="icon">
                <IconTab />
              </TabsContent>
            </Tabs>
          </div>

          <!-- Switch input -->
          <div
            v-if="inputItem.type === 'switch'"
            class="relative flex justify-center items-center gap-3 w-full h-full"
          >
            <Label :for="inputItem.id">
              {{ ar[inputItem.name] }}
            </Label>
            <Switch
              :id="inputItem.id"
              ThumbClass="data-[state=checked]:translate-x-4"
              :model-value="inputItem.default === 'on'"
              @update:model-value="(newState) => handleSwitchChange(inputItem, newState)"
            />
          </div>

          <!-- Position input -->
          <div v-if="inputItem.type === 'position'" class="relative w-1/2 m-auto">
            <div class="grid grid-cols-3 grid-rows-3 gap-2">
              <div
                @click="handlePositionChange(inputItem, 'top-left')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'top-left' ? 'bg-primary/10 ' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>
              <div
                @click="handlePositionChange(inputItem, 'top')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'top' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div> 
              <div
                @click="handlePositionChange(inputItem, 'top-right')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'top-right' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>

              <div
                @click="handlePositionChange(inputItem, 'center-left')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'center-left' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>
              <div></div>
              <div
                @click="handlePositionChange(inputItem, 'center-right')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'center-right' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>
              <div
                @click="handlePositionChange(inputItem, 'bottom-left')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'bottom-left' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>
              <div
                @click="handlePositionChange(inputItem, 'bottom')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'bottom' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>
              <div
                @click="handlePositionChange(inputItem, 'bottom-right')"
                class="col-span-1 row-span-1 bg-neutral-100 w-[50px] h-[50px] rounded-lg"
                :class="[inputItem.default === 'bottom-right' ? 'bg-primary/10' : '', toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition ? 'cursor-not-allowed' : 'cursor-pointer']"
              ></div>

              <div class="col-span-3 row-span-3">
                <Button
                  @click="handleFreeMove(inputItem)"
                  class="border border-primary rounded-lg flex items-center gap-2 bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out"
                >
                  التحكم الحر في مكان الاشعار
                  <img :src="icons.freeMove" alt="" />
                </Button>
              </div>
            </div>
          </div>

          <div v-if="inputItem.type === 'repeater'">
            
            <div v-for="input in inputItem.inputs" :key="input.name">
              <div v-if="input.type === 'text'">
                <Label
                  class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[11px] font-normal leading-[15px] tracking-[-0.16px]"
                  for="color-input "
                >
                  {{ ar[input.name] }}
                </Label>

                <Input
                  class="flex-1 p-4 h-auto text-right"
                  placeholder=""
                  v-model="input.default"
                  @input="handleTextInputChange"
                  :data-id="input.id"
                  :data-property="input.property"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Transition>
  </Collapsible>
</template>

<style>
button[data-state='active'] {
  background-color: #f0dae3;
  color: #be185d;
}

.top {
  top: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  position: absolute !important;
}

.top-left {
  top: 0 !important;
  left: 0 !important;
  position: absolute !important;
}

.top-right {
  top: 0 !important;
  left: 100% !important;
  transform: translateX(-100%) !important;
  position: absolute !important;
}
.bottom {
  top: 100% !important;
  left: 50% !important;
  transform: translate(-50%, -100%) !important;
  position: absolute !important;
}

.bottom-left {
  top: 100% !important;
  left: 0 !important;
  transform: translateY(-100%) !important;
  position: absolute !important;
}

.bottom-right {
  top: 100% !important;
  left: 100% !important;
  transform: translate(-100%, -100%) !important;
  position: absolute !important;
}

.center-left {
  top: 50% !important;
  left: 0 !important;
  transform: translateY(-50%) !important;
  position: absolute !important;
}

.center-right {
  top: 50% !important;
  left: 100% !important;
  transform: translate(-100%, -50%) !important;
  position: absolute !important;
}
</style>
