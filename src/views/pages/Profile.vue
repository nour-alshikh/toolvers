<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import General from './profileTabs/General.vue'
import Subscription from './profileTabs/Subscription.vue'
import StoreSettings from './profileTabs/StoreSettings.vue'
import Packages from './profileTabs/Packages.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
</script>


<template>
  <DefaultLayout>
    <div class="bg-secondaryBackground rounded-lg px-4 py-6">
      <Tabs default-value="general" class="flex flex-row-reverse gap-4 profile-tabs">
        <TabsList
          class="flex flex-col bg-transparent justify-start border gap-4 rounded-lg py-6 px-2"
        >
          <TabsTrigger value="general">
            <span class="text-sm"> اعدادات عامة </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M18.5259 7.80622C19.1312 8.67412 19.5411 9.66301 19.7271 10.7047H22V13.2953H19.7271C19.5411 14.337 19.1312 15.3259 18.5259 16.1938L20.1337 17.8017L18.3017 19.6337L16.6938 18.0259C15.8259 18.6312 14.837 19.0411 13.7953 19.2271V21.5H11.2047V19.2271C10.163 19.0411 9.17412 18.6312 8.30622 18.0259L6.69835 19.6337L4.86627 17.8017L6.47415 16.1938C5.8688 15.3259 5.45895 14.337 5.27287 13.2953H3V10.7047H5.27287C5.45895 9.66301 5.8688 8.67412 6.47415 7.80622L4.86627 6.19835L6.69835 4.36627L8.30622 5.97415C9.17412 5.3688 10.163 4.95895 11.2047 4.77287V2.5H13.7953V4.77287C14.837 4.95895 15.8259 5.3688 16.6938 5.97415L18.3017 4.36627L20.1337 6.19835L18.5259 7.80622Z"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 14.375C13.1299 14.375 13.734 14.1248 14.1794 13.6794C14.6248 13.234 14.875 12.6299 14.875 12C14.875 11.3701 14.6248 10.766 14.1794 10.3206C13.734 9.87522 13.1299 9.625 12.5 9.625C11.8701 9.625 11.266 9.87522 10.8206 10.3206C10.3752 10.766 10.125 11.3701 10.125 12C10.125 12.6299 10.3752 13.234 10.8206 13.6794C11.266 14.1248 11.8701 14.375 12.5 14.375Z"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <span class="text-sm"> اشتراك سلة </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M16 11.5C16 11.9596 15.9095 12.4148 15.7336 12.8394C15.5577 13.264 15.2999 13.6499 14.9749 13.9749C14.6499 14.2999 14.264 14.5577 13.8394 14.7336C13.4148 14.9095 12.9596 15 12.5 15C12.0404 15 11.5852 14.9095 11.1606 14.7336C10.736 14.5577 10.3501 14.2999 10.0251 13.9749C9.70012 13.6499 9.44231 13.264 9.26642 12.8394C9.09053 12.4148 9 11.9596 9 11.5C9 10.5717 9.36875 9.6815 10.0251 9.02513C10.6815 8.36875 11.5717 8 12.5 8C13.4283 8 14.3185 8.36875 14.9749 9.02513C15.6313 9.6815 16 10.5717 16 11.5Z"
                stroke-width="1.5"
              />
              <path
                d="M21.5 13.6C21.816 13.512 22.1493 13.4677 22.5 13.467V9.533C19.643 9.533 17.786 6.43 19.232 3.967L15.768 2C14.304 4.494 10.698 4.494 9.234 2L5.77 3.967C7.216 6.43 5.357 9.533 2.5 9.533V13.467C5.357 13.467 7.214 16.57 5.768 19.033L9.232 21C9.56414 20.4284 10.0411 19.9544 10.6149 19.6259C11.1886 19.2974 11.8389 19.126 12.5 19.129"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 15L19.258 15.697C19.596 16.611 19.765 17.068 20.098 17.401C20.432 17.735 20.889 17.904 21.803 18.242L22.5 18.5L21.803 18.758C20.889 19.096 20.432 19.265 20.099 19.598C19.765 19.932 19.596 20.389 19.258 21.303L19 22L18.742 21.303C18.404 20.389 18.235 19.932 17.902 19.599C17.568 19.265 17.111 19.096 16.197 18.758L15.5 18.5L16.197 18.242C17.111 17.904 17.568 17.735 17.901 17.402C18.235 17.068 18.404 16.611 18.742 15.697L19 15Z"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </TabsTrigger>
          <TabsTrigger value="store-settings">
            <span class="text-sm"> خصائص المتجر </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M16 11.5C16 11.9596 15.9095 12.4148 15.7336 12.8394C15.5577 13.264 15.2999 13.6499 14.9749 13.9749C14.6499 14.2999 14.264 14.5577 13.8394 14.7336C13.4148 14.9095 12.9596 15 12.5 15C12.0404 15 11.5852 14.9095 11.1606 14.7336C10.736 14.5577 10.3501 14.2999 10.0251 13.9749C9.70012 13.6499 9.44231 13.264 9.26642 12.8394C9.09053 12.4148 9 11.9596 9 11.5C9 10.5717 9.36875 9.6815 10.0251 9.02513C10.6815 8.36875 11.5717 8 12.5 8C13.4283 8 14.3185 8.36875 14.9749 9.02513C15.6313 9.6815 16 10.5717 16 11.5Z"
                stroke-width="1.5"
              />
              <path
                d="M21.5 13.6C21.816 13.512 22.1493 13.4677 22.5 13.467V9.533C19.643 9.533 17.786 6.43 19.232 3.967L15.768 2C14.304 4.494 10.698 4.494 9.234 2L5.77 3.967C7.216 6.43 5.357 9.533 2.5 9.533V13.467C5.357 13.467 7.214 16.57 5.768 19.033L9.232 21C9.56414 20.4284 10.0411 19.9544 10.6149 19.6259C11.1886 19.2974 11.8389 19.126 12.5 19.129"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 15L19.258 15.697C19.596 16.611 19.765 17.068 20.098 17.401C20.432 17.735 20.889 17.904 21.803 18.242L22.5 18.5L21.803 18.758C20.889 19.096 20.432 19.265 20.099 19.598C19.765 19.932 19.596 20.389 19.258 21.303L19 22L18.742 21.303C18.404 20.389 18.235 19.932 17.902 19.599C17.568 19.265 17.111 19.096 16.197 18.758L15.5 18.5L16.197 18.242C17.111 17.904 17.568 17.735 17.901 17.402C18.235 17.068 18.404 16.611 18.742 15.697L19 15Z"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </TabsTrigger>
          <TabsTrigger value="packages">
            <span class="text-sm"> الباقات </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12.5 22C14.6217 22 16.6566 21.1571 18.1569 19.6569C19.6571 18.1566 20.5 16.1217 20.5 14C20.5 8 12.5 2 12.5 2C12.112 4.487 11.732 5.822 10.5 8C9.3 7.445 9 7 8.5 5.75C6.5 8 4.5 11 4.5 14C4.5 16.1217 5.34285 18.1566 6.84315 19.6569C8.34344 21.1571 10.3783 22 12.5 22Z"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17L14.5 13"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 13H10.509M14.491 17H14.5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
