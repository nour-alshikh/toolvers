<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'
</script>

<template>
  <DefaultLayout>
    <transition name="fade-scale" mode="out-in">
      <!-- Desktop -->
      <div class="border border-blue-500 m-4 relative" style="height: 700px; width: 1370px">
        <vue3-draggable-resizable
          :class-name-dragging="'my-dragging-class'"
          :class-name-resizing="'my-resizing-class'"
          :lock-aspect-ratio="true"
          :parent="true"
          @dragging=""
          @resizing=""
        >
          <div class="bg-red-500 h-full w-full flex items-center justify-center text-white">
            Desktop Box
          </div>
        </vue3-draggable-resizable>
      </div>
    </transition>
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
