import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Dashborad from '@/views/auth/Dashborad.vue'
import { useAuthStore } from '@/store/auth'


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashborad,
      meta: { requiresAuth: false }
    },

    {
      path: '/tools-list',
      name: 'tools-list',
      component: () => import('@/views/pages/ToolsList.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/installed-tools',
      name: 'installed-tools',
      component: () => import('@/views/pages/InstalledTools.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/ratings',
      name: 'ratings',
      component: () => import('@/views/pages/Ratings.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/data-collector',
      name: 'data-collector',
      component: () => import('@/views/pages/DataCollector.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/pages/Account.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/pages/Contact.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/internal-error',
      name: 'internal-error',
      component: () => import('@/views/InternalError.vue'),

    },

    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),

    },
  ],
})

router.beforeEach((to, from, next) => {

  const { isLoggedIn } = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.matched.some(record => record.meta.requiresGuest) && isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})
export default router
