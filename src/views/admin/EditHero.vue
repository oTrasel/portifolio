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
          <h2 class="content-title">Editar Hero Section</h2>
          <p class="content-subtitle">Atualize suas informações principais</p>
        </div>
        
        <div class="edit-card">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label>Foto de Perfil</label>
              <div class="photo-upload-container">
                <div class="photo-preview">
                  <div v-if="photoPreview || form.photo_url" class="preview-image">
                    <img :src="photoPreview || form.photo_url" alt="Preview" />
                  </div>
                  <div v-else class="preview-placeholder">
                    <span class="placeholder-icon">👤</span>
                    <p>Nenhuma foto</p>
                  </div>
                </div>
                <div class="photo-actions">
                  <input
                    type="file"
                    ref="photoInput"
                    accept="image/*"
                    @change="handlePhotoSelect"
                    style="display: none"
                  />
                  <button
                    type="button"
                    @click="$refs.photoInput.click()"
                    class="btn btn-outline"
                  >
                    📷 Escolher Foto
                  </button>
                  <button
                    v-if="photoPreview || form.photo_url"
                    type="button"
                    @click="removePhoto"
                    class="btn btn-outline"
                  >
                    🗑️ Remover
                  </button>
                </div>
              </div>
            </div>
          
            <div class="form-group">
              <label for="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="Seu nome completo"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="title">Título/Cargo</label>
              <input
                type="text"
                id="title"
                v-model="form.title"
                placeholder="Ex: Desenvolvedor Full Stack"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                placeholder="Breve descrição sobre você"
                required
              ></textarea>
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
  name: 'EditHero',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const form = ref({
      name: '',
      title: '',
      description: '',
      photo_url: ''
    })
    
    const photoPreview = ref('')
    const selectedPhotoFile = ref(null)
    const saved = ref(false)
    
    onMounted(() => {
      form.value = {
        name: portfolioStore.hero.name,
        title: portfolioStore.hero.title,
        description: portfolioStore.hero.description,
        photo_url: portfolioStore.hero.photo_url
      }
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
    
    const handleSave = async () => {
      try {
        // Upload da foto se houver arquivo selecionado
        if (selectedPhotoFile.value) {
          const photoUrl = await portfolioStore.uploadHeroPhoto(selectedPhotoFile.value)
          if (!photoUrl) {
            alert('Erro ao fazer upload da foto')
            return
          }
          // A foto já foi salva no banco pelo endpoint de upload
          form.value.photo_url = photoUrl
          photoPreview.value = ''
          selectedPhotoFile.value = null
        }
        
        // Salvar outras informações do hero (name, title, description, photo_url)
        const success = await portfolioStore.updateHero(form.value)
        if (!success) {
          alert('Erro ao salvar dados')
          return
        }
        
        // Recarregar dados do servidor para garantir sincronização
        await portfolioStore.fetchHero()
        form.value = {
          name: portfolioStore.hero.name,
          title: portfolioStore.hero.title,
          description: portfolioStore.hero.description,
          photo_url: portfolioStore.hero.photo_url
        }
        
        saved.value = true
        setTimeout(() => {
          saved.value = false
        }, 3000)
      } catch (error) {
        alert('Erro ao salvar alterações: ' + error.message)
      }
    }
    
    const handleReset = () => {
      form.value = {
        name: portfolioStore.hero.name,
        title: portfolioStore.hero.title,
        description: portfolioStore.hero.description,
        photo_url: portfolioStore.hero.photo_url
      }
      photoPreview.value = ''
      selectedPhotoFile.value = null
    }
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }
    
    return {
      form,
      saved,
      photoPreview,
      selectedPhotoFile,
      handlePhotoSelect,
      removePhoto,
      handleSave,
      handleReset,
      handleLogout
    }
  }
}
</script>

<style scoped src="../../styles/admin.css"></style>
