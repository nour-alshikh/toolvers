<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Button from '@/components/ui/button/Button.vue';
const userImage = ref('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')
</script>

<template>
        <div class="flex flex-col lg:flex-row-reverse gap-4">
            <div class="border flex-1 flex flex-col gap-4 rounded-lg p-4">


              <div class="flex items-center flex-row-reverse  gap-2">
                <div class="bg-gray-300 size-24 rounded-full flex justify-center items-center">
                  <div class="size-20 rounded-full overflow-hidden bg-white flex justify-center items-center" >
                    <img :src="userImage" class="size-16 rounded-full" alt="">
                  </div>
                </div>
                <div>
                  <p class="text-black text-base mb-2 font-bold text-right" >Demo</p>
                  <p class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal text-right">عميل جديد</p>
                </div>
              </div>

              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">رقم الحساب</p>
                <p class="text-[#9C9196] text-xs font-normal">ID-3</p>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">البريد الالكتروني</p>
                <p class="text-[#9C9196] text-xs font-normal">h7okhzlogqi3jl71@email.partners</p>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">رقم الهاتف</p>
                <p class="text-[#9C9196] text-xs font-normal">+966500000000</p>
              </div>
              <div class="flex items-end gap-2 flex-row-reverse justify-between bg-[#FAFAFA] rounded-lg p-4">
                <div>

                    <p class="text-black text-xs font-bold">كلمة المرور</p>
                    <p class="text-[#9C9196] text-xs font-normal">**********</p>
                </div>
                <div>

                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                        <Button variant="outline" class="rounded-full text-primary border-primary font-bold px-6 py-2 hover:bg-primary hover:text-white">
                            تغيير
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <div class="space-y-1">
                                <Label class="text-right block mb-2 w-full" for="password">كلمة المرور</Label>
                                <Input id="password" />
                            </div>
                            <div class="space-y-1">
                                <Label class="text-right block mb-2 w-full" for="password_confirmation">تاكيد كلمة المرور</Label>
                                <Input id="password_confirmation" />
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              </div>
            </div>
            <div class="border flex-1 flex flex-col gap-4 rounded-lg p-4">
              <p class="text-black text-right text-xl font-normal">تكامل سلة</p>
              <div class="flex items-center flex-row-reverse justify-between">
                <div>
                  <div class="flex items-center flex-row-reverse gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="37"
                      viewBox="0 0 45 37"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_397_6320)">
                        <mask
                          id="mask0_397_6320"
                          style="mask-type: luminance"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="45"
                          height="37"
                        >
                          <path d="M44.4005 0H0.5V37H44.4005V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_397_6320)">
                          <path
                            d="M44.3048 26.2808L42.1662 8.44039C41.5909 3.63711 37.5107 0.0136719 32.6755 0.0136719H12.2495C7.41432 0.0136719 3.33425 3.63711 2.75896 8.44039L0.622578 26.2808C0.297512 28.9944 1.14983 31.7235 2.96339 33.7676C4.77471 35.8131 7.38136 36.9845 10.1132 36.9845H34.8141C37.5438 36.9845 40.1503 35.8131 41.964 33.7676C43.7754 31.7241 44.6298 28.9949 44.3048 26.2808ZM38.4464 30.6671C37.4756 31.7616 36.1362 32.3636 34.6762 32.3636H10.2517C8.78944 32.3636 7.44951 31.7616 6.48158 30.6671C5.51084 29.5729 5.07408 28.1711 5.24721 26.7185L7.35958 9.07811C7.66287 6.54681 9.81434 4.63476 12.364 4.63476H32.5616C35.1109 4.63476 37.2628 6.54623 37.5662 9.07811L39.6808 26.7185C39.8538 28.1711 39.4144 29.5729 38.4464 30.6671Z"
                            fill="#004956"
                          />
                          <path
                            d="M34.7354 20.8045C34.3991 20.2888 33.8826 19.9349 33.2805 19.8081C32.6772 19.6812 32.0629 19.7969 31.5473 20.1328C25.3974 24.1464 19.4121 24.1458 13.2504 20.1323C12.7349 19.7963 12.1188 19.6807 11.5173 19.8087C10.9152 19.936 10.3991 20.2904 10.0634 20.8062C9.72775 21.3222 9.61269 21.938 9.74003 22.5406C9.86737 23.1431 10.2215 23.6595 10.737 23.9954C14.5875 26.5038 18.5129 27.7753 22.4041 27.7753C26.2961 27.7753 30.2186 26.5033 34.0636 23.9943C34.579 23.6578 34.9327 23.1409 35.0593 22.5384C35.1867 21.9364 35.0717 21.3205 34.7354 20.8045Z"
                            fill="#004956"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_397_6320">
                          <rect width="44" height="37" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <p class="text-black text-xs text-right font-bold">متجر سلة</p>
                      <p class="text-[#9C9196] text-xs text-right font-normal">متجر تجريبي</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Switch />
                </div>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">رقم المتجر</p>
                <p class="text-[#9C9196] text-xs font-normal">1755478421</p>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">رقم التاجر</p>
                <p class="text-[#9C9196] text-xs font-normal">602664048</p>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">النطاق</p>
                <p class="text-[#9C9196] text-xs font-normal">
                  https://salla.sa/dev-h7okhzlogqi3jl71
                </p>
              </div>
              <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
                <p class="text-black text-xs font-bold">الحالة</p>
                <p class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal">
                  نشط
                </p>
              </div>
            </div>
          </div>
</template>