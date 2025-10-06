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

import { UserIcon } from '@heroicons/vue/24/solid'
import { PhoneIcon } from '@heroicons/vue/24/solid'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/solid'

import { icons } from '@/icons'

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="p-2 justify-between ">
      <Button variant="outline" class="rounded-full h-10 w-20 bg-background text-[#7C5968] border-none">
       
        <img :src="icons.headerArrowDown" alt="">
        <div class="bg-secondaryBackground size-8 flex items-center justify-center rounded-full">
            <img :src="icons.person" alt="">
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48 p-2">
    <div class="bg-[#F6F4F5] rounded-lg p-2 flex flex-col items-center justify-center" >
      <div class="mb-2 bg-gray-200 rounded-full inset-2">
          <img src="" class="size-8 rounded-full" alt="">
        </div>
        <div>
            <p class="text-[#231F21] text-base font-medium text-center">مرحبا بعودتك ,demo</p>
            <p class="text-[#7B6E73] text-sm font-normal text-center">demo@gmail.com</p>
        </div>
    </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="justify-end px-0">
          <RouterLink class="flex items-center gap-2 justify-end" to="/profile">
             ادارة الحساب
            <UserIcon class="mr-2 h-4 w-4 shrink-0 text-primary" />
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="justify-end px-0">
          <RouterLink class="flex items-center gap-2 justify-end" to="/contact">
            اتصل بنا
            <PhoneIcon class="mr-2 h-4 w-4 shrink-0 text-primary" />
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="justify-end px-0">
          <RouterLink class="flex items-center gap-2 justify-end" to="/logout">
            تسجيل الخروج
            <ArrowLeftEndOnRectangleIcon class="mr-2 h-4 w-4 shrink-0 font-bold text-primary" />
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
 

    </DropdownMenuContent>
  </DropdownMenu>
</template>