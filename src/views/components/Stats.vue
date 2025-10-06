<script setup lang="ts">
import { ref } from 'vue';

import favorite from '@/assets/images/favorite.png'
import { icons } from '@/icons'
const favoriteImage = ref(favorite)

const stats = [
    {
        title: "عدد كل الاشعارات لدينا",
        value: 100,
        to: "tools-list"
    },
    {
        title: "عدد الاشعارات المثبتة",
        value: 100,
        to: "tools-list"
    },
    {
        title: "عدد الاشعارات المتاحة لباقتك",
        value: 100,
        to: "tools-list"
    },
    {
        title: "عدد الاشعارات المتاحة لباقتك",
        value: 100,
        to: "tools-list"
    },
]
</script>
<template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div v-for="stat in stats" :key="stat.title" class="bg-secondaryBackground flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 rounded-lg border">
                <div class="flex items-center gap-4">
                    <div class="size-10 bg-primary/30  rounded-full flex items-center justify-center">
                        <img :src="favoriteImage" alt="">
                    </div>
                    <div>
                        <h3 class="text-base  font-semibold">{{ stat.title }}</h3>
                        <p class="text-base text-primary font-semibold">{{ stat.value }}</p>
                    </div>
                </div>
                <div>
                    <RouterLink :to="{ name: stat.to, replace: true }">
                        <img :src="icons.arrowFilled" alt="">
                    </RouterLink>
                </div>
            </div>
        </div>
</template>