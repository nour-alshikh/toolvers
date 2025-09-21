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
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1968 19.9322V24.351H11.9874V19.9322H14.1968ZM19.3413 16.8861L22.4658 20.0107L20.9035 21.573L17.779 18.4484L19.3413 16.8861ZM6.843 16.8861L8.40529 18.4484L5.28071 21.573L3.71842 20.0107L6.843 16.8861ZM13.0922 6.15902C16.4281 6.15902 19.1325 8.86333 19.1325 12.1993C19.1325 15.5353 16.4281 18.2396 13.0922 18.2396C12.2985 18.2412 11.5124 18.0859 10.7788 17.7829C10.0453 17.4799 9.37883 17.035 8.81763 16.4738C8.25643 15.9127 7.81155 15.2462 7.50853 14.5126C7.2055 13.7791 7.05029 12.993 7.05179 12.1993C7.05179 8.86333 9.75615 6.15902 13.0922 6.15902ZM13.0922 8.36839C10.9764 8.36839 9.26121 10.0836 9.26121 12.2035C9.26025 12.7063 9.35858 13.2044 9.55054 13.6691C9.74251 14.1338 10.0243 14.556 10.3799 14.9116C11.0979 15.6296 12.0724 16.0321 13.0922 16.0302V8.36839ZM25.2438 11.0946V13.304H20.825V11.0946H25.2438ZM5.35922 11.0946V13.304H0.94043V11.0946H5.35922ZM5.28071 2.8256L8.40529 5.95018L6.843 7.51247L3.71842 4.38789L5.28071 2.8256ZM20.9036 2.8256L22.4658 4.38789L19.3413 7.51247L17.779 5.95018L20.9036 2.8256ZM14.1968 0.0476074V4.46639H11.9874V0.0476074H14.1968Z" fill="#7C5968"/>
</svg>
  </Button>

              <ProfileMenu />
            </div>
        </div>
    </header>
</template>