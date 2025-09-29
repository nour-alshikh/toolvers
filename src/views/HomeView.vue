<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper/modules'
import 'swiper/css/effect-fade'
import { ref } from 'vue'

// import { Button } from '@/components/ui/button'
// import hillImage from '@/assets/images/hill.jpg'

// const countries = [
//   { id: '1', countryName: 'Canada' },
//   { id: '2', countryName: 'United States' },
// ]

// const image = ref(hillImage)

// const selectedCountry = ref(countries[0])

// const onSwiper = (swiper: any) => {

// }
// const onSlideChange = () => {

// }
</script>

<template>
  <DefaultLayout>
    <main>home</main>
  </DefaultLayout>
  <!-- 
  <img :src="image" alt="" />
  <Button>Click me</Button>

  <v-select v-model="selectedCountry" label="countryName" :options="countries"></v-select>

  <section class="max-w-xl mx-auto">
    <swiper
      class="main-swiper bg-red-500 h-64 m-8"
      loop
      :slides-per-view="1"
      :space-between="0"
      :centered-slides="true"
      :modules="[EffectFade]"
      effect="fade"
      :speed="400"
      :autoplay="true"
      :pagination="{
        clickable: true,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange()"
    >
      <swiper-slide class="bg-blue-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 1
        </div>
      </swiper-slide>
      <swiper-slide class="bg-green-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 2
        </div>
      </swiper-slide>
      <swiper-slide class="bg-yellow-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 3
        </div>
      </swiper-slide>
      <swiper-slide class="bg-pink-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 4
        </div>
      </swiper-slide>
      <swiper-slide class="bg-purple-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 5
        </div>
      </swiper-slide>
      <swiper-slide class="bg-orange-500 flex items-center justify-center">
        <div class="text-white text-2xl font-bold h-full w-full flex items-center justify-center">
          Slide 6
        </div>
      </swiper-slide>
    </swiper>
  </section> -->
</template>
