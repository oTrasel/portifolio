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
          <h2 class="content-title">Gerenciar Projetos</h2>
          <p class="content-subtitle">Adicione, edite ou remova seus projetos</p>
        </div>
        
        <button @click="openAddModal" class="add-button">
          ➕ Adicionar Novo Projeto
        </button>
        
        <div class="item-list">
          <div v-for="(proj, index) in projects" :key="index" class="list-item">
            <div class="item-header">
              <div>
                <h3 class="item-title">{{ proj.icon }} {{ proj.title }}</h3>
                <p class="item-subtitle">Demo: {{ proj.demo || 'N/A' }} | GitHub: {{ proj.github || 'N/A' }}</p>
              </div>
              <div class="item-actions">
                <button @click="openEditModal(index)" class="btn btn-outline btn-icon">
                  ✏️ Editar
                </button>
                <button @click="deleteProject(index)" class="btn btn-outline btn-icon">
                  🗑️
                </button>
              </div>
            </div>
            <p class="item-content">{{ proj.description }}</p>
            <div class="item-tags">
              <span v-for="tech in proj.technologies" :key="tech" class="tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Modal -->
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">
                {{ editingIndex !== null ? 'Editar' : 'Adicionar' }} Projeto
              </h3>
              <button @click="closeModal" class="modal-close">✕</button>
            </div>
            
            <form @submit.prevent="saveProject">
              <div class="form-group">
                <label for="title">Título do Projeto</label>
                <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  placeholder="Ex: Sistema Web Corporativo"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="5"
                  placeholder="Descrição do projeto"
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="demo">Link Demo (opcional)</label>
                <input
                  type="text"
                  id="demo"
                  v-model="form.demo"
                  placeholder="Ex: https://meu-projeto.com"
                >
              </div>
              
              <div class="form-group">
                <label for="github">Link GitHub (opcional)</label>
                <input
                  type="text"
                  id="github"
                  v-model="form.github"
                  placeholder="Ex: https://github.com/usuario/projeto"
                >
              </div>
              
              <div class="form-group">
                <label for="icon">Ícone (emoji)</label>
                <input
                  type="text"
                  id="icon"
                  v-model="form.icon"
                  placeholder="Ex: 💼"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="technologies">Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  id="technologies"
                  v-model="technologiesString"
                  placeholder="Ex: Vue.js, Node.js, PostgreSQL"
                  required
                >
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  💾 Salvar
                </button>
                <button type="button" @click="closeModal" class="btn btn-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div v-if="saved" class="success-message">
          ✅ Alterações salvas com sucesso!
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { usePortfolioStore } from '../../stores/portfolio'

export default {
  name: 'EditProjects',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const projects = computed(() => portfolioStore.projects)
    const showModal = ref(false)
    const editingIndex = ref(null)
    const saved = ref(false)
    
    const form = ref({
      title: '',
      description: '',
      technologies: [],
      demo: '',
      github: '',
      icon: ''
    })
    
    const technologiesString = ref('')
    
    const openAddModal = () => {
      editingIndex.value = null
      form.value = {
        title: '',
        description: '',
        technologies: [],
        demo: '',
        github: '',
        icon: ''
      }
      technologiesString.value = ''
      showModal.value = true
    }
    
    const openEditModal = (index) => {
      editingIndex.value = index
      const proj = projects.value[index]
      form.value = { ...proj }
      technologiesString.value = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingIndex.value = null
    }
    
    const saveProject = async () => {
      form.value.technologies = technologiesString.value.split(',').map(t => t.trim())
      
      let success = false
      if (editingIndex.value !== null) {
        const proj = portfolioStore.projects[editingIndex.value]
        success = await portfolioStore.updateProject(proj.id, form.value)
      } else {
        success = await portfolioStore.addProject(form.value)
      }
      
      if (success) {
        closeModal()
        showSavedMessage()
      } else {
        alert('Erro ao salvar projeto')
      }
    }
    
    const deleteProject = async (index) => {
      if (confirm('Tem certeza que deseja remover este projeto?')) {
        const proj = portfolioStore.projects[index]
        const success = await portfolioStore.deleteProject(proj.id)
        if (success) {
          showSavedMessage()
        } else {
          alert('Erro ao deletar projeto')
        }
      }
    }
    
    const showSavedMessage = () => {
      saved.value = true
      setTimeout(() => {
        saved.value = false
      }, 3000)
    }
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }
    
    return {
      projects,
      showModal,
      editingIndex,
      form,
      technologiesString,
      saved,
      openAddModal,
      openEditModal,
      closeModal,
      saveProject,
      deleteProject,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>
