<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { icons } from '@/icons'

const selectedOption = ref('all-except')

// المصفوفة اللي بتمثل الريبيتر
const allExceptInputs = ref<string[]>([''])

const addAllExceptInput = () => {
  allExceptInputs.value.push('')
}

const removeAllExceptInput = (index: number) => {
  allExceptInputs.value.splice(index, 1)
}

const selectedInputs = ref<string[]>([''])

const addSelectedInput = () => {
  selectedInputs.value.push('')
}

const removeSelectedInput = (index: number) => {
  selectedInputs.value.splice(index, 1)
}
</script>

<template>
  <RadioGroup v-model="selectedOption" class="flex gap-2">
    <div class="flex items-center gap-2 border rounded-lg p-4">
      <RadioGroupItem id="all-except" value="all-except" />
      <Label for="all-except">كل الصفحات ما عدا</Label>
    </div>
    <div class="flex items-center gap-2 border rounded-lg p-4">
      <RadioGroupItem id="selected" value="selected" />
      <Label for="selected">الظهور في صفحات محددة</Label>
    </div>
  </RadioGroup>

  <div class="mt-4">
    <!-- لو all-except -->
    <div v-if="selectedOption === 'all-except'" class="space-y-2">
      <div
        v-for="(input, index) in allExceptInputs"
        :key="index"
        class="flex gap-2 my-5 items-center"
      >
        <Button
          variant="destructive"
          size="sm"
          @click="removeAllExceptInput(index)"
          v-if="allExceptInputs.length > 1"
        >
          <TrashIcon />
        </Button>
        <div class="relative w-full">
          <Label
            class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
          >
            ادخل رابط الصفحة المراد العرض بها
          </Label>

          <Input
            class="p-4 h-auto text-right"
            type="text"
            placeholder=""
            v-model="allExceptInputs[index]"
          />
        </div>
      </div>

      <Button
        variant="outline"
        class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out w-full"
        @click="addAllExceptInput"
      >
        إضافة رابط اخر
        <img :src="icons.addCircle" alt="" />
      </Button>
    </div>

    <!-- لو selected -->
    <div v-else-if="selectedOption === 'selected'">
      <div
        v-for="(input, index) in selectedInputs"
        :key="index"
        class="flex gap-2 my-5 items-center"
      >
        <Button
          variant="destructive"
          size="sm"
          @click="removeSelectedInput(index)"
          v-if="selectedInputs.length > 1"
        >
          <TrashIcon />
        </Button>
        <div class="relative w-full">
          <Label
            class="text-[#AEA2A7] absolute top-0 right-1 -translate-y-1/2 bg-secondaryBackground px-1 text-right font-almarai text-[13px] font-normal leading-[20px] tracking-[-0.16px]"
          >
            ادخل رابط الصفحة المراد العرض بها
          </Label>

          <Input
            class="p-4 h-auto text-right"
            type="text"
            placeholder=""
            v-model="selectedInputs[index]"
          />
        </div>
      </div>

      <Button
        variant="outline"
        class="border border-primary bg-transparent text-primary mt-2 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out w-full"
        @click="addSelectedInput"
      >
        إضافة رابط اخر
        <img :src="icons.addCircle" alt="" />
      </Button>
    </div>
  </div>
</template>
