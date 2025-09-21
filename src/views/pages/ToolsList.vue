<script setup lang="ts">
    import DefaultLayout from '@/layouts/DefaultLayout.vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
    import { Button } from "@/components/ui/button"
    import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    } from "@/components/ui/hover-card"
    import { ref } from 'vue'
    import widgetImage from '@/assets/images/widget.png'

    const widget = ref(widgetImage)
</script>

<template>
    <DefaultLayout>
        <div class="bg-secondaryBackground px-4 py-6 lg:px-8 lg:py-6 rounded-lg">
            <div>
                <h1 class="mb-6 text-xl">
                     العناصر
                </h1>
            </div>
            <div class="mb-6">
                 <swiper
                    class=""
                    loop
               
                    :space-between="8"
                    :speed="400"
                    :autoplay="true"
                    >
                    <swiper-slide v-for="tool in Array(12)" :key="tool" class="!w-fit">
                        <div class=" px-6 py-4 text-center rounded-xl bg-[#F6F4F5] text-gray-500">
                            إشعارات
                        </div>  
                    </swiper-slide>
                </swiper>
            </div>
            <div class="p-4 rounded-lg  bg-background grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
                <div v-for="tool in Array(12)" :key="tool" class="bg-secondaryBackground flex flex-col items-center justify-center p-4 rounded-lg">
                        <div class="bg-background flex items-center justify-center p-2 rounded-lg w-full "> 
                            <img class="w-80" :src="widget" alt="">
                        </div>
                        <div class="flex items-center gap-3 mt-3">
                            <p class="text-center mb-0 text-base font-bold text-[#32232A]" >اسم الاشعار</p>

                            <HoverCard >
                                <HoverCardTrigger as-child >
                                <Button class="p-0" variant="link">
                                    <QuestionMarkCircleIcon class="!size-5 shrink-0 text-primary p-0" />
                                </Button>
                                </HoverCardTrigger>
                                <HoverCardContent class="w-64 border border-red-500">
                                <div class="flex justify-between space-x-4 ">
                                <p class="leading-tight">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur laudantium odit, quasi at debitis architecto.</p>
                                </div>
                                </HoverCardContent>
                            </HoverCard>
                            
                        </div>
                </div>
             
            </div>
        </div>
    </DefaultLayout>
</template>