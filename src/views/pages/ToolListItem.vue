<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { computed } from 'vue'
import { defineProps } from 'vue'

interface Props {
  tool: any
  images: any
}

const props = defineProps<Props>()



// Compute correct image URL with fallback
const imageSrc = computed(() => {
  return (
    props.images[`/src/assets/icons/${props.tool.icon}`] ||
    props.images['/src/assets/icons/default.png']
  )
})
</script>

<template>
  <RouterLink
    :to="`/configure/${props.tool.id}`"
    class="bg-secondaryBackground flex flex-col items-center justify-center p-4 rounded-lg"
  >
    <div class="bg-background flex items-center justify-center p-2 rounded-lg w-full">
      <img class="w-80" :src="imageSrc" alt="" />
    </div>
    <div class="flex items-center gap-3 mt-3">
      <p class="text-center mb-0 text-base font-bold text-[#32232A]">
        {{ props.tool.name }}
      </p>

      <HoverCard>
        <HoverCardTrigger as-child>
          <Button class="p-0" variant="link" @click.stop.prevent>
            <QuestionMarkCircleIcon class="!size-5 shrink-0 text-primary p-0" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent class="w-64 border border-red-500">
          <div class="flex justify-between space-x-4">
            <p class="leading-tight">
              {{ props.tool.description }}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  </RouterLink>
</template>
