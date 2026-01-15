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
          <h2 class="content-title">Editar Sobre Mim</h2>
          <p class="content-subtitle">Atualize suas informações pessoais e profissionais</p>
        </div>
        
        <div class="edit-card">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="intro">Introdução</label>
              <textarea
                id="intro"
                v-model="form.intro"
                rows="3"
                placeholder="Breve introdução sobre você"
                required
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="description">Descrição Completa</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="6"
                placeholder="Descrição detalhada sobre sua carreira e experiências"
                required
              ></textarea>
            </div>
            
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
  name: 'EditAbout',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const form = ref({
      intro: '',
      description: '',
      email: '',
      location: ''
    })
    
    const saved = ref(false)
    
    onMounted(() => {
      form.value = { ...portfolioStore.about }
    })
    
    const handleSave = async () => {
      const success = await portfolioStore.updateAbout(form.value)
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
      form.value = { ...portfolioStore.about }
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
