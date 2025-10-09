<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import InputCollapsible from './configureTabs/InputCollapsible.vue'
import DesktopInputs from './configureTabs/DesktopInputs.vue'
import MobileInputs from './configureTabs/MobileInputs.vue'
import WidgetComponent from './configureTabs/WidgetComponent.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { icons } from '@/icons'
import { useToolsStore } from '@/store/tool'
import type { ToolDetails } from '@/types'

const { primary, black, edit, showSettings } = icons

const router = useRouter()

const screen = ref('desktop')
const tab = ref('edit')

const toolDetails = ref<ToolDetails | null>()

onMounted(async () => {
  const toolId = router.currentRoute.value.params.id
  toolDetails.value = await useToolsStore().getToolDetails(Number(toolId))
})

const toggleScreen = () => {
  screen.value = screen.value === 'desktop' ? 'mobile' : 'desktop'
}
</script>

<template>
  <DefaultLayout>
    <div class="py-3">
      <div class="flex flex-col lg:flex-row gap-3 relative">
        <div class="w-[470px]">
          <Tabs v-model="tab">
            <TabsList class="grid w-full grid-cols-2 bg-secondaryBackground px-8 py-3">
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
              <InputCollapsible :inputs="toolDetails?.tool.inputs ?? []" />
            </TabsContent>
            <TabsContent value="display">
              <DesktopInputs v-if="screen === 'desktop'" />
              <MobileInputs v-else />
            </TabsContent>
          </Tabs>
        </div>
        <div class="relative flex-1">
          <div
            class="flex-1 rounded-lg border border-dashed border-[#E4D0D8] h-[calc(100vh-140px)] overflow-y-hidden transition-all duration-300 ease-in-out"
            :class="
              screen === 'desktop'
                ? 'w-[calc(100vw-550px)] fixed top-[130px] left-3 '
                : 'w-[390px] sticky top-[130px] mx-auto'
            "
          >
            <div class="w-full h-full absolute opacity-40">
              <iframe
                src="http://localhost:3000/dashboard"
                width="100%"
                height="100%"
                frameborder="0"
              >
              </iframe>
            </div>
            <WidgetComponent :widget="toolDetails?.rendered_html ?? ''" :screen="screen" />
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
</style>
