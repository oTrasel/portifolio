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
          <h2 class="content-title">Gerenciar Habilidades</h2>
          <p class="content-subtitle">Edite suas categorias de habilidades e níveis de proficiência</p>
        </div>
        
        <div v-if="skillCategories.length === 0" class="empty-state">
          <div class="empty-state-icon">🛠️</div>
          <h3 class="empty-state-title">Nenhuma categoria cadastrada</h3>
          <p class="empty-state-text">Comece criando sua primeira categoria de habilidades</p>
          <button @click="openAddCategoryModal" class="btn btn-primary">
            ➕ Adicionar Primeira Categoria
          </button>
        </div>
        
        <div v-else>
          <div class="actions-bar">
            <button @click="openAddCategoryModal" class="btn btn-primary">
              ➕ Nova Categoria
            </button>
          </div>
          
          <div class="item-list">
            <div v-for="(category, catIndex) in skillCategories" :key="category.id" class="list-item">
              <div class="item-header">
                <div>
                  <h3 class="item-title">{{ category.icon }} {{ category.title }}</h3>
                  <p class="item-subtitle">{{ category.skills?.length || 0 }} habilidades</p>
                </div>
                <div class="item-actions">
                  <button @click="openCategoryModal(catIndex)" class="btn btn-outline btn-icon">
                    ✏️ Editar Categoria
                  </button>
                  <button @click="deleteCategory(category.id)" class="btn btn-outline btn-icon btn-danger">
                    🗑️ Excluir
                  </button>
                </div>
              </div>
              
              <div class="skills-grid">
                <div v-for="skill in category.skills" :key="skill.id" class="skill-card">
                  <div class="skill-info">
                    <strong>{{ skill.name }}</strong>
                    <div class="skill-level-bar">
                      <div class="skill-level-fill" :style="{ width: skill.level + '%' }"></div>
                    </div>
                    <span class="skill-level-text">{{ skill.level }}%</span>
                  </div>
                  <div class="skill-actions">
                    <button @click="openEditSkillModal(catIndex, skill)" class="btn-mini">✏️</button>
                    <button @click="deleteSkill(skill.id)" class="btn-mini btn-danger">🗑️</button>
                  </div>
                </div>
                
                <button @click="openAddSkillModal(category)" class="add-skill-btn">
                  ➕ Adicionar Habilidade
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal Editar/Adicionar Categoria -->
        <div v-if="showCategoryModal" class="modal-overlay" @click.self="closeCategoryModal">
          <div class="modal-content modal-small">
            <div class="modal-header">
              <h3 class="modal-title">{{ editingCategoryIndex !== null ? 'Editar' : 'Adicionar' }} Categoria</h3>
              <button @click="closeCategoryModal" class="modal-close">✕</button>
            </div>
            
            <form @submit.prevent="saveCategory">
              <div class="form-group">
                <label for="cat-icon">Ícone (emoji)</label>
                <input
                  type="text"
                  id="cat-icon"
                  v-model="categoryForm.icon"
                  placeholder="Ex: 💻"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="cat-title">Título da Categoria</label>
                <input
                  type="text"
                  id="cat-title"
                  v-model="categoryForm.title"
                  placeholder="Ex: Front-end"
                  required
                >
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">💾 Salvar</button>
                <button type="button" @click="closeCategoryModal" class="btn btn-outline">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Modal Editar/Adicionar Skill -->
        <div v-if="showSkillModal" class="modal-overlay" @click.self="closeSkillModal">
          <div class="modal-content modal-small">
            <div class="modal-header">
              <h3 class="modal-title">{{ editingSkill ? 'Editar' : 'Adicionar' }} Habilidade</h3>
              <button @click="closeSkillModal" class="modal-close">✕</button>
            </div>
            
            <form @submit.prevent="saveSkill">
              <div class="form-group">
                <label for="skill-name">Nome da Habilidade</label>
                <input
                  type="text"
                  id="skill-name"
                  v-model="skillForm.name"
                  placeholder="Ex: Vue.js"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="skill-level">Nível de Proficiência (0-100%)</label>
                <input
                  type="number"
                  id="skill-level"
                  v-model.number="skillForm.level"
                  min="0"
                  max="100"
                  placeholder="Ex: 85"
                  required
                >
                <div class="level-preview">
                  <div class="level-bar">
                    <div class="level-fill" :style="{ width: skillForm.level + '%' }"></div>
                  </div>
                  <span>{{ skillForm.level }}%</span>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">💾 Salvar</button>
                <button type="button" @click="closeSkillModal" class="btn btn-outline">Cancelar</button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { usePortfolioStore } from '../../stores/portfolio'

export default {
  name: 'EditSkills',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const skillCategories = computed(() => portfolioStore.skillCategories)
    const showCategoryModal = ref(false)
    const showSkillModal = ref(false)
    const editingCategoryIndex = ref(null)
    const editingSkill = ref(null)
    const currentCategory = ref(null)
    const saved = ref(false)
    
    const categoryForm = ref({
      id: null,
      icon: '',
      title: ''
    })
    
    const skillForm = ref({
      id: null,
      category_id: null,
      name: '',
      level: 50
    })
    
    // Categoria
    const openAddCategoryModal = () => {
      editingCategoryIndex.value = null
      categoryForm.value = {
        id: null,
        icon: '💻',
        title: ''
      }
      showCategoryModal.value = true
    }
    
    const openCategoryModal = (index) => {
      editingCategoryIndex.value = index
      const cat = skillCategories.value[index]
      categoryForm.value = {
        id: cat.id,
        icon: cat.icon,
        title: cat.title
      }
      showCategoryModal.value = true
    }
    
    const closeCategoryModal = () => {
      showCategoryModal.value = false
      editingCategoryIndex.value = null
    }
    
    const saveCategory = async () => {
      if (editingCategoryIndex.value !== null) {
        // Editar categoria existente
        const success = await portfolioStore.updateSkillCategory(
          categoryForm.value.id,
          {
            icon: categoryForm.value.icon,
            title: categoryForm.value.title
          }
        )
        
        if (success) {
          closeCategoryModal()
          showSavedMessage()
        } else {
          alert('Erro ao salvar categoria')
        }
      } else {
        // Criar nova categoria
        const success = await portfolioStore.addSkillCategory({
          icon: categoryForm.value.icon,
          title: categoryForm.value.title
        })
        
        if (success) {
          closeCategoryModal()
          showSavedMessage()
        } else {
          alert('Erro ao criar categoria')
        }
      }
    }
    
    const deleteCategory = async (id) => {
      if (confirm('Tem certeza que deseja remover esta categoria? Todas as habilidades associadas também serão removidas.')) {
        const success = await portfolioStore.deleteSkillCategory(id)
        if (success) {
          showSavedMessage()
        } else {
          alert('Erro ao deletar categoria')
        }
      }
    }
    
    // Skill
    const openAddSkillModal = (category) => {
      editingSkill.value = null
      currentCategory.value = category
      skillForm.value = {
        id: null,
        category_id: category.id,
        name: '',
        level: 50
      }
      showSkillModal.value = true
    }
    
    const openEditSkillModal = (catIndex, skill) => {
      editingSkill.value = skill
      currentCategory.value = skillCategories.value[catIndex]
      skillForm.value = {
        id: skill.id,
        category_id: skill.category_id,
        name: skill.name,
        level: skill.level
      }
      showSkillModal.value = true
    }
    
    const closeSkillModal = () => {
      showSkillModal.value = false
      editingSkill.value = null
      currentCategory.value = null
    }
    
    const saveSkill = async () => {
      let success = false
      
      if (editingSkill.value) {
        // Editar
        success = await portfolioStore.updateSkill(skillForm.value.id, {
          name: skillForm.value.name,
          level: skillForm.value.level
        })
      } else {
        // Adicionar
        success = await portfolioStore.addSkill({
          category_id: skillForm.value.category_id,
          name: skillForm.value.name,
          level: skillForm.value.level
        })
      }
      
      if (success) {
        closeSkillModal()
        showSavedMessage()
      } else {
        alert('Erro ao salvar habilidade')
      }
    }
    
    const deleteSkill = async (id) => {
      if (confirm('Tem certeza que deseja remover esta habilidade?')) {
        const success = await portfolioStore.deleteSkill(id)
        if (success) {
          showSavedMessage()
        } else {
          alert('Erro ao deletar habilidade')
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
      skillCategories,
      showCategoryModal,
      showSkillModal,
      categoryForm,
      skillForm,
      editingSkill,
      saved,
      openAddCategoryModal,
      openCategoryModal,
      closeCategoryModal,
      saveCategory,
      deleteCategory,
      openAddSkillModal,
      openEditSkillModal,
      closeSkillModal,
      saveSkill,
      deleteSkill,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>
<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.skill-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-info strong {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.skill-level-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.skill-level-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  transition: width 0.3s ease;
}

.skill-level-text {
  font-size: 12px;
  color: #666;
}

.skill-actions {
  display: flex;
  gap: 4px;
}

.btn-mini {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-mini:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
}

.btn-mini.btn-danger:hover {
  background: #fee;
  border-color: #fcc;
}

.add-skill-btn {
  background: white;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.2s;
  width: 100%;
}

.add-skill-btn:hover {
  border-color: var(--primary-color);
  background: rgba(var(--primary-color-rgb), 0.05);
}

.modal-small {
  max-width: 500px;
}

.level-preview {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.level-bar {
  flex: 1;
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  transition: width 0.3s ease;
}

.level-preview span {
  font-weight: 600;
  color: var(--primary-color);
  min-width: 45px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 2px dashed rgba(99, 102, 241, 0.3);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 1.5rem;
  color: var(--light-text);
  margin-bottom: 0.5rem;
}

.empty-state-text {
  color: var(--gray-text);
  margin-bottom: 2rem;
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}
</style>
