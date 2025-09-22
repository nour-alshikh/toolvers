<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import InputCollapsible from './configureTabs/InputCollapsible.vue'
import DesktopInputs from './configureTabs/DesktopInputs.vue'
import MobileInputs from './configureTabs/MobileInputs.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PrimaryMobile from '@/assets/images/primary-phone.svg'
import PrimaryDesktop from '@/assets/images/primary-desktop.svg'
import BlackMobile from '@/assets/images/black-phone.svg'
import BlackDesktop from '@/assets/images/black-desktop.svg'
 
const primaryMobile = ref(PrimaryMobile)
const primaryDesktop = ref(PrimaryDesktop)
const blackMobile = ref(BlackMobile)
const blackDesktop = ref(BlackDesktop)

const router = useRouter()

const screen = ref('mobile')

onMounted(() => {
    const toolId = router.currentRoute.value.params.id
    console.log(toolId)
})

const inputs = [
{
    title: 'العنوان',
    inputs: [
        {
            label: 'نسبة الخصم',
            type: 'text',
            value: '35'
        },
        {
            label: 'لون النص',
            type: 'color',
            value: '#504F7F'
        },
            {
                label: 'حجم النص',
                type: 'number',
                value: '16'
            }
        
    ]
},
{
    title: 'الوصف',
    inputs: [
        {
            label: 'العنوان الفرعي',
            type: 'text',
            value: 'البثقبثق'
        }
    ]
}

]

</script>

<template>
  <DefaultLayout>
    <div class="py-3 px-5">
      <div class="grid grid-cols-5 gap-3">
      <div class="col-span-1">
        
          <Tabs default-value="edit">
            <TabsList class="grid w-full grid-cols-2 bg-secondaryBackground px-8 py-3">
              <TabsTrigger value="edit"> تعديل العنصر </TabsTrigger>
              <TabsTrigger value="display"> ضبط العرض </TabsTrigger>
            </TabsList>
            <div class="flex w-full mt-3 rounded-lg  justify-center items-center gap-7 bg-secondaryBackground px-8 py-3">
                
                <div  class="relative before:content-['']  before:absolute before:-bottom-3 before:left-1/2
           before:w-0 before:h-0 before:-translate-x-1/2
           before:border-l-[6px] before:border-r-[6px] before:border-b-[6px]
           before:border-l-transparent before:border-r-transparent
           before:border-b-primary cursor-pointer" :class="screen === 'mobile' ? 'before:border-b-primary' : 'before:border-b-transparent'" @click="screen = 'mobile'">

           <img :src="screen === 'mobile' ? primaryMobile : blackMobile" alt="">
                </div>
                
                   
                <div  class="relative before:content-[''] before:absolute before:-bottom-3 before:left-1/2
           before:w-0 before:h-0 before:-translate-x-1/2
           before:border-l-[6px] before:border-r-[6px] before:border-b-[6px]
           before:border-l-transparent before:border-r-transparent
           before:border-b-primary  cursor-pointer" :class="screen === 'desktop' ? 'before:border-b-primary' : 'before:border-b-transparent'" @click="screen = 'desktop'">
                 
           <img :src="screen === 'desktop' ? primaryDesktop : blackDesktop" alt="">
                </div>

            </div>
            
            <TabsContent value="edit">
             <InputCollapsible v-for="input in inputs" :key="input.title" :input="input" />
            </TabsContent>
            <TabsContent value="display">
                <DesktopInputs v-if="screen === 'desktop'" />
                <MobileInputs v-else />
            </TabsContent>
          </Tabs>
        
      </div>
      <div class="col-span-4 h-screen bg-red-500">
        
      </div>
      </div>
    </div>
  </DefaultLayout>
</template>
