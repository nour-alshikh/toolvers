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

const toolContainer = ref<HTMLElement | null>(null)

const toolPositionStore = useToolPositionStore()

const { primary, black, edit, showSettings, backArrow, eye } = icons

const router = useRouter()

const tab = ref<'edit' | 'preview' | 'display'>('edit')

const toolsStore = useToolsStore()
const { toolDetails, toolValues, tool, mainInputs, desktopInputs, mobileInputs } =
  storeToRefs(toolsStore)

const toolId = router.currentRoute.value.params.id
const userToolId = router.currentRoute.value.params.userId

onMounted(async () => {
  if (toolId && userToolId) {
    await toolsStore.getToolDetailsAndValues(Number(toolId), Number(userToolId))

    const toolInputs = toolDetails.value
    const main = mainInputs.value
    const desktop = desktopInputs.value
    const mobile = mobileInputs.value

    toolInputs?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default = toolValues.value[inputItem.name]
      })
    })

    main?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default = toolValues.value[inputItem.name]
      })
    })

    desktop?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default = toolValues.value[inputItem.name]
      })
    })
    mobile?.forEach((input: ToolInputGroup) => {
      input.inputs.forEach((inputItem: ToolInputField) => {
        inputItem.default = toolValues.value[inputItem.name]
      })
    })
  } else if (toolId && !userToolId) {
    await toolsStore.getToolDetails(Number(toolId))
  }
})

const toggleScreen = async () => {
  toolPositionStore.screen = toolPositionStore.screen === 'desktop' ? 'mobile' : 'desktop'
  setTimeout(() => {
    handleParentResize()
  }, 350)
}

const saveTool = async () => {
  const form = new FormData()

  form.append('name', 'whatsapp')

  const toolInputs = toolDetails.value
  const main = mainInputs.value
  const desktop = desktopInputs.value
  const mobile = mobileInputs.value

  toolInputs?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default))
    })
  })

  main?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default))
    })
  })

  desktop?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default))
    })
  })

  mobile?.forEach((input: ToolInputGroup) => {
    input.inputs.forEach((inputItem: ToolInputField) => {
      form.append(inputItem.name, String(inputItem.default))
    })
  })

  toolsStore.displayInputs.forEach((input: any) => {
    input.inputs.forEach((inputItem: any) => {
      if (inputItem.type === 'display-pages') {
        form.append(`view[${inputItem.name}]`, String(inputItem.default))
        form.append(`view[urls]`, JSON.stringify(inputItem.urls))
        form.append(`view[pages]`, JSON.stringify(inputItem.pages))
      } else {
        form.append(`view[${inputItem.name}]`, String(inputItem.default))
      }
    })
  })
  
  
  const rect = toolContainer.value.getBoundingClientRect()

  const positionTopDesktop = (toolPositionStore.desktopPosition.x*100) / rect.width
  const positionLeftDesktop = (toolPositionStore.desktopPosition.y*100) / rect.height
  
  const positionTopMobile = (toolPositionStore.mobilePosition.x*100) / 375
  const positionLeftMobile = (toolPositionStore.mobilePosition.y*100) / 667


  form.append('view[position-top-desktop]', String( Math.round(positionTopDesktop)))
  form.append('view[position-left-desktop]', String(Math.round(positionLeftDesktop)))
  form.append('view[position-top-mobile]', String( Math.round(positionTopMobile)))
  form.append('view[position-left-mobile]', String(Math.round(positionLeftMobile)))

  if (toolDetails && toolId && !userToolId) {
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
  toolDetails.value?.forEach((group: any) => inputs.push(...group.inputs))
  mainInputs.value?.forEach((group: any) => inputs.push(...group.inputs))
  desktopInputs.value?.forEach((group: any) => inputs.push(...group.inputs))
  return inputs
})

watch(
  allInputs,
  (inputs) => {
    inputs.forEach((inputItem: ToolInputField) => {
      watch(
        () => inputItem.default,
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
            updatePositionElement(String(inputItem.default))
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

// runs continuously while dragging
const onDragging = ({ x, y }: { x: number; y: number }) => {
  if (!toolContainer.value) return

  const toolversWidget = document.querySelector('.toolvers-widget')

  const rect = toolContainer.value.getBoundingClientRect()
  const width = rect.width
 
  if (x > width / 2) {
    toolversWidget?.classList.remove('flex-row-reverse')
    toolversWidget?.classList.add('flex-row')
  } else {
    toolversWidget?.classList.remove('flex-row')
    toolversWidget?.classList.add('flex-row-reverse')
  }
  console.log(x, y)

  const position = {
    x,
    y,
  }

  if (toolPositionStore.screen === 'desktop') {
    toolPositionStore.desktopPosition = position
  } else {
    toolPositionStore.mobilePosition = position
  }
}

// runs once after drag stops
const onDragStop = ({ x, y }: { x: number; y: number }) => {
  const positionInPercent = {
    x,
    y,
  }
  if (toolPositionStore.screen === 'desktop') {
    toolPositionStore.desktopPosition = positionInPercent
  } else {
    toolPositionStore.mobilePosition = positionInPercent
  }
}

const resizeKey = ref(0)

const handleParentResize = () => {
  resizeKey.value += 1
}
</script>

<template>
  <DefaultLayout>
    <Loading v-if="toolsStore.isLoading" />

    <div class="grid grid-cols-6">
      <div class="col-span-6"></div>
      <div class="col-span-4"></div>
      <div class="col-span-2"></div>
    </div>
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
                  toolPositionStore.screen === 'mobile'
                    ? 'before:border-b-primary'
                    : 'before:border-b-transparent'
                "
                @click="toggleScreen"
              >
                <img
                  :src="toolPositionStore.screen === 'mobile' ? primary.mobile : black.mobile"
                  alt=""
                />
              </div>

              <div
                class="relative before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-0 before:-translate-x-1/2 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-primary cursor-pointer"
                :class="
                  toolPositionStore.screen === 'desktop'
                    ? 'before:border-b-primary'
                    : 'before:border-b-transparent'
                "
                @click="toggleScreen"
              >
                <img
                  :src="toolPositionStore.screen === 'desktop' ? primary.desktop : black.desktop"
                  alt=""
                />
              </div>
            </div>

            <TabsContent value="edit">
              <InputCollapsible :inputs="toolDetails ?? []" />
            </TabsContent>
            <TabsContent value="display">
              <DesktopInputs
                v-if="toolPositionStore.screen === 'desktop'"
                :main-inputs="mainInputs ?? []"
                :desktop-inputs="desktopInputs ?? []"
              />
              <MobileInputs
                v-else
                :mobile-inputs="mobileInputs ?? []"
                :main-inputs="mainInputs ?? []"
              />

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
            ref="toolContainer"
            class="mt-4 sticky top-[100px] transition-all duration-300"
            :class="
              toolPositionStore.screen === 'desktop'
                ? 'w-[1370px] h-[700px]'
                : 'w-[375px] h-[667px] m-auto'
            "
          >
            <div class="w-full h-full absolute opacity-40 border border-red-400">
              <iframe width="100%" height="100%" frameborder="0"> </iframe>
            </div>

            <vue3-draggable-resizable
              v-if="tool"
              :key="resizeKey"
              @dragging="onDragging"
              @dragstop="onDragStop"
              :class-name-dragging="'my-dragging-class'"
              :resizable="false"
              :draggable="
                toolPositionStore.freeDesktopPosition || toolPositionStore.freeMobilePosition
              "
              :parent="true"
              :x="
                toolPositionStore.screen === 'desktop'
                  ? toolPositionStore.desktopPosition.x
                  : toolPositionStore.mobilePosition.x
              "
              :y="
                toolPositionStore.screen === 'desktop'
                  ? toolPositionStore.desktopPosition.y
                  : toolPositionStore.mobilePosition.y
              "
            >
              <WidgetComponent :widget="tool ?? ''" />
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
