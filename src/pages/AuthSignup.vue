<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold">Create an account</h2>
    <form class="mt-4 space-y-3" @submit.prevent="handleSubmit">
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
        <button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white">Sign up</button>
        <router-link to="/auth/login" class="text-sm text-indigo-600">Already have an account?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const DUMMY_USERS_KEY = 'ticketapp_users'
function saveUser(u) {
  const raw = localStorage.getItem(DUMMY_USERS_KEY)
  const users = raw ? JSON.parse(raw) : []
  users.push(u)
  localStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(users))
}

export default {
  name: 'AuthSignup',
  setup() {
    const username = ref('')
    const password = ref('')
    const errors = reactive({})
    const { push } = inject('toasts')
    const router = useRouter()

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
      const userId = uuidv4()
      saveUser({ userId, username: username.value.trim(), password: password.value })
      push('Account created — please login')
      router.push('/auth/login')
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