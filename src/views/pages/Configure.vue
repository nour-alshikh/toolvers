<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import InputCollapsible from './configureTabs/InputCollapsible.vue'
import DesktopInputs from './configureTabs/DesktopInputs.vue'
import MobileInputs from './configureTabs/MobileInputs.vue'
import WidgetComponent from './configureTabs/WidgetComponent.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { icons } from '@/icons'
import { useToolsStore } from '@/store/tool'
import type { ToolInputField, ToolInputGroup } from '@/types'
import Button from '@/components/ui/button/Button.vue'
import { useToast } from 'vue-toast-notification'
import Loading from '@/views/components/Loading.vue'
import { storeToRefs } from 'pinia'

import { useTextInputHandler } from '@/composables/useTextInputHandler'
import { useColorHandler } from '@/composables/useColorInputHandler'
import { useRangeNumberInputHandler } from '@/composables/useRangeNumberInputHandler'
import { useImageHandler } from '@/composables/useImageHandler'
import { useSwitchInputHandler } from '@/composables/useSwitchInputHandler'
import DisplayInputs from './configureTabs/DisplayInputs.vue'
import { usePositionInputHandler } from '@/composables/usePositionInputHandler'
import { useToolPositionStore } from '@/store/toolPosition'

// دالة لحساب px من النسبة
const toPx = (valPercent: number, parentSize: number) => (valPercent / 100) * parentSize

const toolPositionStore = useToolPositionStore()

const widthPercentage = toolPositionStore.toolWidth.value
const heightPercentage = toolPositionStore.toolHeight.value


const desktopRef = ref()
const mobileRef = ref()
// نخزن النسب المئوية
const desktopState = ref({ x: 0, y: 0, w: widthPercentage, h: heightPercentage }) // نسب مئوية
const mobileState = ref({ x: 0, y: 0, w: 40, h: 25 })

// دالة ترجع أبعاد البارنت الحالي
const getParentBox = (screen: 'desktop' | 'mobile') => {
  const parent = screen === 'desktop' ? desktopRef.value : mobileRef.value
  return parent.getBoundingClientRect()
}
// حفظ مكان العنصر
const handleDragging = (screen: 'desktop' | 'mobile', { x, y }: { x: number; y: number }) => {
  const parentBox = getParentBox(screen)
  const xPercent = (x / parentBox.width) * 100
  const yPercent = (y / parentBox.height) * 100
  if (screen === 'desktop') {
    desktopState.value.x = xPercent
    desktopState.value.y = yPercent
  } else {
    mobileState.value.x = xPercent
    mobileState.value.y = yPercent
  }
}

const { primary, black, edit, showSettings, backArrow, eye } = icons

const router = useRouter()

const screen = ref<'desktop' | 'mobile'>('desktop')
const tab = ref<'edit' | 'preview' | 'display'>('edit')

const toolsStore = useToolsStore()
const { toolDetails, toolValues } = storeToRefs(toolsStore)

const toolId = router.currentRoute.value.params.id
const userToolId = router.currentRoute.value.params.userId

onMounted(async () => {
  if (toolId && userToolId) {
    await toolsStore.getToolDetailsAndValues(Number(toolId), Number(userToolId))
    const toolInputs = toolDetails.value?.tool?.inputs
    const mainInputs = toolDetails.value?.tool?.main_inputs
    const desktopInputs = toolDetails.value?.tool?.desktop_inputs

    toolInputs?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default_value = toolValues.value[inputItem.name]
      })
    })

    mainInputs?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default_value = toolValues.value[inputItem.name]
      })
    })

    desktopInputs?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default_value = toolValues.value[inputItem.name]
      })
    })
  } else if (toolId && !userToolId) {
    await toolsStore.getToolDetails(Number(toolId))
  }
})

const toggleScreen = () => {
  screen.value = screen.value === 'desktop' ? 'mobile' : 'desktop'
}

const saveTool = async () => {
  const form = new FormData()

  form.append('name', toolDetails.value?.tool?.name ?? '')

  const toolInputs = toolDetails.value?.tool?.inputs
  const mainInputs = toolDetails.value?.tool?.main_inputs
  const desktopInputs = toolDetails.value?.tool?.desktop_inputs

  toolInputs?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default_value))
    })
  })

  mainInputs?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default_value))
    })
  })

  desktopInputs?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default_value))
    })
  })

  toolsStore.displayInputs.forEach((input: any) => {
    input.inputs.forEach((inputItem: any) => {
      if (inputItem.type === 'display-pages') {
        form.append(`view[${inputItem.name}]`, String(inputItem.default_value))
        form.append(`view[urls]`, JSON.stringify(inputItem.urls))
        form.append(`view[pages]`, JSON.stringify(inputItem.pages))
      } else {
        form.append(`view[${inputItem.name}]`, String(inputItem.default_value))
      }
    })
  })

  // for (const [key, value] of form.entries()) {
  //   console.log(key, value)
  // }
  if (toolDetails.value?.tool?.id && toolId && !userToolId) {
    await toolsStore
      .installTool(Number(toolId), form)
      .then(() => {
        router.push('/dashboard')
      })
      .then(() => {
        const $toast = useToast()
        $toast.success('تم اضافة الاشعار بنجاح')
      })

      .catch((error) => {
        console.log(error)
      })
  } else if (toolId && userToolId) {
    await toolsStore
      .updateToolValues(Number(toolId), Number(userToolId), form)
      .then(() => {
        router.push('/dashboard')
      })
      .then(() => {
        const $toast = useToast()
        $toast.success('تم تعديل الاشعار بنجاح')
      })

      .catch((error) => {
        console.log(error)
      })
  }
}

// Get the update functions
const { updateTextElement } = useTextInputHandler()
const { updateColorChange } = useColorHandler()
const { updateRangeNumberChange } = useRangeNumberInputHandler()
const { updateImageChange } = useImageHandler()
const { updateSwitchElement } = useSwitchInputHandler()
const { updatePositionElement } = usePositionInputHandler()

const allInputs = computed(() => {
  const inputs: any[] = []
  toolDetails.value?.tool?.inputs?.forEach((group: any) => inputs.push(...group.inputs))
  toolDetails.value?.tool?.main_inputs?.forEach((group: any) => inputs.push(...group.inputs))
  toolDetails.value?.tool?.desktop_inputs?.forEach((group: any) => inputs.push(...group.inputs))
  return inputs
})

watch(
  allInputs,
  (inputs) => {
    inputs.forEach((inputItem: ToolInputField) => {
      watch(
        () => inputItem.default_value,
        (newVal) => {
          if (newVal === undefined || newVal === null) return

          if (inputItem.type === 'text') {
            updateTextElement(String(inputItem.id), String(inputItem.property), String(newVal))
          }
          if (inputItem.type === 'color') {
            updateColorChange(inputItem.id, String(inputItem.property), String(newVal))
          }
          if (inputItem.type === 'range') {
            updateRangeNumberChange(inputItem.id, String(inputItem.property), String(newVal))
          }
          if (inputItem.type === 'image') {
            updateImageChange(inputItem.id, String(inputItem.property), String(newVal))
          }
          if (inputItem.type === 'switch') {
            updateSwitchElement(inputItem.id, String(inputItem.property), String(newVal))
          }
          if (inputItem.type === 'position') {
            updatePositionElement(String(inputItem.default_value))
          }
        },
        { immediate: true },
      )
    })
  },

  { immediate: true, deep: true },
)
onUnmounted(() => {
  toolsStore.clearStore()
})
</script>

<template>
  <DefaultLayout>
    <Loading v-if="toolsStore.isLoading" />
    <div class="col-span-3"></div>
    <div class="py-3">
      <div class="flex flex-col lg:flex-row gap-3 relative">
        <div class="w-[470px]">
          <Tabs v-model="tab">
            <TabsList
              class="grid w-full grid-cols-2 bg-secondaryBackground px-8 py-3 sticky top-0 z-40"
            >
              <TabsTrigger
                class="px-4 py-2 text-[15px] flex items-center justify-between gap-2 font-bold leading-[175%] tracking-[0.15px]"
                value="display"
              >
                ضبط العرض
                <img
                  :src="tab === 'display' ? showSettings.active : showSettings.inactive"
                  alt=""
                />
              </TabsTrigger>
              <TabsTrigger
                class="px-4 py-2 text-[15px] flex items-center justify-between gap-2 font-bold leading-[175%] tracking-[0.15px]"
                value="edit"
              >
                تعديل العنصر
                <img :src="tab === 'edit' ? edit.active : edit.inactive" alt="" />
              </TabsTrigger>
            </TabsList>
            <div
              class="flex w-full mt-3 rounded-lg justify-center items-center gap-7 bg-secondaryBackground px-8 py-3"
            >
              <div
                class="relative before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-0 before:-translate-x-1/2 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-primary cursor-pointer"
                :class="
                  screen === 'mobile' ? 'before:border-b-primary' : 'before:border-b-transparent'
                "
                @click="toggleScreen"
              >
                <img :src="screen === 'mobile' ? primary.mobile : black.mobile" alt="" />
              </div>

              <div
                class="relative before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-0 before:-translate-x-1/2 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-primary cursor-pointer"
                :class="
                  screen === 'desktop' ? 'before:border-b-primary' : 'before:border-b-transparent'
                "
                @click="toggleScreen"
              >
                <img :src="screen === 'desktop' ? primary.desktop : black.desktop" alt="" />
              </div>
            </div>

            <TabsContent value="edit">
              <InputCollapsible :inputs="toolDetails?.tool?.inputs ?? []" />
            </TabsContent>
            <TabsContent value="display">
              <DesktopInputs
                v-if="screen === 'desktop'"
                :main-inputs="toolDetails?.tool.main_inputs ?? []"
                :desktop-inputs="toolDetails?.tool.desktop_inputs ?? []"
              />
              <MobileInputs v-else :main-inputs="toolDetails?.tool.main_inputs ?? []" />

              <DisplayInputs />
            </TabsContent>
          </Tabs>
        </div>
        <div class="relative flex-1">
          <div
            class="rounded-lg h-[67px] bg-secondaryBackground flex justify-between py-3 px-8 sticky top-0 z-40"
          >
            <div
              class="text-[#8F707D] font-[Almarai] text-[13px] font-normal leading-[20px] hover:underline decoration-solid decoration-auto underline-offset-auto flex gap-2 items-center cursor-pointer"
            >
              <img :src="eye" alt="" />
              معاينة على المتجر
            </div>
            <div class="flex gap-2">
              <Button
                @click="saveTool"
                class="bg-transparent border-primary border text-primary hover:bg-primary hover:text-white"
              >
                حفظ</Button
              >
              <Button class="bg-transparent border-none w-fit p-0" @click="router.back()">
                <img :src="backArrow" alt="" />
              </Button>
            </div>
          </div>

          <div
            class="mt-4 sticky top-[100px]"
            style="height: 700px; width: 1370px"
            ref="desktopRef"
          >
            <div class="w-full h-full absolute opacity-40 border border-red-400">
              <iframe width="100%" height="100%" frameborder="0"> </iframe>
            </div>
            <vue3-draggable-resizable
              :draggable="true"
              :class-name-dragging="'my-dragging-class'"
              :x="toPx(desktopState.x, 1370)"
              :y="toPx(desktopState.y, 700)"
              :w="toPx(desktopState.w, 1370)"
              :h="toPx(desktopState.h, 700)"
              :lock-aspect-ratio="true"
              :parent="true"
              @dragging="(pos) => handleDragging('desktop', pos)"
              :resizable="false"
            >
              <div>
                <WidgetComponent :widget="toolDetails?.rendered_html ?? ''" />
              </div>
            </vue3-draggable-resizable>
          </div>
        </div>
      </div>
    </div>
    
  </DefaultLayout>
</template>

<style scoped>
button[data-state='active'] {
  background-color: #f0dae3;
  color: #be185d;
}
body {
  overflow: hidden !important;
}
</style>
