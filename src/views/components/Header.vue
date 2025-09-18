<script setup lang="ts">
import Navbar from './Navbar.vue'
import logo from '@/assets/images/logo.png'
import { Button } from '@/components/ui/button';
import ProfileMenu from './ProfileMenu.vue';
import { ref, onMounted } from "vue"
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline"


const image = ref(logo)
const isDark = ref(false)

// Load preference on mount
onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark")
})

// Toggle function
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
</script>

<template>

    <header class="bg-secondaryBackground shadow-md py-4 px-2 lg:px-8 ">
        <div class="rounded-lg border py-3 px-2 lg:px-10 flex justify-between items-center">

            <div>
                <img :src="image" alt="Logo" class="w-24">
            </div>

            <Navbar />
        
            <div class="flex items-center gap-4">
                <Button
    variant="outline"
    class="size-10 rounded-full bg-background text-[#7C5968] border-none"
    @click="toggleTheme"
  >
    <component :is="isDark ? SunIcon : MoonIcon" class="!size-6" />
  </Button>

              <ProfileMenu />
            </div>
        </div>
    </header>
</template>