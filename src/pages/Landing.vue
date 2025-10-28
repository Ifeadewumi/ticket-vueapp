<template>
  <section class="mx-auto max-w-[1100px]">
    <div class="relative overflow-hidden rounded-lg bg-gradient-to-b from-indigo-50 to-white p-8">
      <!-- Decorative circles -->
      <div aria-hidden class="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-pink-200 opacity-40 blur-2xl"></div>
      <div aria-hidden class="absolute -bottom-20 right-6 w-56 h-56 rounded-full bg-indigo-200 opacity-40 blur-2xl"></div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-extrabold">TicketApp</h2>
          <p class="mt-3 text-gray-700">A simple ticket management demo — Landing • Auth • Dashboard • Tickets (CRUD)</p>
          <div class="mt-6 flex gap-3">
            <router-link to="/auth/login" class="px-4 py-2 rounded bg-indigo-600 text-white">Login</router-link>
            <router-link to="/auth/signup" class="px-4 py-2 rounded bg-white border">Get Started</router-link>
          </div>

          <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-3 bg-white rounded shadow">
              <h4 class="text-sm font-semibold">Create tickets</h4>
              <p class="text-xs text-gray-500">Open, progress, or close tickets with notes.</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <h4 class="text-sm font-semibold">Secure routes</h4>
              <p class="text-xs text-gray-500">Mock authentication and protected pages.</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <h4 class="text-sm font-semibold">Responsive</h4>
              <p class="text-xs text-gray-500">Mobile-first, accessible structure.</p>
            </div>
          </div>
        </div>

        <div>
          <!-- Hero image area including SVG wave -->
          <div class="bg-white rounded-lg shadow p-6 relative">
            <img src="/src/assets/decorative-circle.svg" alt="" class="w-20 h-20 absolute -top-8 -right-8 opacity-40" />
            <div class="h-48 flex items-center justify-center">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="none" class="opacity-80">
                <path d="M12 2L15 8H9L12 2Z" fill="#7c3aed"/>
              </svg>
            </div>
            <div class="mt-4">
              <p class="text-sm text-gray-600">Quickly manage tickets and track progress with status colors and summaries.</p>
            </div>
          </div>

          <svg class="mt-2 w-full" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
            <path d="M0,20 C300,80 1140,-20 1440,40 L1440 100 L0 100 Z" fill="#eef2ff"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Landing',
  setup() {
    console.log('Landing.vue setup executing')
  }
}
</script>