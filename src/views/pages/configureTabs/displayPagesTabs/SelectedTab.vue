<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { icons } from '@/icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ref, watch } from 'vue'

const props = defineProps({
  urls: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:default'])

const urls = ref(props.urls)

const defaultVal = ref(props.default)

watch(defaultVal, (val) => {
  emit('update:default', val)
})

// Add a new row
const addUrl = () => {
  if (!urls.value) return

  if (!Array.isArray(urls.value)) {
    urls.value = []
  }

  urls.value.push({ value: '', operator: 'contains' })
}

// Remove a row
const removeUrl = (index: number) => {
  urls.value?.splice(index, 1)
}
</script>

<template>
  <RadioGroup v-model="defaultVal" class="flex gap-2">
    <div @click="defaultVal = 'except'" class="flex items-center gap-2 border rounded-lg p-4">
      <RadioGroupItem id="except" value="except" />
      <Label for="except">كل الصفحات ما عدا</Label>
    </div>

    <div @click="defaultVal = 'false'" class="flex items-center gap-2 border rounded-lg p-4">
      <RadioGroupItem id="false" value="false" />
      <Label for="false">الظهور في صفحات محددة</Label>
    </div>
  </RadioGroup>

  <div class="mt-4">
    <div v-if="defaultVal !== 'true'" class="space-y-2">
      <div
        v-for="(url, index) in urls"
        :key="index"
        class="flex gap-2 my-5 items-center"  
      >
        <Button
          variant="destructive"
          size="sm"
          @click="removeUrl(index)"
          v-if="urls.length > 1"
        >
          <TrashIcon />
        </Button>

        <div class="relative w-full flex gap-2 items-center">
          <div class="w-full relative">
            <Label
              class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
            >
              ادخل رابط الصفحة المراد العرض بها
            </Label>

            <Input class="p-4 h-auto text-right" type="text" v-model="url.value" />
          </div>

          <Select v-model="url.operator">
            <SelectTrigger class="w-[130px]">
              <SelectValue placeholder="المطابقة" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="contains"> يحتوي </SelectItem>
                <SelectItem value="equals"> يساوي </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out w-full"
        @click="addUrl"
      >
        إضافة رابط اخر
        <img :src="icons.addCircle" alt="" />
      </Button>
    </div>
  </div>
</template>
