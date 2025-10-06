<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Stats from '@/views/components/Stats.vue'
import QuickChart from '@/views/components/QuickChart.vue'
import TableList from '@/views/components/TableList.vue'
</script>
<template>
    <DefaultLayout>
      <!-- Stats -->
        <Stats />

        <!-- Charts -->
        <div class="bg-secondaryBackground rounded-lg py-4 px-16 mt-6">
          <QuickChart />
        </div>

        <!-- Installed Tools Table -->
        <div class="bg-secondaryBackground rounded-lg py-4 px-16 mt-2 ">
            <TableList />
        </div>
    </DefaultLayout>
</template>