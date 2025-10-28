<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold">Login</h2>
    <form @submit.prevent="handleSubmit" class="mt-4 space-y-3">
      <div>
        <label class="block text-sm">Username</label>
        <input v-model="username" class="mt-1 block w-full rounded border px-3 py-2" />
        <p v-if="errors.username" class="text-xs text-red-600 mt-1">{{ errors.username }}</p>
      </div>
      <div>
        <label class="block text-sm">Password</label>
        <input type="password" v-model="password" class="mt-1 block w-full rounded border px-3 py-2" />
        <p v-if="errors.password" class="text-xs text-red-600 mt-1">{{ errors.password }}</p>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white">Login</button>
        <router-link to="/auth/signup" class="text-sm text-indigo-600">Create an account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const DUMMY_USERS_KEY = 'ticketapp_users'

function getUsers() {
  const raw = localStorage.getItem(DUMMY_USERS_KEY)
  return raw ? JSON.parse(raw) : []
}

export default {
  name: 'AuthLogin',
  setup() {
    const username = ref('')
    const password = ref('')
    const errors = reactive({})
    const router = useRouter()
    const route = useRoute()
    const { push } = inject('toasts')
    const { login } = inject('session')

    const from = route.query.from || '/dashboard'
    const expired = route.query.expired

    onMounted(() => {
      if (expired) {
        push('Your session has expired — please log in again.', 'error')
      }
    })

    function validate() {
      errors.username = ''
      errors.password = ''
      let isValid = true

      if (!username.value.trim()) {
        errors.username = 'Username required'
        isValid = false
      }
      if (!password.value.trim() || password.value.length < 4) {
        errors.password = 'Password must be at least 4 characters'
        isValid = false
      }
      return isValid
    }

    function handleSubmit() {
      if (!validate()) return

      const users = getUsers()
      const found = users.find(u => u.username === username.value && u.password === password.value)

      if (!found) {
        push('Invalid credentials', 'error')
        return
      }

      // create a session that expires in 2 hours
      const newSession = {
        userId: found.userId,
        username: username.value.trim(),
        token: Math.random().toString(36).slice(2),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString()
      }
      login(newSession)
      push('Logged in successfully')
      router.replace(from)
    }

    return {
      username,
      password,
      errors,
      handleSubmit,
    }
  }
}
</script>