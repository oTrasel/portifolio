import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// Carregar dados da API ao iniciar
import { usePortfolioStore } from './stores/portfolio'
import { useAuthStore } from './stores/auth'

const portfolioStore = usePortfolioStore()
const authStore = useAuthStore()

authStore.checkAuth()
portfolioStore.initializeData()

app.mount('#app')

