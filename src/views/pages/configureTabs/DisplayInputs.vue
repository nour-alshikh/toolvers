<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { useTextInputHandler } from '@/composables/useTextInputHandler'

import { useSwitchInputHandler } from '@/composables/useSwitchInputHandler'
import Switch from '@/components/ui/switch/Switch.vue'

import { useToolsStore } from '@/store/tool'
import AllTab from './displayPagesTabs/AllTab.vue'
import SelectedTab from './displayPagesTabs/SelectedTab.vue'

const { handleTextInputChange } = useTextInputHandler()

const { handleSwitchChange } = useSwitchInputHandler()

const toolsStore = useToolsStore()

const inputs = toolsStore.displayInputs

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

          <!-- Number input -->

          <div v-else-if="inputItem.type === 'number'" class="relative flex gap-3 flex-1">
            <div class="relative">
              <Label
                class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
                for="color-input"
              >
                {{ inputItem.label }}
              </Label>

              <Input
                class="p-4 h-auto text-right"
                type="number"
                placeholder=""
                v-model="inputItem.default_value"
                :data-id="inputItem.id"
              />
            </div>
          </div>

          <!-- Switch input -->

          <div
            v-else-if="inputItem.type === 'switch'"
            class="relative flex justify-center items-center gap-3 w-full h-full"
          >
            <Label :for="inputItem.id">
              {{ inputItem.label }}
            </Label>
            <Switch
              :id="inputItem.id"
              ThumbClass="data-[state=checked]:translate-x-4"
              :model-value="inputItem.default_value === 'on'"
              @update:model-value="(newState) => handleSwitchChange(inputItem, newState)"
            />
          </div>

          <div v-else-if="inputItem.type === 'display-pages'">


             <div class="flex flex-col items-end justify-center">
              <div
                class="flex w-fit m-auto justify-center items-center bg-[#FDF5F8] rounded-lg border border-[#F0F0F0] lg:py-[10px] py-1 px-1"
              >
                <button
                  @click="inputItem.default_value = 'except';"
                  :class="[
                    'px-4 py-2 rounded-md transition-colors',
                    inputItem.default_value === 'except' || inputItem.default_value === 'false'
                      ? 'bg-[#F0DAE3] text-[#BE185D] shadow-sm'
                      : 'bg-transparent',
                  ]"
                >
                  تخصيص
                </button>
                <button
                  @click="inputItem.default_value = 'true';"
                  :class="[
                    'px-4 py-2 rounded-md transition-colors',
                    inputItem.default_value === 'true' ? 'bg-[#F0DAE3] text-[#BE185D] shadow-sm' : 'bg-transparent',
                  ]"
                >
                  صفحات المتجر
                </button>
              </div>

            </div>
            
              <div class="mt-4">
                <AllTab  v-model:pages="inputItem.pages" v-if="inputItem.default_value === 'true'" />
                <SelectedTab :urls="inputItem.urls" :default_value="inputItem.default_value" @update:default_value="inputItem.default_value = $event" v-else />
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
