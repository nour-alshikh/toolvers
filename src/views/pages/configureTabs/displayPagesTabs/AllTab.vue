<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { ref, watch } from 'vue'

const all = ref(true)
const home = ref(true)
const cart = ref(true)
const product = ref(true)
const category = ref(true)

watch(all, () => {
  home.value = all.value
  cart.value = all.value
  product.value = all.value
  category.value = all.value
})
</script>

<template>
  <div class="flex justify-end items-end space-x-2 my-3">
    <label
      for="all"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      الكل
    </label>
    <Checkbox v-model="all" id="all" />
  </div>
  <div class="flex justify-end items-end space-x-2 my-3">
    <label
      for="home"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      الصفحة الرئيسية
    </label>
    <Checkbox v-model="home" id="home" />
  </div>
  <div class="flex justify-end items-end space-x-2 my-3">
    <label
      for="cart"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      صفحة سلة المشتريات
    </label>
    <Checkbox v-model="cart" id="cart" />
  </div>
  <div class="flex justify-end items-end space-x-2 my-3">
    <label
      for="product"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      صفحة المنتج
    </label>
    <Checkbox v-model="product" id="product" />
  </div>
  <div class="flex justify-end items-end space-x-2 my-3">
    <label
      for="category"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      صفحة الفئات
    </label>
    <Checkbox v-model="category" id="category" />
  </div>
</template>
