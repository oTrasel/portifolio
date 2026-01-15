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
          <h2 class="content-title">Editar Footer</h2>
          <p class="content-subtitle">Configure as informações exibidas no rodapé do site</p>
        </div>
        
        <div class="edit-card">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                placeholder="Descrição curta que aparece no footer"
                required
              ></textarea>
              <small>Texto breve sobre você que aparecerá no rodapé</small>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="seu@email.com"
                >
              </div>
              
              <div class="form-group">
                <label for="github">GitHub</label>
                <input
                  type="url"
                  id="github"
                  v-model="form.github"
                  placeholder="https://github.com/seu-usuario"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                v-model="form.linkedin"
                placeholder="https://linkedin.com/in/seu-perfil"
              >
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                💾 Salvar Alterações
              </button>
              <button type="button" @click="handleReset" class="btn btn-outline">
                ↺ Resetar
              </button>
            </div>
            
            <div v-if="saved" class="success-message">
              ✅ Dados salvos com sucesso!
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '../../stores/portfolio'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'EditFooter',
  setup() {
    const router = useRouter()
    const portfolioStore = usePortfolioStore()
    const authStore = useAuthStore()
    
    const form = ref({
      description: '',
      email: '',
      github: '',
      linkedin: ''
    })
    
    const saved = ref(false)
    
    onMounted(() => {
      if (portfolioStore.footer.description) {
        form.value = { ...portfolioStore.footer }
      }
    })
    
    const handleSave = async () => {
      const success = await portfolioStore.updateFooter(form.value)
      
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
      form.value = { ...portfolioStore.footer }
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
