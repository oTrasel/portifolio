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
            
            <div class="form-section-header">
              <h3>Estatísticas</h3>
              <button type="button" @click="addStat" class="btn btn-outline btn-sm">
                ➕ Adicionar Estatística
              </button>
            </div>
            
            <div class="stats-list">
              <div 
                v-for="(stat, index) in stats" 
                :key="stat.id || index"
                class="stat-item"
              >
                <div class="stat-fields">
                  <div class="form-group">
                    <label>Ícone (emoji)</label>
                    <input
                      type="text"
                      v-model="stat.icon"
                      placeholder="💼"
                      maxlength="2"
                    >
                  </div>
                  
                  <div class="form-group">
                    <label>Valor</label>
                    <input
                      type="text"
                      v-model="stat.number"
                      placeholder="4+"
                    >
                  </div>
                  
                  <div class="form-group">
                    <label>Descrição</label>
                    <input
                      type="text"
                      v-model="stat.label"
                      placeholder="Anos de Experiência"
                    >
                  </div>
                </div>
                
                <button 
                  type="button" 
                  @click="removeStat(index)" 
                  class="btn-delete"
                  title="Remover estatística"
                >
                  🗑️
                </button>
              </div>
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
      location: '',
      photo_url: ''
    })
    
    const stats = ref([])
    const statsToDelete = ref([])
    const saved = ref(false)
    const photoPreview = ref('')
    const selectedPhotoFile = ref(null)
    
    onMounted(() => {
      form.value = {
        intro: portfolioStore.about.intro,
        description: portfolioStore.about.description,
        email: portfolioStore.about.email,
        location: portfolioStore.about.location,
        photo_url: portfolioStore.about.photo_url
      }
      stats.value = [...portfolioStore.about.stats]
    })
    
    const handlePhotoSelect = (event) => {
      const file = event.target.files[0]
      if (file) {
        selectedPhotoFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
          photoPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
    
    const removePhoto = () => {
      photoPreview.value = ''
      selectedPhotoFile.value = null
      form.value.photo_url = ''
    }
    
    const addStat = () => {
      stats.value.push({
        icon: '',
        number: '',
        label: '',
        isNew: true
      })
    }
    
    const removeStat = async (index) => {
      const stat = stats.value[index]
      if (stat.id) {
        // Se tem ID, é uma stat existente - adicionar à lista de deleção
        statsToDelete.value.push(stat.id)
      }
      stats.value.splice(index, 1)
    }
    
    const handleSave = async () => {
      try {
        // Salvar informações básicas do about
        const basicSuccess = await portfolioStore.updateAbout(form.value)
        
        if (!basicSuccess) {
          alert('Erro ao salvar dados básicos')
          return
        }
        
        // Deletar stats marcadas para deleção
        for (const statId of statsToDelete.value) {
          await portfolioStore.deleteAboutStat(statId)
        }
        statsToDelete.value = []
        
        // Atualizar ou criar stats
        for (const stat of stats.value) {
          if (stat.isNew) {
            // Nova stat
            await portfolioStore.addAboutStat({
              icon: stat.icon,
              value: stat.number,
              label: stat.label
            })
          } else if (stat.id) {
            // Stat existente
            await portfolioStore.updateAboutStat(stat.id, {
              icon: stat.icon,
              value: stat.number,
              label: stat.label
            })
          }
        }
        
        // Recarregar dados
        await portfolioStore.fetchAbout()
        stats.value = [...portfolioStore.about.stats]
        
        saved.value = true
        setTimeout(() => {
          saved.value = false
        }, 3000)
      } catch (error) {
        console.error('Erro ao salvar:', error)
        alert('Erro ao salvar alterações')
      }
    }
    
    const handleReset = () => {
      form.value = {
        intro: portfolioStore.about.intro,
        description: portfolioStore.about.description,
        email: portfolioStore.about.email,
        location: portfolioStore.about.location
      }
      stats.value = [...portfolioStore.about.stats]
      statsToDelete.value = []
    }
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }
    
    return {
      form,
      stats,
      saved,
      addStat,
      removeStat,
      handleSave,
      handleReset,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>
