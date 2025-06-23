import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '../views/HomeView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import SucessView from '@/views/SucessView.vue'
import ServiceView from '@/views/ServiceView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false },
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutUsView,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/products/:slug',
      name: 'ProductDetail',
      component: ProductDetailView,
    },
    {
      path: '/success-page',
      name: 'Success',
      component: SucessView,
      meta: { requiresAuth: false },
    },
    {
      path: '/service',
      name: 'Service',
      component: ServiceView,
      meta: { requiresAuth: false },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    return { name: '/' }
  }
})

export default router
