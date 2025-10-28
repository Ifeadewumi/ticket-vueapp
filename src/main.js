import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useSession } from './composables/useSession'

console.log('main.js is executing')
const app = createApp(App)

// Provide session globally
app.provide('session', useSession())

app.use(router)
app.mount('#app')
