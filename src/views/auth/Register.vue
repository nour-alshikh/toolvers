<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const { register } = useAuthStore()

</script>

<template>
  
<FormKit @submit="register" type="form" submit-label="Register">
   <FormKit 
    type="text" 
    label="Username" 
    name="name"  
    help="Enter your username"
    validation="required"
    outer-class="mb-5"
    label-class="block mb-1 text-sm font-bold"
    inner-class="max-w-md mb-1 overflow-hidden border border-gray-400 rounded-lg focus-within:!ring-orange-500 focus-within:!border-orange-500"
    input-class="w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 focus:border-transparent"
    help-class="text-xs text-gray-500" />
   <FormKit 
    type="email" 
    label="Email" 
    name="email"  
    help="Enter your email address"
    validation="required|email"
    outer-class="mb-5"
    label-class="block mb-1 text-sm font-bold"
    inner-class="max-w-md mb-1 overflow-hidden border border-gray-400 rounded-lg focus-within:!ring-orange-500 focus-within:!border-orange-500"
    input-class="w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 focus:border-transparent"
    help-class="text-xs text-gray-500" />
     
    <FormKit type="password" label="Password" name="password"  help="Enter your password"
    validation="required|password"
    outer-class="mb-5"
    label-class="block mb-1 text-sm font-bold"
    inner-class="max-w-md mb-1 overflow-hidden border border-gray-400 rounded-lg focus-within:!ring-orange-500 focus-within:!border-orange-500"
    input-class="w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 focus:border-transparent"
    help-class="text-xs text-gray-500" />
    <FormKit type="password" label="Password Confirmation" name="password_confirmation"  help="Enter your password confirmation"
    validation="required"
    outer-class="mb-5"
    label-class="block mb-1 text-sm font-bold"
    inner-class="max-w-md mb-1 overflow-hidden border border-gray-400 rounded-lg focus-within:!ring-orange-500 focus-within:!border-orange-500"
    input-class="w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 focus:border-transparent"
    help-class="text-xs text-gray-500" />
</FormKit>
</template>