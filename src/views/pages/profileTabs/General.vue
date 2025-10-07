<script setup lang="ts">
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
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'
import AuthLoading from '@/views/components/AuthLoading.vue'

const authData   = useAuthStore()

const user =  authData?.user
const salla_store = user?.salla_store

const email = user?.email
const has_active_salla_subscription = user?.has_active_salla_subscription
const name = user?.name

const avatar = salla_store?.avatar
const domain = salla_store?.domain
const merchant_id = salla_store?.merchant_id
const salla_id = salla_store?.salla_id
const merchant_name = salla_store?.merchant_name

const formData = ref({
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
})

</script>

<template>
  <div class="flex flex-col lg:flex-row-reverse gap-4">
    <div class="border flex-1 flex flex-col gap-4 rounded-lg p-4">
      <div class="flex items-center flex-row-reverse gap-2">
        <div class="bg-gray-300 size-24 rounded-full flex justify-center items-center">
          <div
            class="size-20 rounded-full overflow-hidden bg-white flex justify-center items-center"
          >
            <img :src="avatar" class="size-16 rounded-full" alt="" />
          </div>
        </div>
        <div>
          <p class="text-black text-base mb-2 font-bold text-right">{{ name }}</p>
          <p
            class="text-[#239600] bg-[#E2FFD9] rounded-full px-4 py-1 text-xs font-normal text-right"
          >
            عميل جديد
          </p>
        </div>
      </div>

      <!-- api? -->
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">رقم الحساب</p>
        <p class="text-[#9C9196] text-xs font-normal">ID-3</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">البريد الالكتروني</p>
        <p class="text-[#9C9196] text-xs font-normal">{{ email }}</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <!-- api? -->
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
              <form @submit.prevent="authData.changePassword(formData)">
                <AlertDialogHeader>
                  <div class="space-y-1 my-2">
                    <Label class="text-right block mb-2 w-full" for="password"
                      >كلمة المرور الحالية</Label
                    >
                    <Input v-model="formData.current_password" id="password" />
                    <div v-if="authData.errors && authData.errors.current_password">
                      <span class="text-red-500 text-xs"  v-for="error in authData.errors.current_password">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="space-y-1 my-2">
                    <Label class="text-right block mb-2 w-full" for="new_password"
                      >كلمة المرور الجديدة</Label
                    >
                    <Input v-model="formData.new_password" id="new_password" />
                    <div v-if="authData.errors && authData.errors.new_password">
                      <span class="text-red-500 text-xs"  v-for="error in authData.errors.new_password">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="space-y-1 my-2">
                    <Label class="text-right block mb-2 w-full" for="new_password_confirmation"
                      >تاكيد كلمة المرور</Label
                    >
                    <Input v-model="formData.new_password_confirmation" id="new_password_confirmation" />
                    <div v-if="authData.errors && authData.errors.new_password_confirmation">
                      <span class="text-red-500 text-xs"  v-for="error in authData.errors.new_password_confirmation">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>الغاء</AlertDialogCancel>
                  <button
                    type="submit"
                    class="bg-primary relative hover:bg-primary/90 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100"
                    :disabled="authData.isLoading"
                  >
                    <span v-if="!authData.isLoading">تأكيد  </span>
                    <AuthLoading v-else />
                  </button>
                </AlertDialogFooter>
              </form>
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
            <img :src="icons.salla" alt="" />
            <div>
              <p class="text-black text-xs text-right font-bold">متجر سلة</p>
              <p class="text-[#9C9196] text-xs text-right font-normal">{{ merchant_name }}</p>
            </div>
          </div>
        </div>
        <div>
          <Switch />
        </div>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">رقم المتجر</p>
        <p class="text-[#9C9196] text-xs font-normal">{{ salla_id }}</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">رقم التاجر</p>
        <p class="text-[#9C9196] text-xs font-normal">{{ merchant_id }}</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">النطاق</p>
        <p class="text-[#9C9196] text-xs font-normal">{{ domain }}</p>
      </div>
      <div class="flex items-end gap-2 flex-col bg-[#FAFAFA] rounded-lg p-4">
        <p class="text-black text-xs font-bold">الحالة</p>
        <p
          class="rounded-full px-4 py-1 text-xs font-normal"
          :class="
            has_active_salla_subscription
              ? 'text-[#239600] bg-[#E2FFD9] '
              : 'text-[#960500] bg-[#E2FFD9] '
          "
        >
          {{ has_active_salla_subscription ? 'نشط' : 'غير نشط' }}
        </p>
      </div>
    </div>
  </div>
</template>
