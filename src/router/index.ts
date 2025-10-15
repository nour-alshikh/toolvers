import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Dashborad from '@/views/auth/Dashborad.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import { useAuthStore } from '@/store/auth'


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard'
    },

    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword,
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
      meta: { requiresAuth: true }
    },

    {
      path: '/tools-list',
      name: 'tools-list',
      component: () => import('@/views/pages/ToolsList.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/installed-tools',
      name: 'installed-tools',
      component: () => import('@/views/pages/InstalledTools.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/ratings',
      name: 'ratings',
      component: () => import('@/views/pages/Ratings.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/data-collector',
      name: 'data-collector',
      component: () => import('@/views/pages/DataCollector.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/pages/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/configure/:id',
      name: 'configure',
      component: () => import('@/views/pages/Configure.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/update-configure/:id/:userId',
      name: 'update-configure',
      component: () => import('@/views/pages/Configure.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/pages/Contact.vue'),
      meta: { requiresAuth: true }
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
