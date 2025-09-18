import type { RegisterData, User } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

import type { FormKitNode } from '@formkit/core'
import router from "@/router";
import type { LoginData } from "@/types";


export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);


    const login = async (formData: LoginData, node?: FormKitNode) => {

        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000'
        });


        try {

            await axiosInstance.post('/login', formData);

            await getUser();
            isLoggedIn.value = true;
            router.push('/dashboard');


        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {

                node?.setErrors([], e.response?.data.errors);
            }
        }
    }


    const register = async (formData: RegisterData, node?: FormKitNode) => {
        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000'
        });


        try {

            await axiosInstance.post('/register', formData);
            await getUser();
            router.push('/login');

        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {

                node?.setErrors([], e.response?.data.errors);
            }
        }
    }

    const getUser = async () => {

        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000'
        });

        try {
            const response = await axiosInstance.get('/user');

            user.value = response.data
            isLoggedIn.value = true
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        await axiosInstance.post('/logout')
        user.value = null;
        isLoggedIn.value = false
        router.push('/login')
    }

    const cleanState = () => {
        user.value = null;
        isLoggedIn.value = false
    }

    return {
        user,
        isLoggedIn,
        login,
        register,
        getUser,
        logout,
        cleanState
    }

}, {
    persist: {
        storage: sessionStorage,
        pick: ['user', 'isLoggedIn'],
    }
}
);