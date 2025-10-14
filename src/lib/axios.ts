import router from "@/router";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { useToast } from "vue-toast-notification";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        contentType: "application/json",
        accept: "application/json",
    },
});


axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const { cleanState } = useAuthStore();
    
    const $toast = useToast();

    switch (error.response.status) {
        case 401:
            cleanState();
            $toast.error("Unauthorized");
            router.push('/login');
            break
        case 419:
            cleanState();
            $toast.error("Unauthorized");
            router.push('/login');
            break
        // case 404:
        //     $toast.error('Page not found');

        //     router.push('/not-found');
        //     break
        case 500:
            $toast.error('Internal Server Error');
            router.push('/internal-error');
            break
    }
    return Promise.reject(error);
});

export default axiosInstance