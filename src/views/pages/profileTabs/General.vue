<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { icons } from '@/icons'
import Button from '@/components/ui/button/Button.vue'
const userImage = ref(
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
)
</script>

<template>
  <div class="flex flex-col lg:flex-row-reverse gap-4">
    <div class="border flex-1 flex flex-col gap-4 rounded-lg p-4">
      <div class="flex items-center flex-row-reverse gap-2">
        <div class="bg-gray-300 size-24 rounded-full flex justify-center items-center">
          <div
            class="size-20 rounded-full overflow-hidden bg-white flex justify-center items-center"
          >
            <img :src="userImage" class="size-16 rounded-full" alt="" />
          </div>
        </div>
        <div>
          <p class="text-black text-base mb-2 font-bold text-right">Demo</p>
          <p
            class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal text-right"
          >
            عميل جديد
          </p>
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
      <div
        class="flex items-end gap-2 flex-row-reverse justify-between bg-[#FAFAFA] rounded-lg p-4"
      >
        <div>
          <p class="text-black text-xs font-bold">كلمة المرور</p>
          <p class="text-[#9C9196] text-xs font-normal">**********</p>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button
                variant="outline"
                class="rounded-full text-primary border-primary font-bold px-6 py-2 hover:bg-primary hover:text-white"
              >
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
                  <Label class="text-right block mb-2 w-full" for="password_confirmation"
                    >تاكيد كلمة المرور</Label
                  >
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
            <img :src="icons.salla" alt="">
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
        <p class="text-[#9C9196] text-xs font-normal">https://salla.sa/dev-h7okhzlogqi3jl71</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">الحالة</p>
        <p class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal">نشط</p>
      </div>
    </div>
  </div>
</template>
