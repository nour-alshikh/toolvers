<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Squares2X2Icon } from '@heroicons/vue/24/outline'
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
import { ArchiveBoxArrowDownIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/outline'
import { InboxStackIcon } from '@heroicons/vue/24/outline'
import { Bars3Icon } from '@heroicons/vue/24/outline'



import { useRoute } from "vue-router"

const route = useRoute()
const pages: { title: string, href: string, icon: any }[] = [
    {
        title: "لوحة التحكم",
        href: "/dashboard", 
        icon: Squares2X2Icon
    },
    {
        title: "قائمة العناصر",
        href: "/tools-list",
        icon: WrenchScrewdriverIcon
    },
    {
        title: "الاشعارات المثبتة",
        href: "/installed-tools",
        icon: ArchiveBoxArrowDownIcon
    },
    {
        title: "التقييمات",
        href: "/ratings",
        icon: StarIcon
    },
    {
        title: "جامع البيانات",
        href: "/data-collector",
        icon:   InboxStackIcon
    },
]
</script>

<template>
    <nav class="hidden md:block">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem class="flex flex-row-reverse items-center">
                    <NavigationMenuLink v-for="page in pages" :key="page.title" :href="page.href" class="bg-transparent flex flex-row-reverse items-center" :class="[
              navigationMenuTriggerStyle(),
              route.path === page.href
                ? 'text-primary '
                : 'text-secondary'
            ]">
                        <component :is="page.icon" class="size-6 " />
                        {{ page.title }}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>        
    </nav>
    

    <Sheet >
    <SheetTrigger as-child>
      <Button class="block md:hidden" variant="outline">
        <Bars3Icon />
      </Button>
    </SheetTrigger>
    <SheetContent>
 <ul>
    <li v-for="page in pages" :key="page.title" :href="page.href" class="bg-transparent flex mb-5 items-center" :class="[
              navigationMenuTriggerStyle(),
              route.path === page.href
                ? 'text-primary '
                : 'text-secondary'
            ]">
                        <component :is="page.icon" class="size-6 " />
                        {{ page.title }}
                    </li>
 </ul>
     
    </SheetContent>
  </Sheet>
    
</template>
