<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <ToastProvider>
      <main class="flex-1 w-full mx-auto max-w-[1440px] p-4">
        <router-view />
      </main>
    </ToastProvider>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastProvider from './components/ToastProvider.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ToastProvider,
  },
  setup() {
    console.log('App.vue setup executing')
  }
}
</script>

<style>
/* Add any global styles here if needed */
</style>
