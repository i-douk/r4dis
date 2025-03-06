import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.userProfile) return '/login'
})

export default router
