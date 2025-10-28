<template>
  <form @submit.prevent="handleSubmit" class="space-y-3">
    <div>
      <label class="block text-sm font-medium">Title *</label>
      <input autofocus v-model="form.title" class="mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring" />
      <p v-if="errors.title" class="text-xs text-red-600 mt-1">{{ errors.title }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium">Status *</label>
      <select v-model="form.status" class="mt-1 block w-full rounded border px-3 py-2">
        <option v-for="s in STATUS_VALUES" :key="s" :value="s">{{ s }}</option>
      </select>
      <p v-if="errors.status" class="text-xs text-red-600 mt-1">{{ errors.status }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium">Priority</label>
      <select v-model="form.priority" class="mt-1 block w-full rounded border px-3 py-2">
        <option v-for="p in PRIORITY_VALUES" :key="p" :value="p">{{ p }}</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium">Description</label>
      <textarea v-model="form.description" rows="4" class="mt-1 block w-full rounded border px-3 py-2" />
      <p v-if="errors.description" class="text-xs text-red-600 mt-1">{{ errors.description }}</p>
    </div>

    <div class="flex gap-2">
      <button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 rounded bg-gray-100">Cancel</button>
    </div>
  </form>
</template>

<script>
import { reactive, watch } from 'vue'

const STATUS_VALUES = ['open', 'in_progress', 'closed']
const PRIORITY_VALUES = ['low', 'medium', 'high']

export default {
  name: 'TicketForm',
  props: {
    initial: {
      type: Object,
      default: () => ({ title: '', description: '', status: 'open', priority: 'medium' })
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const form = reactive({ ...props.initial })
    const errors = reactive({})

    watch(() => props.initial, (newVal) => {
      Object.assign(form, newVal)
    }, { deep: true })

    function validate() {
      errors.title = ''
      errors.description = ''
      errors.status = ''
      errors.priority = ''
      let isValid = true

      if (!form.title.trim()) {
        errors.title = 'Title is required'
        isValid = false
      }
      if (!STATUS_VALUES.includes(form.status)) {
        errors.status = 'Status must be open, in_progress, or closed'
        isValid = false
      }
      if (form.description && form.description.length > 1000) {
        errors.description = 'Description cannot exceed 1000 characters'
        isValid = false
      }

      return isValid
    }

    function handleSubmit() {
      if (!validate()) return
      emit('submit', { ...form })
    }

    return {
      form,
      errors,
      handleSubmit,
      STATUS_VALUES,
      PRIORITY_VALUES,
    }
  }
}
</script>
