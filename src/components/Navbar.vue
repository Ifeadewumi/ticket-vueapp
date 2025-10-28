<template>
  <header class="bg-white shadow">
    <div class="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">T</div>
        <div>
          <h1 class="font-semibold">TicketApp</h1>
          <p class="text-xs text-gray-500">Multi-framework demo</p>
        </div>
      </router-link>
      <nav class="flex items-center gap-3">
        <router-link to="/" class="hidden sm:inline-block px-3 py-2 rounded hover:bg-gray-100">Home</router-link>
        <router-link to="/dashboard" class="hidden sm:inline-block px-3 py-2 rounded hover:bg-gray-100">Dashboard</router-link>
        <router-link to="/tickets" class="hidden sm:inline-block px-3 py-2 rounded hover:bg-gray-100">Tickets</router-link>
        <template v-if="!user">
          <router-link to="/auth/login" class="px-4 py-2 rounded bg-indigo-600 text-white">Login</router-link>
        </template>
        <template v-else>
          <span class="text-sm px-3 py-2">Hi, {{ user.username }}</span>
          <button @click="handleLogout" class="px-3 py-2 rounded bg-red-50 text-red-700 hover:bg-red-100">Logout</button>
        </template>
        <button class="sm:hidden px-2 py-1 rounded bg-gray-100">☰</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const { user, logout } = inject('session')
    const router = useRouter()

    function handleLogout() {
      logout()
      router.push('/')
    }

    return {
      user,
      handleLogout,
    }
  }
}
</script>
