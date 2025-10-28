<template>
  <footer class="bg-white border-t mt-8">
    <div class="max-w-[1440px] mx-auto px-4 py-6 text-sm text-gray-500">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div>© {{ currentYear }} TicketApp — Demo</div>
        <div class="mt-2 md:mt-0">Built with Vue • Tailwind CDN</div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = ref(new Date().getFullYear())

    return {
      currentYear,
    }
  }
}
</script>