<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useToolsStore } from '@/store/tool'
import ToolListItem from './ToolListItem.vue'
import { Skeleton } from '@/components/ui/skeleton'

const toolData = useToolsStore()


import type { Tool } from '@/types' 

const selectedToolType = ref<Tool[] | null>([])
const allTools = ref<Tool[] | null>([])

onMounted(async () => {
  const tools = await toolData.getTools()
  selectedToolType.value = tools
  allTools.value = tools
})


const breakpoints = {
  640: { slidesPerView: 3, spaceBetween: 10 },
  992: { slidesPerView: 7, spaceBetween: 12 },
  1280: { slidesPerView: 12, spaceBetween: 20 },
}

const hanleToolTypes = (toolType: string) => {
    if (!selectedToolType.value) return
    if (!allTools.value) return
    if (toolType === 'all') {
    selectedToolType.value = allTools.value
    return
  }
  selectedToolType.value = allTools.value?.filter(
    (tool) => tool.type === toolType
  )
}
</script>

<template>
  <DefaultLayout>
    <div class="bg-secondaryBackground px-4 py-6 lg:px-8 rounded-lg">
      <!-- Header -->
      <h1 class="mb-6 text-xl">العناصر</h1>

      <!-- Tools Types Swiper -->
      <template v-if="toolData.isLoading">
        <swiper :loop="true" :speed="400" :autoplay="true" :breakpoints="breakpoints" class="mb-6">
          <swiper-slide v-for="n in 15" :key="n">
            <div class="px-6 py-4 rounded-xl bg-[#F6F4F5]">
              <Skeleton class="w-full h-8 bg-[#F6F4F5]" />
            </div>
          </swiper-slide>
        </swiper>
      </template>

      <template v-else>
        <swiper
          class="mb-6"
          loop
          :breakpoints="{
            '640': { slidesPerView: 3, spaceBetween: 10 },
            '992': { slidesPerView: 7, spaceBetween: 12 },
            '1280': { slidesPerView: 11, spaceBetween: 20 },
          }"
          :speed="400"
          :autoplay="true"
        >
          <swiper-slide >
            <div class="px-2 py-4 rounded-xl transition-colors duration-150 bg-[#F6F4F5] hover:bg-[#ebe8e9] text-gray-500 flex justify-center items-center cursor-pointer" @click="hanleToolTypes('all')">
              الكل
            </div>
          </swiper-slide>
          <swiper-slide v-for="toolType in toolData.toolsTypes" :key="toolType">
            <div class="px-2 py-4 rounded-xl transition-colors duration-150 bg-[#F6F4F5] hover:bg-[#ebe8e9] text-gray-500 flex justify-center items-center cursor-pointer" @click="hanleToolTypes(toolType)">
              {{ toolType }}
            </div>
          </swiper-slide>
        </swiper>
      </template>

      <!-- Tools List -->
      <div
        class="p-4 rounded-lg bg-background grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <template v-if="toolData.isLoading">
          <div
            v-for="n in 12"
            :key="n"
            class="bg-secondaryBackground flex flex-col items-center p-4 rounded-lg"
          >
            <Skeleton class="h-60 w-full bg-background" />
            <Skeleton class="h-10 w-full mt-3 bg-background" />
          </div>
        </template>

        <template v-else>
          <ToolListItem v-for="tool in selectedToolType" :key="tool.id" :tool="tool" />
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>
