import './assets/main.css'
import 'vue-select/dist/vue-select.css';

// Import Swiper styles
import 'swiper/css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import vSelect from 'vue-select'


document.documentElement.setAttribute("dir", "rtl")



const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ToastPlugin);
app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig(config))
app.component('v-select', vSelect)
app.mount('#app')
