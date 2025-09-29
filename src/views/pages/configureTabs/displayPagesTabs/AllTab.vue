<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

</script>

<template>
  <div class="flex justify-end items-end space-x-2 my-3">
                  <label
                    for="all"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    الكل
                  </label>
                  <Checkbox id="all" />
                </div>
                <div class="flex justify-end items-end space-x-2 my-3">
                  <label
                    for="home"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    الصفحة الرئيسية
                  </label>
                  <Checkbox id="home" />
                </div>
                <div class="flex justify-end items-end space-x-2 my-3">
                  <label
                    for="cart"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    صفحة سلة المشتريات
                  </label>
                  <Checkbox id="cart" />
                </div>
                <div class="flex justify-end items-end space-x-2 my-3">
                  <label
                    for="product"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    صفحة المنتج
                  </label>
                  <Checkbox id="product" />
                </div>
                <div class="flex justify-end items-end space-x-2 my-3">
                  <label
                    for="category"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    صفحة الفئات
                  </label>
                  <Checkbox id="category" />
                </div>    
</template>