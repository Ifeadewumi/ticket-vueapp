<template>
  <div class="bg-white p-4 rounded shadow">
    <h4 class="font-semibold">{{ ticket.title }}</h4>
    <p class="text-sm text-gray-600">{{ ticket.description }}</p>
    <div class="mt-2 flex items-center justify-between text-xs">
      <span :class="statusClass">{{ ticket.status }}</span>
      <div>
        <button @click="$emit('edit', ticket)" class="text-indigo-600 mr-2">Edit</button>
        <button @click="$emit('delete', ticket)" class="text-red-600">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const statusClass = computed(() => {
      switch (props.ticket.status) {
        case 'open': return 'px-2 py-1 rounded-full bg-green-100 text-green-800'
        case 'in_progress': return 'px-2 py-1 rounded-full bg-amber-100 text-amber-800'
        case 'closed': return 'px-2 py-1 rounded-full bg-gray-100 text-gray-800'
        default: return ''
      }
    })

    return {
      statusClass,
    }
  }
}
</script>