<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="p-2 justify-between ">
      <Button variant="outline" class="rounded-full h-10 w-20 bg-background text-[#7C5968] border-none">
       
        <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0" />
        <div class="bg-secondaryBackground size-8 flex items-center justify-center rounded-full">
            <UserIcon class="!size-5 text-primary" />
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
 

    </DropdownMenuContent>
  </DropdownMenu>
</template>