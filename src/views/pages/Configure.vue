<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, provide, ref } from 'vue'
import { useRouter } from 'vue-router'

import InputCollapsible from './configureTabs/InputCollapsible.vue'
import DesktopInputs from './configureTabs/DesktopInputs.vue'
import MobileInputs from './configureTabs/MobileInputs.vue'
import WidgetComponent from './configureTabs/WidgetComponent.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { icons } from '@/icons'

const { primary, black, edit, showSettings } = icons

const router = useRouter()

const screen = ref('mobile')
const tab = ref('edit')

onMounted(() => {
  const toolId = router.currentRoute.value.params.id
  // get tool data from api
})

const inputs: any = ref([
  {
    title: 'العنوان',
    isOpen: true,
    class: 'grid grid-cols-2 gap-x-4',
    inputs: [
      {
        label: 'نسبة الخصم',
        type: 'text',
        value: '!خصم 35%',
        id: 'title',
        class: 'col-span-2',
      },
      {
        label: 'لون النص',
        type: 'color',
        value: {
          hex: '#f00',
        },
        property: 'color',
        id: 'title',
        class: 'col-span-1',
      },
      {
        label: 'لون الخلفية',
        type: 'color',
        value: {
          hex: '#f00',
        },
        property: 'backgroundColor',
        id: 'title',
        class: 'col-span-1',
      },
      {
        label: 'حجم النص',
        type: 'number',
        value: '16',
        property: 'fontSize',
        id: 'title',
        class: 'col-span-2',
      },
    ],
  },
  {
    title: 'الوصف',
    isOpen: true,
    class: 'grid grid-cols-2 gap-x-4',
    inputs: [
      {
        label: 'العنوان الفرعي',
        type: 'text',
        value: 'قسيمة تخفيضات سارية لمدة ٤٨ ساعة !',
        id: 'subtitle',
        class: 'col-span-2',
      },
      {
        label: 'لون النص',
        type: 'color',
        value: {
          hex: '#f00',
        },
        property: 'color',
        id: 'subtitle',
        class: 'col-span-1',
      },
      {
        label: 'حجم النص',
        type: 'number',
        value: '16',
        property: 'fontSize',
        id: 'subtitle',
        class: 'col-span-1',
      },
    ],
  },
  {
    title: 'الرموز التعبيرية',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    inputs: [
      {
        label: 'رمز التعبير',
        type: 'image',
        id: 'icon',
        class: 'col-span-1',
      },
    ],
  },
])

provide('inputs', inputs)

const MobileDisplayInputs: any = ref([
  {
    title: 'مكان العرض',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    inputs: [
      {
        type: 'select-position',
        value: 'top',
        id: 'position',
        class: 'col-span-1',
      },
      {
        label: 'حجم الاشعار',
        type: 'number',
        value: '0.5',
        min: '0.5',
        max: '1',
        step: '0.1',
        property: 'scale',
        id: 'dialog',
        class: 'col-span-2',
      },
    ],
  },
  {
    title: 'اسم الاشعار',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    inputs: [
      {
        type: 'text',
        value: 'اشعار',
        id: 'title',
        class: 'col-span-1',
      },
    ],
  },
  {
    title: 'لون الخلفية ',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    inputs: [
      {
        type: 'color',
        value: {
          hex: '#f00',
        },
        id: 'dialog',
        property: 'backgroundColor',
        class: 'col-span-1',
      },
    ],
  },{
    title: 'مدة العرض',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    inputs: [
    {
        label: 'مدة العرض ',
        type: 'number',
        value: '16',
        property: 'fontSize',
        id: 'title',
        class: 'col-span-2',
      },
    {
        label: 'مدة التأخير',
        type: 'number',
        value: '16',
        property: 'fontSize',
        id: 'title',
        class: 'col-span-2',
      },
    {
        label: 'عدد مرات الظهور',
        type: 'number',
        value: '16',
        property: 'fontSize',
        id: 'title',
        class: 'col-span-2',
      },
    ]
  },
  {
    title: 'صفحات العرض',
    isOpen: true,
    class: 'grid grid-cols-1 gap-x-4',
    type: 'pages',
    inputs: [
      {
        type: 'select-pages',
        value: 'all',
        id: 'pages',
        class: 'col-span-1',
      },
    ],
  },
])

provide('MobileDisplayInputs', MobileDisplayInputs)

const DesktopDisplayInputs: any = ref([
  {
    title: 'مكان العرض',
    isOpen: true,
    class: 'grid grid-cols-2 gap-x-4',
    inputs: [
      {
        type: 'select-position',
        value: 'top',
        id: 'position',
        class: 'col-span-1',
      },
    ],
  },
])

provide('DesktopDisplayInputs', DesktopDisplayInputs)
</script>

<template>
  <DefaultLayout>
    <div class="py-3">
      <div class="flex flex-col lg:flex-row gap-3">
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
                @click="screen = 'mobile'"
              >
                <img :src="screen === 'mobile' ? primary.mobile : black.mobile" alt="" />
              </div>

              <div
                class="relative before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:w-0 before:h-0 before:-translate-x-1/2 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-primary cursor-pointer"
                :class="
                  screen === 'desktop' ? 'before:border-b-primary' : 'before:border-b-transparent'
                "
                @click="screen = 'desktop'"
              >
                <img :src="screen === 'desktop' ? primary.desktop : black.desktop" alt="" />
              </div>
            </div>

            <TabsContent value="edit">
              <InputCollapsible />
            </TabsContent>
            <TabsContent value="display">
              <DesktopInputs v-if="screen === 'desktop'" />
              <MobileInputs v-else />
            </TabsContent>
          </Tabs>
        </div>
        <div
          class="flex-1 rounded-lg border border-dashed border-[#E4D0D8] h-[calc(100vh-140px)] overflow-y-hidden sticky top-[140px]"
        >
          <WidgetComponent />
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
