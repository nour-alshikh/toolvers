<script setup lang="ts">
import Header from '@/views/components/Header.vue'
import Footer from '@/views/components/Footer.vue'
import { useAuthStore } from '@/store/auth';
import Loading from '@/views/components/Loading.vue'
const data = useAuthStore()
</script>

<template>
  <Loading v-if="data.isLoading" />
  <div>
    <Header />
    <div class="py-4 px-2 lg:px-8">
      <slot />
      <Footer />
    </div>
  </div>
</template>
