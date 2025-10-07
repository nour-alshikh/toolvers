
<script setup lang="ts">
import { icons } from '@/icons';
import { ref } from 'vue';
</script>


<template>
  <div class="flex flex-col min-h-screen">
    <!-- Wrapper -->
    <div class="flex flex-col lg:flex-row flex-1">
      
      <!-- Body -->
      <div class="flex flex-col lg:flex-row flex-1 lg:w-1/2 p-10 order-2 lg:order-1">
        <!-- Form -->
        <div class="flex flex-1 flex-col items-center justify-center">
          <div class="w-full max-w-[500px] p-10">
            <!-- Page Slot -->
            <slot />
          </div>
        </div>

        <!-- Footer -->
        <div class="flex flex-wrap justify-center px-5 mt-auto">
          <!-- Footer content here -->
        </div>
      </div>

      <!-- Aside -->
      <div
        class="flex flex-1 lg:w-1/2 bg-cover bg-center order-1 lg:order-2"
        :style="{ backgroundImage: `url(${icons.authBg})` }"
      >
        <div class="flex flex-col items-center justify-center w-full py-7 lg:py-15 px-5 md:px-15">
          <!-- Aside content here -->
        </div>
      </div>

    </div>
  </div>
</template>
