<script setup lang="ts">
defineProps({
  widget: {
    type: String,
    required: false,
  },
  screen: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="toolvers-tool">
    <div class="relative" v-html="widget ?? ''"></div>
  </div>
</template>
