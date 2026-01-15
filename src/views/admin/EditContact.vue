<template>
  <div class="admin-page">
    <nav class="admin-navbar">
      <div class="admin-nav-container">
        <h1 class="admin-logo">
          <router-link to="/admin" style="color: inherit; text-decoration: none;">
            <span class="logo-bracket">&lt;</span>
            Admin Panel
            <span class="logo-bracket">/&gt;</span>
          </router-link>
        </h1>
        <div class="admin-nav-actions">
          <router-link to="/" class="btn btn-outline">Ver Site</router-link>
          <button @click="handleLogout" class="btn btn-primary">Sair</button>
        </div>
      </div>
    </nav>
    
    <div class="admin-container">
      <aside class="admin-sidebar">
        <h3 class="sidebar-title">Gerenciar Conteúdo</h3>
        <ul class="sidebar-menu">
          <li>
            <router-link to="/admin/hero" class="menu-item">
              <span class="menu-icon">🎯</span>
              Hero Section
            </router-link>
          </li>
          <li>
            <router-link to="/admin/about" class="menu-item">
              <span class="menu-icon">👨‍💻</span>
              Sobre Mim
            </router-link>
          </li>
          <li>
            <router-link to="/admin/experiences" class="menu-item">
              <span class="menu-icon">💼</span>
              Experiências
            </router-link>
          </li>
          <li>
            <router-link to="/admin/skills" class="menu-item">
              <span class="menu-icon">🛠️</span>
              Habilidades
            </router-link>
          </li>
          <li>
            <router-link to="/admin/projects" class="menu-item">
              <span class="menu-icon">🚀</span>
              Projetos
            </router-link>
          </li>
          <li>
            <router-link to="/admin/contact" class="menu-item">
              <span class="menu-icon">📧</span>
              Contato
            </router-link>
          </li>
          <li>
            <router-link to="/admin/footer" class="menu-item">
              <span class="menu-icon">📄</span>
              Footer
            </router-link>
          </li>
          <li class="menu-divider"></li>
          <li>
            <router-link to="/admin/visibility" class="menu-item">
              <span class="menu-icon">⚙️</span>
              Visibilidade
            </router-link>
          </li>
        </ul>
      </aside>
      
      <main class="admin-content">
        <div class="content-header">
          <h2 class="content-title">Editar Contato</h2>
          <p class="content-subtitle">Atualize suas informações de contato</p>
        </div>
        
        <div class="edit-card">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="seu@email.com"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="github">GitHub</label>
              <input
                type="url"
                id="github"
                v-model="form.github"
                placeholder="https://github.com/seu-usuario"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                v-model="form.linkedin"
                placeholder="https://linkedin.com/in/seu-usuario"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="location">Localização</label>
              <input
                type="text"
                id="location"
                v-model="form.location"
                placeholder="Ex: Porto Alegre, RS"
                required
              >
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                💾 Salvar Alterações
              </button>
              <button type="button" @click="handleReset" class="btn btn-outline">
                🔄 Resetar
              </button>
            </div>
          </form>
          
          <div v-if="saved" class="success-message">
            ✅ Alterações salvas com sucesso!
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { usePortfolioStore } from '../../stores/portfolio'

export default {
  name: 'EditContact',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const form = ref({
      email: '',
      github: '',
      linkedin: '',
      location: ''
    })
    
    const saved = ref(false)
    
    onMounted(() => {
      form.value = { ...portfolioStore.contact }
    })
    
    const handleSave = async () => {
      const success = await portfolioStore.updateContact(form.value)
      if (success) {
        saved.value = true
        setTimeout(() => {
          saved.value = false
        }, 3000)
      } else {
        alert('Erro ao salvar dados')
      }
    }
    
    const handleReset = () => {
      form.value = { ...portfolioStore.contact }
    }
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }
    
    return {
      form,
      saved,
      handleSave,
      handleReset,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>
