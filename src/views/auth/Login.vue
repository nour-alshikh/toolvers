<script setup lang="ts">
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAuthStore } from '@/store/auth'
import { reactive } from 'vue'
import AuthLoading from '../components/AuthLoading.vue'
import Input from '@/components/ui/input/Input.vue'

const data = useAuthStore()

const loginData = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <GuestLayout>
    <div class="text-center">
      <h1 class="text-gray-900 font-bold text-3xl mb-3">تسجيل الدخول</h1>
    </div>

    <form @submit.prevent="data.login(loginData)">
      <div class="mb-8">
        <Input
          type="text"
          v-model="loginData.email"
          placeholder="البريد الالكتروني"
        />

        <div v-if="data.errors && data.errors.email">
          <span class="text-red-500 text-xs" v-for="error in data.errors.email">{{ error }}</span>
        </div>
      </div>
      <div class="mb-8">
        <Input
          type="password"
          v-model="loginData.password"
          placeholder="  كلمه المرور"
        />
        <div v-if="data.errors && data.errors.password">
          <span class="text-red-500 text-xs" v-for="error in data.errors.password">{{
            error
          }}</span>
        </div>
      </div>
      <!--
    <RouterLink to="/register">نسيت كلمه المرور؟</RouterLink>
  -->
      <button
        type="submit"
        class="bg-primary relative hover:bg-primary/90 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100"
        :disabled="data.isLoading"
      >
        <span v-if="!data.isLoading"> تسجيل الدخول </span>
        <AuthLoading v-else />
      </button>
    </form>
  </GuestLayout>
</template>
