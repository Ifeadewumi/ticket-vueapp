<template>
  <section class="max-w-[1100px] mx-auto">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Tickets</h2>
      <div class="flex items-center gap-2">
        <input v-model="query" placeholder="Search tickets..." class="px-3 py-2 rounded border" />
        <button @click="handleCreate" class="px-4 py-2 rounded bg-indigo-600 text-white">New Ticket</button>
      </div>
    </div>

    <div class="mt-4 grid md:grid-cols-3 gap-4">
      <div class="md:col-span-2">
        <div v-if="visibleTickets.length === 0" class="p-6 bg-white rounded shadow text-gray-500">
          No tickets found.
        </div>
        <div v-else class="grid sm:grid-cols-2 gap-3">
          <TicketCard
            v-for="t in visibleTickets"
            :key="t.id"
            :ticket="t"
            @edit="handleEditClick"
            @delete="handleDelete"
          />
        </div>
      </div>

      <aside class="bg-white p-4 rounded shadow">
        <div v-if="creating">
          <h3 class="font-semibold">Create Ticket</h3>
          <TicketForm @cancel="handleCancel" @submit="handleCreateSubmit" />
        </div>

        <div v-else-if="editing">
          <h3 class="font-semibold">Edit Ticket</h3>
          <TicketForm :initial="editing" @cancel="handleCancel" @submit="handleUpdateSubmit" />
        </div>

        <div v-else class="text-sm text-gray-500">
          <p>Click "New Ticket" to create a ticket, or select Edit on an item.</p>
          <ul class="mt-2 text-xs">
            <li>Required: title, status (open, in_progress, closed)</li>
            <li>Priority and description optional.</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { loadTickets, addTicket, updateTicket, deleteTicket, getSession } from '../utils/storage'
import TicketCard from '../components/TicketCard.vue'
import TicketForm from '../components/TicketForm.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Tickets',
  components: {
    TicketCard,
    TicketForm,
  },
  setup() {
    console.log('Tickets.vue setup executing')
    const tickets = ref([])
    const query = ref('')
    const editing = ref(null)
    const creating = ref(false)
    const { push } = inject('toasts')
    const { userId } = getSession()

    onMounted(() => {
      tickets.value = loadTickets(userId)
    })

    const visibleTickets = computed(() => {
      return tickets.value.filter(t =>
        t.title.toLowerCase().includes(query.value.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(query.value.toLowerCase())
      )
    })

    function handleCreate() {
      creating.value = true
      editing.value = null
    }
    function handleCancel() {
      creating.value = false
      editing.value = null
    }
    function handleCreateSubmit(data) {
      const newTicket = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      tickets.value = addTicket(userId, newTicket)
      creating.value = false
      push('Ticket created')
    }
    function handleEditClick(t) {
      editing.value = { ...t }
      creating.value = false
    }
    function handleUpdateSubmit(data) {
      const updated = { ...data, updatedAt: new Date().toISOString() }
      tickets.value = updateTicket(userId, updated)
      editing.value = null
      push('Ticket updated')
    }
    function handleDelete(ticket) {
      if (!confirm(`Delete ticket "${ticket.title}"? This cannot be undone.`)) return
      tickets.value = deleteTicket(userId, ticket.id)
      push('Ticket deleted')
    }

    return {
      tickets,
      query,
      editing,
      creating,
      visibleTickets,
      handleCreate,
      handleCancel,
      handleCreateSubmit,
      handleEditClick,
      handleUpdateSubmit,
      handleDelete,
    }
  }
}
</script>