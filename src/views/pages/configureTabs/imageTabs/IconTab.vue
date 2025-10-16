<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'selectIcon'])

const selectedIcon = ref(props.modelValue)
const searchQuery = ref('')
const isLoading = ref(true)
const allIcons = ref<{ name: string; comp: any }[]>([])
const visibleIcons = ref<{ name: string; comp: any }[]>([])
const itemsPerPage = 30
const currentPage = ref(1)
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  try {
    allIcons.value = Object.entries(LucideIcons).map(([name, comp]) => ({
      name,
      comp,
    }))
    loadIcons()
    isLoading.value = false

    // Infinite scroll
    nextTick(() => {
      if (containerRef.value) {
        containerRef.value.addEventListener('scroll', handleScroll)
      }
    })
  } catch (error) {
    console.error('Failed to load icons:', error)
  }
})

const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return allIcons.value.filter((i) => i.name.toLowerCase().includes(query))
})

function loadIcons() {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  visibleIcons.value = filteredIcons.value.slice(0, end)
}

function handleScroll() {
  if (!containerRef.value) return
  const { scrollTop, clientHeight, scrollHeight } = containerRef.value
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    currentPage.value++
    loadIcons()
  }
}

function handleSearch() {
  currentPage.value = 1
  loadIcons()
}

function selectIcon(name: string) {
  selectedIcon.value = name
  emit('update:modelValue', name)
  emit('selectIcon', name)
}
</script>

<template>
  <div class="p-4 space-y-4">
    <!-- Selected Icon Preview -->
    <div
      v-if="selectedIcon"
      class="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
    >
      <component
        :is="LucideIcons[selectedIcon]"
        class="w-8 h-8 text-pink-500"
      />
      <div>
        <p class="font-medium text-gray-700">{{ selectedIcon }}</p>
        <p class="text-xs text-gray-400">Currently selected icon</p>
      </div>
    </div>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      @input="handleSearch"
      type="text"
      placeholder="Search icons..."
      class="w-full mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
    />

    <!-- Icons Grid -->
    <div
      ref="containerRef"
      class="grid grid-cols-8 gap-3 max-h-[400px] overflow-y-auto overflow-x-hidden p-1 border rounded-lg"
    >
      <div v-if="isLoading" class="col-span-5 text-center text-gray-500">
        Loading icons...
      </div>

      <div
        v-else
        v-for="icon in visibleIcons"
        :key="icon.name"
        @click="selectIcon(icon.name)"
        class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors "
        :class="{
          'bg-pink-100 border border-pink-400': icon.name === selectedIcon,
        }"
      >
        <component :is="icon.comp" class="w-6 h-6" />
        <span class="text-xs mt-1 truncate opacity-0 h-0">{{ icon.name }}</span>
      </div>
    </div>

    <div
      v-if="!isLoading && visibleIcons.length < filteredIcons.length"
      class="text-center text-sm text-gray-400 mt-2"
    >
      Scroll down to load more...
    </div>
  </div>
</template>
