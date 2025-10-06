
<script setup lang="ts">

import ArrowLeftIcon from '@/views/icons/ArrowLeftIcon.vue'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Button from '@/components/ui/button/Button.vue';

import { icons } from '@/icons';

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 [direction:rtl]">
        <!-- First Package -->
        <div class="rounded-lg border">
            <div class="flex flex-row items-center justify-between  px-4 pt-4">
                <div class="size-14 rounded-lg bg-[#F8F7F7] flex justify-center items-center">
                <img :src="icons.rocket" alt="">
                </div>
                <div class="text-[#4E4146] text-xl pl-11 font-bold relative before:content-['/اسبوع'] before:absolute before:left-0 before:top-[65%]  before:text-xs before:text-[#A07F8D]">
                    ريال
                </div>
            </div>
            <div class="mt-4  px-4">
                <p class="text-[#261F22] text-right font-almarai text-[22px] not-italic font-bold leading-[28.072px] tracking-[-0.264px]"
                >
                    الباقة المجانية
                </p>
                <p class="text-[#65535A] text-right font-almarai text-[14px] not-italic font-normal leading-[21.054px]"
                >
                    استمتع بكل الاشعارات مجانا لمدة أسبوع !
                </p>
            </div>          
            <div class="mt-4  px-4">
                
                <AlertDialog>
                        <AlertDialogTrigger as-child>
                        <Button variant="outline" class="rounded-lg w-full text-primary border-primary font-bold px-6 py-2 hover:bg-primary hover:text-white group">
                            الاشعارات المتاحة
                            <ArrowLeftIcon  class="group-hover:stroke-white stroke-primary group-hover:transition" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                       
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>
            <hr class="my-4" />  
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                    ظهور غير محدود
                </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                إحصائيات وتقارير مفصلة
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                الإشعارات الضمنية الذكية
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                تصميم التنبيهات بسهولة وفق هوية متجرك
            </p>
            </div>
        </div>
        <!-- Second Package -->
        <div class="rounded-lg border">
            <div class="flex flex-row items-center justify-between  px-4 pt-4">
                <div class="size-14 rounded-lg bg-[#F8F7F7] flex justify-center items-center">
                <img :src="icons.rocket" alt="">
                </div>
                <div class="text-[#4E4146] text-xl pl-11 font-bold relative before:content-['/اسبوع'] before:absolute before:left-0 before:top-[65%]  before:text-xs before:text-[#A07F8D]">
                    ريال
                </div>
            </div>
            <div class="mt-4  px-4">
                <p class="text-[#261F22] text-right font-almarai text-[22px] not-italic font-bold leading-[28.072px] tracking-[-0.264px]"
                >
                    الباقة المجانية
                </p>
                <p class="text-[#65535A] text-right font-almarai text-[14px] not-italic font-normal leading-[21.054px]"
                >
                    استمتع بكل الاشعارات مجانا لمدة أسبوع !
                </p>
            </div>          
            <div class="mt-4  px-4">
                
                <AlertDialog>
                        <AlertDialogTrigger as-child>
                        <Button variant="outline" class="rounded-lg w-full text-primary border-primary font-bold px-6 py-2 hover:bg-primary hover:text-white group">
                            الاشعارات المتاحة
                            <ArrowLeftIcon  class="group-hover:stroke-white stroke-primary group-hover:transition" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                       
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>
            <hr class="my-4" />  
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                    ظهور غير محدود
                </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                إحصائيات وتقارير مفصلة
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                الإشعارات الضمنية الذكية
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                تصميم التنبيهات بسهولة وفق هوية متجرك
            </p>
            </div>
        </div>
        <!-- Third Package -->
        <div class="rounded-lg border">
            <div class="flex flex-row items-center justify-between  px-4 pt-4">
                <div class="size-14 rounded-lg bg-pink-50 flex justify-center items-center">
               <img :src="icons.stack" alt="">
                </div>
                <div class="text-[#4E4146] text-xl pl-11 font-bold relative before:content-['/اسبوع'] before:absolute before:left-0 before:top-[65%]  before:text-xs before:text-[#A07F8D]">
                    ريال
                </div>
            </div>
            <div class="mt-4  px-4">
                <p class="text-[#261F22] text-right font-almarai text-[22px] not-italic font-bold leading-[28.072px] tracking-[-0.264px]"
                >
                    الباقة المجانية
                </p>
                <p class="text-[#65535A] text-right font-almarai text-[14px] not-italic font-normal leading-[21.054px]"
                >
                    استمتع بكل الاشعارات مجانا لمدة أسبوع !
                </p>
            </div>          
            <div class="mt-4  px-4">
                
                <AlertDialog>
                        <AlertDialogTrigger as-child>
                        <Button  class="rounded-lg w-full text-white bg-primary border-primary font-bold px-6 py-2 hover:bg-white hover:text-primary group">
                            الاشعارات المتاحة
                            <ArrowLeftIcon  class="group-hover:stroke-primary stroke-white group-hover:transition" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                       
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>
            <hr class="my-4" />  
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                    ظهور غير محدود
                </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                إحصائيات وتقارير مفصلة
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                الإشعارات الضمنية الذكية
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                تصميم التنبيهات بسهولة وفق هوية متجرك
            </p>
            </div>
        </div>
        <!-- Fourth Package -->
        <div class="rounded-lg border">
            <div class="flex flex-row items-center justify-between  px-4 pt-4">
                <div class="size-14 rounded-lg bg-[#F8F7F7] flex justify-center items-center">
                <img :src="icons.rocket" alt="">
                </div>
                <div class="text-[#4E4146] text-xl pl-11 font-bold relative before:content-['/اسبوع'] before:absolute before:left-0 before:top-[65%]  before:text-xs before:text-[#A07F8D]">
                    ريال
                </div>
            </div>
            <div class="mt-4  px-4">
                <p class="text-[#261F22] text-right font-almarai text-[22px] not-italic font-bold leading-[28.072px] tracking-[-0.264px]"
                >
                    الباقة المجانية
                </p>
                <p class="text-[#65535A] text-right font-almarai text-[14px] not-italic font-normal leading-[21.054px]"
                >
                    استمتع بكل الاشعارات مجانا لمدة أسبوع !
                </p>
            </div>          
            <div class="mt-4  px-4">
                
                <AlertDialog>
                        <AlertDialogTrigger as-child>
                        <Button variant="outline" class="rounded-lg w-full text-primary border-primary font-bold px-6 py-2 hover:bg-primary hover:text-white group">
                            الاشعارات المتاحة
                            <ArrowLeftIcon  class="group-hover:stroke-white stroke-primary group-hover:transition" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                       
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>
            <hr class="my-4" />  
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                    ظهور غير محدود
                </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                إحصائيات وتقارير مفصلة
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                الإشعارات الضمنية الذكية
            </p>
            </div>
            <div class="flex items-center gap-2 mb-2 px-4 py-1">

                <div class="flex  bg-[#E7F5E8] items-center justify-center size-8 rounded-full">
                    <img :src="icons.check" alt="">
                </div>
                <p class="text-[#3A2F34] text-right w-fit  text-[14px] not-italic font-normal leading-[21px]"
                >
                تصميم التنبيهات بسهولة وفق هوية متجرك
            </p>
            </div>
        </div>
    </div>
</template>