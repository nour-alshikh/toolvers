<script setup lang="ts">
import { icons } from '@/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
function handleFileSelect(e: any) {
  const files = e.target.files
  if (files.length > 0) {
    const file = files[0]
    if (validateFile(file)) {
      // saveImage(file);
    }
  }
  e.target.value = ''
}

const validateFile = (file: File) => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    console.warn('Invalid file type:', file.type)
    return false
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    console.warn('File too large:', file.size)
    return false
  }

  return true
}
</script>

<template>
  <div
    class="rounded-lg w-full flex flex-col items-center justify-center cursor-pointer relative border border-dashed border-black/20 lg:py-6 lg:px-4 py-4 px-2"
  >
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
  </div>
</template>
