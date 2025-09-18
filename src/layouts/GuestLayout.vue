<template>
  <div class="guest-layout">
    <header>Header</header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Component logic goes here
</script>

<style scoped>
.guest-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

main {
  flex: 1;
  padding: 1rem;
}
</style>