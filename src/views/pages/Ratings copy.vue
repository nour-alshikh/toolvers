<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'

const currentScreen = ref<'desktop' | 'mobile'>('desktop')

// نخزن النسب المئوية
const desktopState = ref({ x: 0, y: 0, w: 30, h: 20 }) // نسب مئوية
const mobileState = ref({ x: 0, y: 0, w: 40, h: 25 })

const desktopRef = ref()
const mobileRef = ref()

// دالة ترجع أبعاد البارنت الحالي
const getParentBox = (screen: 'desktop' | 'mobile') => {
  const parent = screen === 'desktop' ? desktopRef.value : mobileRef.value
  return parent.getBoundingClientRect()
}

// دالة لحساب px من النسبة
const toPx = (valPercent: number, parentSize: number) => (valPercent / 100) * parentSize

// حفظ مكان العنصر
const handleDragging = (screen: 'desktop' | 'mobile', { x, y }: { x: number; y: number }) => {
  const parentBox = getParentBox(screen)
  const xPercent = (x / parentBox.width) * 100
  const yPercent = (y / parentBox.height) * 100
  if (screen === 'desktop') {
    desktopState.value.x = xPercent
    desktopState.value.y = yPercent
  } else {
    mobileState.value.x = xPercent
    mobileState.value.y = yPercent
  }
}

// حفظ الحجم
const handleResizing = (screen: 'desktop' | 'mobile', { w, h }: { w: number; h: number }) => {
  const parentBox = getParentBox(screen)
  const wPercent = (w / parentBox.width) * 100
  const hPercent = (h / parentBox.height) * 100
  if (screen === 'desktop') {
    desktopState.value.w = wPercent
    desktopState.value.h = hPercent
  } else {
    mobileState.value.w = wPercent
    mobileState.value.h = hPercent
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="flex gap-4 m-4">
      <button class="bg-blue-500 text-white p-2 rounded-lg" @click="currentScreen = 'desktop'">Desktop</button>
      <button class="bg-green-500 text-white p-2 rounded-lg" @click="currentScreen = 'mobile'">Mobile</button>
    </div>

    <transition name="fade-scale" mode="out-in">
      <!-- Desktop -->
      <div v-if="currentScreen==='desktop'" key="desktop" ref="desktopRef"
           class="border border-blue-500 m-4 relative"
           style="height: 700px; width: 1370px">
        <vue3-draggable-resizable
       :class-name-dragging="'my-dragging-class'"
       :class-name-resizing="'my-resizing-class'"
          :x="toPx(desktopState.x, 1370)"
          :y="toPx(desktopState.y, 700)"
          :w="toPx(desktopState.w, 1370)"
          :h="toPx(desktopState.h, 700)"
          :lock-aspect-ratio="true"
          :parent="true"
          @dragging="(pos)=>handleDragging('desktop',pos)"
          @resizing="(size)=>handleResizing('desktop',size)"
        >
          <div class="bg-red-500 h-full w-full flex items-center justify-center text-white">
            Desktop Box
          </div>
        </vue3-draggable-resizable>
      </div>

      <!-- Mobile -->
      <div v-else key="mobile" ref="mobileRef"
           class="border border-green-500 m-4 relative"
           style="height: 700px; width: 390px">
        <vue3-draggable-resizable
        :class-name-dragging="'my-dragging-class'"
        :class-name-resizing="'my-resizing-class'"
          :x="toPx(mobileState.x, 390)"
          :y="toPx(mobileState.y, 700)"
          :w="toPx(mobileState.w, 390)"
          :h="toPx(mobileState.h, 700)"
          :parent="true"
          :lock-aspect-ratio="true"
          @dragging="(pos)=>handleDragging('mobile',pos)"
          @resizing="(size)=>handleResizing('mobile',size)"
        >
       
          <div class="bg-purple-500 h-full w-full flex items-center justify-center text-white">
            Mobile Box
          </div>
        </vue3-draggable-resizable>
      </div>
    </transition>

    <!-- عرض القيم بالنسبة المئوية -->
    <div class="p-4">
      <strong>Desktop</strong> =>  
      X: {{ desktopState.x.toFixed(1) }}%,  
      Y: {{ desktopState.y.toFixed(1) }}%,  
      W: {{ desktopState.w.toFixed(1) }}%,  
      H: {{ desktopState.h.toFixed(1) }}%
      <br>
      <strong>Mobile</strong> =>  
      X: {{ mobileState.x.toFixed(1) }}%,  
      Y: {{ mobileState.y.toFixed(1) }}%,  
      W: {{ mobileState.w.toFixed(1) }}%,  
      H: {{ mobileState.h.toFixed(1) }}%
    </div>
  </DefaultLayout>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.my-dragging-class {
    opacity: 0.5;
}

.my-resizing-class {
    opacity: 0.8;
}
</style>