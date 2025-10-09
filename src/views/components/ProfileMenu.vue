<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuthStore } from '@/store/auth'
import { icons } from '@/icons'

const authData = useAuthStore()

const {name , email} = authData?.user ?? {}

</script>

<template>
  <DropdownMenu class="min-w-fit">
    <DropdownMenuTrigger as-child class="p-2 justify-between min-w-fit">
      <Button variant="outline" class="rounded-full h-10 w-20 bg-background text-[#7C5968] border-none">
       
        <img :src="icons.headerArrowDown" alt="">
        <div class="bg-secondaryBackground size-8 flex items-center justify-center rounded-full">
            <img :src="icons.person" alt="">
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48 min-w-fit  p-2">
    <div class="bg-[#F6F4F5] rounded-lg p-2 flex flex-col items-center justify-center min-w-fit" >
      <div class="mb-2 bg-gray-200 rounded-full inset-2">
          <img src="" class="size-8 rounded-full" alt="">
        </div>
        <div>
            <p class="text-[#231F21] text-base font-medium text-center">مرحبا بعودتك ,{{ name }}</p>
            <p class="text-[#7B6E73] text-sm font-normal text-center">{{ email }}</p>
        </div>
    </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="justify-end p-0">
          <RouterLink class="flex items-center py-2 hover:bg-[#F6F4F5] gap-3 justify-end w-full h-full rounded-lg" to="/profile">
             ادارة الحساب
            <img :src="icons.profile" alt="">
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="justify-end p-0">
          <RouterLink class="flex items-center py-2 hover:bg-[#F6F4F5] gap-3 justify-end w-full h-full rounded-lg" to="/contact">
            اتصل بنا
            <img :src="icons.phone" alt="">
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="justify-end p-0">
          <button @click="authData.logout" class="flex items-center py-2 hover:bg-[#F6F4F5] gap-3 justify-end w-full h-full rounded-lg">
            تسجيل الخروج
            <img :src="icons.logout" alt="">
          </button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
