<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import General from './profileTabs/General.vue'
import Subscription from './profileTabs/Subscription.vue'
import StoreSettings from './profileTabs/StoreSettings.vue'
import Packages from './profileTabs/Packages.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { icons } from '@/icons'
import { ref } from 'vue'

const tabs = [
  {
    name: 'general',
    component: General,
  },
  {
    name: 'subscription',
    component: Subscription,
  },
  {
    name: 'store-settings',
    component: StoreSettings,
  },
  {
    name: 'packages',
    component: Packages,
  },
]

const tabValue = ref('general')
</script>


<template>
  <DefaultLayout>
    <div class="bg-secondaryBackground rounded-lg px-4 py-6">
      <Tabs v-model="tabValue" class="flex flex-row-reverse gap-4 profile-tabs">
        <TabsList
          class="flex flex-col bg-transparent justify-start border gap-4 rounded-lg py-6 px-2"
        >
          <TabsTrigger value="general">
            <span class="text-sm"> اعدادات عامة </span>
            <img :src="tabValue === 'general' ? icons.settings : icons.gear" alt="">
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <span class="text-sm"> اشتراك سلة </span>
            <img :src="tabValue === 'subscription' ? icons.settings : icons.gear" alt="">
          </TabsTrigger>  
          <TabsTrigger value="store-settings">
            <span class="text-sm"> خصائص المتجر </span>
            <img :src="tabValue === 'store-settings' ? icons.settings : icons.gear" alt="">
          </TabsTrigger>
          <TabsTrigger value="packages">
            <span class="text-sm"> الباقات </span>
              <img :src="icons.packages" alt="">
          </TabsTrigger>
        </TabsList>


        <TabsContent v-for="tab in tabs" :key="tab.name" :value="tab.name" class="w-full mt-0">
          <component :is="tab.component" />
        </TabsContent>
      </Tabs>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.profile-tabs button[data-state='active'] {
  display: flex;
  padding: 16px 24px;
  color: #fff;
  justify-content: end;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 8px;
  background: #be185d;
}

.profile-tabs button[data-state='active'] svg {
  stroke: #fff;
}
.profile-tabs button[data-state='inactive'] svg {
  stroke: #2a2225;
}

.profile-tabs button[data-state='inactive'] {
  display: flex;
  width: 100%;
  padding: 16px 24px;
  justify-content: end;
  align-items: center;
  gap: 4px;
  border-radius: 13.56px;
  background: #f5f5f5;
}
</style>
