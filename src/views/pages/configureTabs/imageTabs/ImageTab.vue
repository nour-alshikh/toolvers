<script setup lang="ts">
import { icons } from '@/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToolsStore } from '@/store/tool'
import { onMounted, onUpdated, ref } from 'vue'
import Loading from '@/views/components/Loading.vue'

const emit = defineEmits<{
  (e: 'updateDefaultValue', value: string): void
}>()

// Use a string model
const modelValue = defineModel<string | number>({ default: '' })
const props = defineProps<{
  dataId?: string
  dataProperty?: string
}>()

const ImagePath = ref<string>('')

onMounted(() => {
  ImagePath.value = String(modelValue.value ?? '')
})

onUpdated(() => {
  ImagePath.value = String(modelValue.value ?? '')
})
const handleFileSelect = async (e: any) => {
  const files = e.target.files
  if (files.length > 0) {
    const file = files[0]
    const formData = new FormData()
    formData.append('image', file)

    const toolStore = useToolsStore()
    const res = await toolStore.uploadImage(formData)

    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${props.dataId}"]`)

    if (el && props.dataProperty === 'src') {
      el.setAttribute('src', res)
    }

    ImagePath.value = res
    modelValue.value = res
  }
}
</script>

<template>
  <div
    class="rounded-lg w-full flex flex-col items-center justify-center cursor-pointer relative border border-dashed border-black/20 lg:py-6 lg:px-4 py-4 px-2"
  >
    <div v-if="useToolsStore().isLoading">
      <Loading />
    </div>
    <img :src="icons.download" alt="" />
    <p
      class="text-[rgba(0,0,0,0.87)] mt-2 text-[14px] font-normal leading-[175%] tracking-[0.15px] text-center"
    >
      قم بسحب وأفلات الوسائط هنا أو اضغط للرفع
    </p>
    <p
      class="text-[#909090] mt-2 text-center text-[13px] font-normal leading-[130%] tracking-[0.17px]"
    >
      يدعم ملفات JPEG و JPG و PNG و GIF و WEBP بحجم أقصى 5MB
    </p>
    <Button
      class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out"
    >
      رفع الوسائط
      <img :src="icons.arrowUpDownload" alt="" />
    </Button>
    <Input
      type="file"
      @change="handleFileSelect"
      accept="image/*"
      class="opacity-0 absolute inset-0 cursor-pointer w-full h-full z-50"
    />
    <img :src="ImagePath" alt="" />
  </div>

</template>
