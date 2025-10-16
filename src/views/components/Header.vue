<script setup lang="ts">
import Navbar from './Navbar.vue'
import { Button } from '@/components/ui/button'
import ProfileMenu from './ProfileMenu.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { icons } from '@/icons'
import { useRouter } from 'vue-router'

const isDark = ref(false)

// Load preference on mount
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

// Toggle function
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const router = useRouter()

const isHidden = ref(false)

const handleScroll = () => {
  if (router.currentRoute.value.path.includes('/configure')) {
    isHidden.value = window.scrollY > 65
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="bg-secondaryBackground py-4 px-2 lg:px-8 sticky top-0 z-40"  :class="{ 'opacity-0 pointer-events-none -translate-y-full': isHidden }">
    <div class="rounded-lg border py-3 px-2 lg:px-10 flex justify-between items-center">
      <div>
        <img :src="isDark ? icons.darkLogo : icons.logo" alt="Logo" class="w-24" />
      </div>

      <Navbar />

      <div class="flex items-center gap-4">
        <Button
          variant="outline"
          class="size-10 rounded-full bg-background text-[#7C5968] border-none p-2"
          @click="toggleTheme"
        >
          <img class="size-10" :src="icons.lightDark" alt="" />
        </Button>

        <ProfileMenu />
      </div>
    </div>
  </header>
</template>
