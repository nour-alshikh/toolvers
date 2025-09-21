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

import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { PhoneIcon } from '@heroicons/vue/24/solid'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/solid'


</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="p-2 justify-between ">
      <Button variant="outline" class="rounded-full h-10 w-20 bg-background text-[#7C5968] border-none">
       
        <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0" />
        <div class="bg-secondaryBackground size-8 flex items-center justify-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6.78005 13.9292C6.23137 13.9292 5.70516 14.1396 5.31714 14.5142C4.92912 14.8887 4.71107 15.3967 4.71094 15.9265V16.2795C4.71094 18.0451 5.6564 19.3664 7.10624 20.2186C8.5327 21.0567 10.4489 21.4502 12.5005 21.4502C14.5521 21.4502 16.4683 21.0567 17.8948 20.2186C19.3447 19.3664 20.2901 18.0451 20.2901 16.2795V15.9265C20.29 15.3967 20.0719 14.8887 19.6839 14.5142C19.2959 14.1396 18.7697 13.9292 18.221 13.9292L6.78005 13.9292Z" fill="url(#paint0_linear_472_210)"/>
  <path d="M6.78005 13.9292C6.23137 13.9292 5.70516 14.1396 5.31714 14.5142C4.92912 14.8887 4.71107 15.3967 4.71094 15.9265V16.2795C4.71094 18.0451 5.6564 19.3664 7.10624 20.2186C8.5327 21.0567 10.4489 21.4502 12.5005 21.4502C14.5521 21.4502 16.4683 21.0567 17.8948 20.2186C19.3447 19.3664 20.2901 18.0451 20.2901 16.2795V15.9265C20.29 15.3967 20.0719 14.8887 19.6839 14.5142C19.2959 14.1396 18.7697 13.9292 18.221 13.9292L6.78005 13.9292Z" fill="url(#paint1_linear_472_210)"/>
  <path d="M12.5003 2.64746C9.81146 2.64746 7.63184 4.75193 7.63184 7.34808C7.63184 9.94422 9.81146 12.0487 12.5003 12.0487C15.1892 12.0487 17.3688 9.94422 17.3688 7.34808C17.3688 4.75193 15.1892 2.64746 12.5003 2.64746Z" fill="url(#paint2_linear_472_210)"/>
  <defs>
    <linearGradient id="paint0_linear_472_210" x1="8.41586" y1="14.929" x2="10.7761" y2="22.736" gradientUnits="userSpaceOnUse">
      <stop offset="0.125" stop-color="#DB2777"/>
      <stop offset="1" stop-color="#BE185D"/>
    </linearGradient>
    <linearGradient id="paint1_linear_472_210" x1="12.5005" y1="13.0337" x2="15.8005" y2="25.8058" gradientUnits="userSpaceOnUse">
      <stop stop-color="#885EDB" stop-opacity="0"/>
      <stop offset="1" stop-color="#E362F8"/>
    </linearGradient>
    <linearGradient id="paint2_linear_472_210" x1="9.94729" y1="3.89735" x2="14.6635" y2="11.6965" gradientUnits="userSpaceOnUse">
      <stop offset="0.125" stop-color="#BE185D"/>
      <stop offset="1" stop-color="#DB2777"/>
    </linearGradient>
  </defs>
</svg>
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