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
          <h2 class="content-title">⚙️ Configurações de Visibilidade</h2>
          <p class="content-subtitle">Gerencie quais seções são exibidas no portfólio e na barra de navegação</p>
        </div>

        <div class="edit-card">
          <div class="info-box">
            <strong>✨ Desabilitar uma seção irá:</strong>
            <ul>
              <li>Ocultar a seção da página principal</li>
              <li>Remover o item correspondente da barra de navegação</li>
            </ul>
          </div>

          <div class="sections-list">
            <div 
              v-for="section in sections" 
              :key="section.section_key"
              class="section-item"
              :class="{ disabled: !section.is_visible }"
            >
              <div class="section-info">
                <div class="section-icon">{{ getSectionIcon(section.section_key) }}</div>
                <div class="section-details">
                  <h3>{{ section.section_name }}</h3>
                  <p class="section-key">{{ section.section_key }}</p>
                </div>
              </div>
              
              <div class="section-controls">
                <label class="toggle-switch">
                  <input 
                    type="checkbox" 
                    :checked="section.is_visible === 1"
                    @change="toggleVisibility(section)"
                  >
                  <span class="slider"></span>
                </label>
                <span class="status-text">
                  {{ section.is_visible === 1 ? 'Visível' : 'Oculta' }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="message" class="message-box" :class="messageType">
            {{ message }}
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '../../stores/portfolio'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'EditVisibility',
  setup() {
    const router = useRouter()
    const portfolioStore = usePortfolioStore()
    const authStore = useAuthStore()
    const message = ref('')
    const messageType = ref('success')

    const sections = computed(() => portfolioStore.sectionVisibility)

    const getSectionIcon = (key) => {
      const icons = {
        'about': '👤',
        'experiences': '💼',
        'skills': '🎯',
        'projects': '🚀',
        'contact': '📧'
      }
      return icons[key] || '📄'
    }

    const toggleVisibility = async (section) => {
      const newValue = section.is_visible === 1 ? 0 : 1
      
      const success = await portfolioStore.updateSectionVisibility(section.section_key, newValue)
      
      if (success) {
        message.value = `Seção "${section.section_name}" ${newValue ? 'ativada' : 'desativada'} com sucesso!`
        messageType.value = 'success'
      } else {
        message.value = 'Erro ao atualizar visibilidade'
        messageType.value = 'error'
      }
      
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }

    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }

    onMounted(async () => {
      await portfolioStore.fetchSectionVisibility()
    })

    return {
      sections,
      message,
      messageType,
      getSectionIcon,
      toggleVisibility,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>

<style scoped>
.info-box {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.info-box strong {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-box ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin: 0.25rem 0;
}

.sections-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.section-item:hover {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
}

.section-item.disabled {
  opacity: 0.6;
}

.section-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 12px;
}

.section-details h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--light-text);
}

.section-key {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--gray-text);
  font-family: 'Courier New', monospace;
}

.section-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-text {
  font-weight: 600;
  min-width: 70px;
  color: var(--light-text);
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.message-box {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.message-box.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.message-box.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
</style>
