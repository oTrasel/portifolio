<template>
  <div class="admin-page">
    <nav class="admin-navbar">
      <div class="admin-nav-container">
        <h1 class="admin-logo">
          <span class="logo-bracket">&lt;</span>
          Cores do Site
          <span class="logo-bracket">/&gt;</span>
        </h1>
        <div class="admin-nav-actions">
          <router-link to="/admin" class="btn btn-outline">Voltar</router-link>
          <button @click="handleSave" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Salvar Cores' }}
          </button>
        </div>
      </div>
    </nav>
    
    <div class="admin-container">
      <main class="admin-content-full">
        <div v-if="success" class="alert alert-success">
          ✓ Cores atualizadas com sucesso!
        </div>
        
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <!-- Paletas Sugeridas -->
        <div class="palettes-section">
          <h3 class="section-title">🎨 Paletas Sugeridas</h3>
          <p class="section-description">Escolha uma paleta de cores pronta ou personalize a sua</p>
          
          <div class="palettes-grid">
            <div 
              v-for="palette in colorPalettes" 
              :key="palette.name"
              class="palette-card"
              @click="applyPalette(palette)"
            >
              <div class="palette-header">
                <h4 class="palette-name">{{ palette.name }}</h4>
              </div>
              <div class="palette-colors">
                <div 
                  v-for="(color, key) in palette.colors" 
                  :key="key"
                  class="palette-color"
                  :style="{ backgroundColor: color }"
                  :title="key"
                ></div>
              </div>
              <button class="btn-apply">Aplicar</button>
            </div>
          </div>
        </div>

        <div class="colors-grid">
          <!-- Cores Principais -->
          <div class="color-section">
            <h3 class="section-title">Cores Principais</h3>
            
            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Cor Primária</span>
                <span class="color-description">Cor principal do tema (botões, links, destaques)</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.primary_color"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.primary_color"
                  class="color-text"
                  placeholder="#6366f1"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.primary_color }"></div>
              </div>
            </div>

            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Cor Secundária</span>
                <span class="color-description">Cor de apoio (gradientes, destaques secundários)</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.secondary_color"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.secondary_color"
                  class="color-text"
                  placeholder="#8b5cf6"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.secondary_color }"></div>
              </div>
            </div>

            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Cor de Destaque</span>
                <span class="color-description">Cor para elementos importantes (CTAs, badges)</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.accent_color"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.accent_color"
                  class="color-text"
                  placeholder="#ec4899"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.accent_color }"></div>
              </div>
            </div>
          </div>

          <!-- Cores de Fundo -->
          <div class="color-section">
            <h3 class="section-title">Cores de Fundo</h3>
            
            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Fundo Escuro</span>
                <span class="color-description">Cor de fundo principal das seções</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.dark_bg"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.dark_bg"
                  class="color-text"
                  placeholder="#0f172a"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.dark_bg }"></div>
              </div>
            </div>

            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Fundo Mais Escuro</span>
                <span class="color-description">Cor de fundo do body e seções alternadas</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.darker_bg"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.darker_bg"
                  class="color-text"
                  placeholder="#020617"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.darker_bg }"></div>
              </div>
            </div>

            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Fundo de Cards</span>
                <span class="color-description">Cor de fundo dos cards e elementos elevados</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.card_bg"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.card_bg"
                  class="color-text"
                  placeholder="#1e293b"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.card_bg }"></div>
              </div>
            </div>
          </div>

          <!-- Cores de Texto -->
          <div class="color-section">
            <h3 class="section-title">Cores de Texto</h3>
            
            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Texto Claro</span>
                <span class="color-description">Cor principal do texto</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.light_text"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.light_text"
                  class="color-text"
                  placeholder="#f1f5f9"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.light_text }"></div>
              </div>
            </div>

            <div class="color-item">
              <label class="color-label">
                <span class="label-text">Texto Cinza</span>
                <span class="color-description">Cor para textos secundários e legendas</span>
              </label>
              <div class="color-input-group">
                <input 
                  type="color" 
                  v-model="formData.gray_text"
                  class="color-picker"
                />
                <input 
                  type="text" 
                  v-model="formData.gray_text"
                  class="color-text"
                  placeholder="#94a3b8"
                />
                <div class="color-preview" :style="{ backgroundColor: formData.gray_text }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="resetToDefaults" class="btn btn-secondary">
            Restaurar Padrões
          </button>
          <button @click="handleSave" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Salvar Cores' }}
          </button>
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
  name: 'EditColors',
  setup() {
    const router = useRouter()
    const portfolioStore = usePortfolioStore()
    const authStore = useAuthStore()

    const formData = ref({
      primary_color: '#6366f1',
      secondary_color: '#8b5cf6',
      accent_color: '#ec4899',
      dark_bg: '#0f172a',
      darker_bg: '#020617',
      light_text: '#f1f5f9',
      gray_text: '#94a3b8',
      card_bg: '#1e293b'
    })

    const loading = ref(false)
    const success = ref(false)
    const error = ref(null)

    const colorPalettes = ref([
      {
        name: '🔵 Azul Índigo (Padrão)',
        colors: {
          primary_color: '#6366f1',
          secondary_color: '#8b5cf6',
          accent_color: '#ec4899',
          dark_bg: '#0f172a',
          darker_bg: '#020617',
          light_text: '#f1f5f9',
          gray_text: '#94a3b8',
          card_bg: '#1e293b'
        }
      },
      {
        name: '🟢 Verde Esmeralda',
        colors: {
          primary_color: '#10b981',
          secondary_color: '#14b8a6',
          accent_color: '#22d3ee',
          dark_bg: '#0f172a',
          darker_bg: '#020617',
          light_text: '#f1f5f9',
          gray_text: '#94a3b8',
          card_bg: '#1e293b'
        }
      },
      {
        name: '🟠 Laranja Energia',
        colors: {
          primary_color: '#f97316',
          secondary_color: '#ef4444',
          accent_color: '#fbbf24',
          dark_bg: '#0f172a',
          darker_bg: '#020617',
          light_text: '#f1f5f9',
          gray_text: '#94a3b8',
          card_bg: '#1e293b'
        }
      },
      {
        name: '🟣 Roxo Místico',
        colors: {
          primary_color: '#a855f7',
          secondary_color: '#ec4899',
          accent_color: '#f472b6',
          dark_bg: '#0f172a',
          darker_bg: '#020617',
          light_text: '#f1f5f9',
          gray_text: '#94a3b8',
          card_bg: '#1e293b'
        }
      },
      {
        name: '🔵 Ciano Tecnológico',
        colors: {
          primary_color: '#06b6d4',
          secondary_color: '#3b82f6',
          accent_color: '#8b5cf6',
          dark_bg: '#0f172a',
          darker_bg: '#020617',
          light_text: '#f1f5f9',
          gray_text: '#94a3b8',
          card_bg: '#1e293b'
        }
      }
    ])

    const applyPalette = (palette) => {
      formData.value = { ...palette.colors }
      success.value = true
      setTimeout(() => {
        success.value = false
      }, 2000)
    }

    onMounted(async () => {
      if (!authStore.isAuthenticated) {
        router.push('/login')
        return
      }
      
      await portfolioStore.fetchColors()
      formData.value = { ...portfolioStore.colors }
    })

    const handleSave = async () => {
      loading.value = true
      success.value = false
      error.value = null

      try {
        const result = await portfolioStore.updateColors(formData.value)
        if (result) {
          success.value = true
          setTimeout(() => {
            success.value = false
          }, 3000)
        } else {
          error.value = 'Erro ao salvar cores'
        }
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const resetToDefaults = () => {
      formData.value = {
        primary_color: '#6366f1',
        secondary_color: '#8b5cf6',
        accent_color: '#ec4899',
        dark_bg: '#0f172a',
        darker_bg: '#020617',
        light_text: '#f1f5f9',
        gray_text: '#94a3b8',
        card_bg: '#1e293b'
      }
    }

    return {
      formData,
      loading,
      success,
      error,
      colorPalettes,
      handleSave,
      resetToDefaults,
      applyPalette
    }
  }
}
</script>

<style scoped>
.admin-content-full {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.palettes-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-description {
  color: var(--gray-text);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.palettes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.palette-card {
  background: var(--dark-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.palette-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.palette-header {
  margin-bottom: 0.75rem;
}

.palette-name {
  color: var(--light-text);
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.palette-colors {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.palette-color {
  aspect-ratio: 1;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-apply {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-apply:hover {
  background: var(--primary-color);
  color: white;
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.color-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  color: var(--light-text);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
}

.color-item {
  margin-bottom: 1.5rem;
}

.color-item:last-child {
  margin-bottom: 0;
}

.color-label {
  display: block;
  margin-bottom: 0.75rem;
}

.label-text {
  display: block;
  color: var(--light-text);
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.color-description {
  display: block;
  color: var(--gray-text);
  font-size: 0.85rem;
}

.color-input-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--dark-bg);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.color-picker {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: none;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}

.color-text {
  flex: 1;
  padding: 0.75rem;
  background: var(--darker-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: var(--light-text);
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.color-text:focus {
  outline: none;
  border-color: var(--primary-color);
}

.color-preview {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: var(--primary-color);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

@media (max-width: 768px) {
  .palettes-grid {
    grid-template-columns: 1fr;
  }
  
  .colors-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .color-input-group {
    flex-wrap: wrap;
  }
}
</style>
