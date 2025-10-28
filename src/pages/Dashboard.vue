<template>
  <section class="max-w-[1100px] mx-auto">
    <h2 class="text-2xl font-semibold mb-4">Dashboard</h2>

    <div class="grid sm:grid-cols-4 gap-4">
      <div class="p-4 bg-white rounded shadow">
        <div class="text-sm text-gray-500">Total Tickets</div>
        <div class="text-2xl font-bold">{{ total }}</div>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <div class="text-sm text-gray-500">Open</div>
        <div class="text-2xl font-bold text-green-600">{{ open }}</div>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <div class="text-sm text-gray-500">In Progress</div>
        <div class="text-2xl font-bold text-amber-600">{{ inProgress }}</div>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <div class="text-sm text-gray-500">Closed</div>
        <div class="text-2xl font-bold text-gray-600">{{ closed }}</div>
      </div>
    </div>

    <div class="mt-6">
      <p class="text-sm text-gray-500">Use the Tickets screen to manage ticket items.</p>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { loadTickets, getSession } from '../utils/storage'

export default {
  name: 'Dashboard',
  setup() {
    console.log('Dashboard.vue setup executing')
    const total = ref(0)
    const open = ref(0)
    const inProgress = ref(0)
    const closed = ref(0)

    onMounted(() => {
      const { userId } = getSession()
      const tickets = loadTickets(userId)
      total.value = tickets.length
      open.value = tickets.filter(t => t.status === 'open').length
      inProgress.value = tickets.filter(t => t.status === 'in_progress').length
      closed.value = tickets.filter(t => t.status === 'closed').length
    })

    return {
      total,
      open,
      inProgress,
      closed,
    }
  }
}
</script>