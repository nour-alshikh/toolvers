<script setup lang="ts">
import { inject, ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ColorInput from '@/views/components/ColorInput.vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { icons } from '@/icons'
function handleFileSelect(e: any) {
  const files = e.target.files
  if (files.length > 0) {
    const file = files[0]
    if (validateFile(file)) {
      // saveImage(file);
    }
  }
  e.target.value = ''
}

const validateFile = (file: File) => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    console.warn('Invalid file type:', file.type)
    return false
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    console.warn('File too large:', file.size)
    return false
  }

  return true
}

// Handle color change updates
const handleColorChange = (newColor: any, inputItem: any) => {
  // Update the input value with the new color
  inputItem.value = newColor;

}


interface InputItem {
  label: string
  type: string
  value: string
  id: string
  property?: string
  isOpen?: boolean
  title?: string
  inputs?: InputItem[]
  class?: string
}

const MobileDisplayInputs: InputItem[] | undefined = inject('MobileDisplayInputs')
</script>

<template>
  
  <Collapsible
    v-for="input in MobileDisplayInputs"
    :key="input.title"
    :input="input"
    class="bg-secondaryBackground mb-2 rounded-lg p-2"
    v-model:open="input.isOpen"
  >
    <CollapsibleTrigger
      class="cursor-pointer p-4 flex items-center justify-between flex-row-reverse bg-background rounded-lg mb-2 w-full"
    >
      {{ input?.title }}
      <img :class="!input.isOpen ? 'rotate-180' : ''" src="@/assets/images/ArrowUp.svg" alt="" />
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
      <CollapsibleContent v-show="input.isOpen" class="overflow-hidden px-3 py-3 flex flex-wrap gap-x-4 " :class="input.class">
        <div v-for="inputItem in input.inputs" :key="inputItem.label" class="relative" :class="inputItem.class">
          <!-- Text input -->
          <div v-if="inputItem.type === 'text'">
            <Label
              class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
              for="color-input "
            >
              {{ inputItem.label }}
            </Label>

            <!-- Hex input -->
            <Input
              class="flex-1 p-4 h-12 text-right"
              placeholder=""
              v-model="inputItem.value"
              :data-id="inputItem.id"
            />
          </div>

          <!-- Color input -->
          <div v-if="inputItem.type === 'color'" class="mt-5 relative ">
            <ColorInput
              @updateColor="(newColor) => handleColorChange(newColor, inputItem)"
              :label="inputItem.label"
              :color="inputItem.value"
            />
          </div>

          <!-- Number input -->
          <div v-if="inputItem.type === 'number'" class="mt-5 relative flex gap-3  flex-1">
            <Input
          class="flex-1 p-4 h-12 text-right border-none shadow-none  "
          placeholder=""
          min="0.5"
          max="1"
          step="0.1"
          v-model="inputItem.value"
          type="range"
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
            v-model="inputItem.value"
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
                <div
                  class="rounded-lg w-full flex flex-col items-center justify-center cursor-pointer relative border border-dashed border-black/20 lg:py-6 lg:px-4 py-4 px-2"
                >
                  <img :src="icons.download" alt="" />
                  <p
                    class="text-[rgba(0,0,0,0.87)] mt-2 text-[14px] font-normal leading-[175%] tracking-[0.15px] text-center"
                  >
                    قم بسحب وأفلات الوسائط هنا أو اضغط للرفع
                  </p>
                  <p
                    class="text-[#909090] mt-2 text-center text-[13px] font-normal leading-[130%] tracking-[0.17px]"
                  >
                    يدعم ملفات JPEG و JPG و PNG و GIF و WEBP بحجم أقصى 5MB
                  </p>
                  <Button
                    class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out"
                  >
                    رفع الوسائط
                    <img :src="icons.arrowUpDownload" alt="" />
                  </Button>
                  <Input
                    type="file"
                    @change="handleFileSelect"
                    accept="image/*"
                    class="opacity-0 absolute inset-0 cursor-pointer w-full h-full z-50"
                  />
                </div>
              </TabsContent>
              <TabsContent value="icon"> icon </TabsContent>
            </Tabs>
          </div>


          <div v-if="inputItem.type === 'select-position'" class="relative w-1/2 m-auto">
                <div class="grid grid-cols-3 grid-rows-3 gap-2">
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div >
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-1 row-span-1 bg-neutral-100  cursor-pointer w-[50px] h-[50px] rounded-lg">
                            
                        </div>
                        <div class="col-span-3 row-span-3">
                                <Button   class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out">
                                    التحكم الحر في مكان الاشعار
                                <img :src="icons.freeMove" alt="">
                                
                                </Button>
                        </div>
                </div>
          </div>
        </div>
      </CollapsibleContent>
    </Transition>
  </Collapsible>


</template>