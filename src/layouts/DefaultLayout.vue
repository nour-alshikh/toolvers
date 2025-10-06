  
  <script setup lang="ts">
  import Header from '@/views/components/Header.vue'
  import Footer from '@/views/components/Footer.vue'
  </script>
  
<template>

<div>

  <Header />
  <div class=" py-4 px-2 lg:px-8">
    <slot />
    <Footer />
  </div>
</div>
</template>
