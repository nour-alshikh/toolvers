<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { ref, watch, onMounted } from 'vue'

/**
 * v-model:pages means:
 *  - prop: pages
 *  - event: update:pages
 */
const props = defineProps({
  pages: {
    type: Array as () => string[],
    required: true,
  },
})

const emit = defineEmits(['update:pages'])

const all = ref(false)
const home = ref(false)
const cart = ref(false)
const product = ref(false)
const category = ref(false)

// --- Set checkbox states based on pages array from parent
const setCheckedFromPages = () => {
  home.value = props.pages.includes('home')
  cart.value = props.pages.includes('cart')
  product.value = props.pages.includes('product')
  category.value = props.pages.includes('category')
  all.value = home.value && cart.value && product.value && category.value
}

onMounted(setCheckedFromPages)
watch(() => props.pages, setCheckedFromPages, { deep: true })

// --- When "all" changes, toggle all others and emit
watch(all, (newVal) => {
  home.value = newVal
  cart.value = newVal
  product.value = newVal
  category.value = newVal
  emitPages()
})

// --- Watch individuals → emit updated array
watch([home, cart, product, category], () => {
  all.value = home.value && cart.value && product.value && category.value
  emitPages()
})

// --- Emit helper
function emitPages() {
  const newPages: string[] = []
  if (home.value) newPages.push('home')
  if (cart.value) newPages.push('cart')
  if (product.value) newPages.push('product')
  if (category.value) newPages.push('category')
  emit('update:pages', newPages)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-end items-end space-x-2 my-3">
      <label for="all" class="text-sm font-medium leading-none">الكل</label>
      <Checkbox v-model="all" id="all" />
    </div>

    <div class="flex justify-end items-end space-x-2 my-3">
      <label for="home" class="text-sm font-medium leading-none">الصفحة الرئيسية</label>
      <Checkbox v-model="home" id="home" />
    </div>

    <div class="flex justify-end items-end space-x-2 my-3">
      <label for="cart" class="text-sm font-medium leading-none">صفحة سلة المشتريات</label>
      <Checkbox v-model="cart" id="cart" />
    </div>

    <div class="flex justify-end items-end space-x-2 my-3">
      <label for="product" class="text-sm font-medium leading-none">صفحة المنتج</label>
      <Checkbox v-model="product" id="product" />
    </div>

    <div class="flex justify-end items-end space-x-2 my-3">
      <label for="category" class="text-sm font-medium leading-none">صفحة الفئات</label>
      <Checkbox v-model="category" id="category" />
    </div>
  </div>
</template>
