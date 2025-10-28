import { inject } from 'vue'

export default function ProtectedRoute(to, from, next) {
  // Inject the entire reactive session object
  const sessionStore = inject('session')

  // Access the reactive user property
  if (!sessionStore.session.user) {
    // redirect to login and preserve location
    next({ path: '/auth/login', query: { from: to.fullPath } })
    return // IMPORTANT: Stop execution after calling next()
  }
  // session exists: you could check expiry here
  if (sessionStore.session.user.expiresAt && new Date(sessionStore.session.user.expiresAt) < new Date()) {
    // expired
    sessionStore.logout() // Use the logout function from the store
    next({ path: '/auth/login', query: { from: to.fullPath, expired: true } })
    return // IMPORTANT: Stop execution after calling next()
  }
  next() // Only call next() if no redirect has occurred
}
