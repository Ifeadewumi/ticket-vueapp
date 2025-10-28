<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </div>
  <slot></slot>
</template>

<script>
import { provide, reactive } from 'vue'

export default {
  name: 'ToastProvider',
  setup() {
    const toasts = reactive([])

    const push = (message, type = 'info') => {
      const id = Date.now()
      toasts.push({ id, message, type })
      setTimeout(() => {
        const index = toasts.findIndex(t => t.id === id)
        if (index !== -1) toasts.splice(index, 1)
      }, 3000)
    }

    const remove = (id) => {
      const index = toasts.findIndex(t => t.id === id)
      if (index !== -1) toasts.splice(index, 1)
    }

    provide('toasts', { push, remove })

    return {
      toasts
    }
  }
}
</script>

<style scoped>
/* Basic styling for toasts */
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.toast {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  color: white;
}

.toast.info {
  background-color: #3498db;
}

.toast.success {
  background-color: #2ecc71;
}

.toast.error {
  background-color: #e74c3c;
}
</style>