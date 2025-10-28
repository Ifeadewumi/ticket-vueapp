import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import Landing from '../pages/Landing.vue'
import AuthLogin from '../pages/AuthLogin.vue'
import AuthSignup from '../pages/AuthSignup.vue'
import Dashboard from '../pages/Dashboard.vue'
import Tickets from '../pages/Tickets.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/auth/login', component: AuthLogin },
  { path: '/auth/signup', component: AuthSignup },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Catch-all route
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const { user, logout } = inject('session')

    if (!user.value) {
      // User is not logged in
      next({ path: '/auth/login', query: { from: to.fullPath } })
    } else if (user.value.expiresAt && new Date(user.value.expiresAt) < new Date()) {
      // Session expired
      logout()
      next({ path: '/auth/login', query: { from: to.fullPath, expired: true } })
    } else {
      next() // User is logged in and session is valid
    }
  } else {
    next() // Not a protected route, continue
  }
})

export default router
