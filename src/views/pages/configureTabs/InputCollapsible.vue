<script setup lang="ts">
import type { ToolInputGroup } from '@/types';
import ConfigureInputs from './ConfigureInputs.vue';


const props = defineProps<{
  inputs: ToolInputGroup[]
}>()
</script>

<template>
 <ConfigureInputs :inputs="inputs"  />

</template>

<style scoped>
button[data-state='active'] {
  background-color: #f0dae3;
  color: #be185d;
}
</style>
