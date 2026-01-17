import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    hero: {
      name: '',
      title: '',
      description: '',
      photo_url: ''
    },
    
    about: {
      intro: '',
      description: '',
      email: '',
      location: '',
      stats: []
    },
    
    experiences: [],
    skillCategories: [],
    projects: [],
    
    contact: {
      email: '',
      github: '',
      linkedin: '',
      location: ''
    },

    footer: {
      description: '',
      github: '',
      linkedin: '',
      email: ''
    },

    colors: {
      primary_color: '#6366f1',
      secondary_color: '#8b5cf6',
      accent_color: '#ec4899',
      dark_bg: '#0f172a',
      darker_bg: '#020617',
      light_text: '#f1f5f9',
      gray_text: '#94a3b8',
      card_bg: '#1e293b'
    },

    sectionVisibility: [],

    loading: false,
    error: null
  }),
  
  actions: {
    // ========== HERO ==========
    async fetchHero() {
      try {
        const response = await fetch('/api/portfolio/hero')
        const data = await response.json()
        this.hero = data
      } catch (error) {
        this.error = error.message
      }
    },

    async updateHero(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/hero', {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          this.hero = { ...this.hero, ...data }
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== ABOUT ==========
    async fetchAbout() {
      try {
        const response = await fetch('/api/portfolio/about')
        const data = await response.json()
        this.about = data
      } catch (error) {
        this.error = error.message
      }
    },

    async updateAbout(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/about', {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          this.about = { ...this.about, ...data }
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async addAboutStat(stat) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/about/stats', {
          method: 'POST',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(stat)
        })
        
        if (response.ok) {
          const result = await response.json()
          await this.fetchAbout()
          return result.id
        }
        return false
      } catch (error) {
        return false
      }
    },

    async updateAboutStat(id, stat) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/about/stats/${id}`, {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(stat)
        })
        
        if (response.ok) {
          await this.fetchAbout()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async deleteAboutStat(id) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/about/stats/${id}`, {
          method: 'DELETE',
          headers: authStore.getAuthHeaders()
        })
        
        if (response.ok) {
          await this.fetchAbout()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async uploadHeroPhoto(file) {
      const authStore = useAuthStore()
      try {
        const formData = new FormData()
        formData.append('photo', file)
        
        const response = await fetch('/api/portfolio/hero/upload-photo', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          },
          body: formData
        })
        
        const data = await response.json()
        
        if (response.ok && data.success) {
          await this.fetchHero()
          return data.photo_url
        }
        return null
      } catch (error) {
        return null
      }
    },

    // ========== EXPERIENCES ==========
    async fetchExperiences() {
      try {
        const response = await fetch('/api/portfolio/experiences')
        const data = await response.json()
        this.experiences = data
      } catch (error) {
        this.error = error.message
      }
    },

    async addExperience(experience) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/experiences', {
          method: 'POST',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(experience)
        })
        
        if (response.ok) {
          await this.fetchExperiences()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async updateExperience(id, experience) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/experiences/${id}`, {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(experience)
        })
        
        if (response.ok) {
          await this.fetchExperiences()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async deleteExperience(id) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/experiences/${id}`, {
          method: 'DELETE',
          headers: authStore.getAuthHeaders()
        })
        
        if (response.ok) {
          await this.fetchExperiences()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== SKILLS ==========
    async fetchSkills() {
      try {
        const response = await fetch('/api/portfolio/skills')
        const data = await response.json()
        this.skillCategories = data
      } catch (error) {
        this.error = error.message
      }
    },

    async updateSkillCategory(id, data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/skills/categories/${id}`, {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async addSkillCategory(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/skills/categories', {
          method: 'POST',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async deleteSkillCategory(id) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/skills/categories/${id}`, {
          method: 'DELETE',
          headers: authStore.getAuthHeaders()
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async updateSkill(id, data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/skills/${id}`, {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async addSkill(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/skills', {
          method: 'POST',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async deleteSkill(id) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/skills/${id}`, {
          method: 'DELETE',
          headers: authStore.getAuthHeaders()
        })
        
        if (response.ok) {
          await this.fetchSkills()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== PROJECTS ==========
    async fetchProjects() {
      try {
        const response = await fetch('/api/portfolio/projects')
        const data = await response.json()
        this.projects = data
      } catch (error) {
        this.error = error.message
      }
    },

    async addProject(project) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/projects', {
          method: 'POST',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(project)
        })
        
        if (response.ok) {
          await this.fetchProjects()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async updateProject(id, project) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/projects/${id}`, {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(project)
        })
        
        if (response.ok) {
          await this.fetchProjects()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async deleteProject(id) {
      const authStore = useAuthStore()
      try {
        const response = await fetch(`/api/portfolio/projects/${id}`, {
          method: 'DELETE',
          headers: authStore.getAuthHeaders()
        })
        
        if (response.ok) {
          await this.fetchProjects()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== CONTACT ==========
    async fetchContact() {
      try {
        const response = await fetch('/api/portfolio/contact')
        const data = await response.json()
        this.contact = data
      } catch (error) {
        this.error = error.message
      }
    },

    async updateContact(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/contact', {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          this.contact = { ...this.contact, ...data }
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== FOOTER ==========
    async fetchFooter() {
      try {
        const response = await fetch('/api/portfolio/footer')
        const data = await response.json()
        this.footer = data
      } catch (error) {
        this.error = error.message
      }
    },

    async updateFooter(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/footer', {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          await this.fetchFooter()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== SECTION VISIBILITY ==========
    async fetchSectionVisibility() {
      try {
        const response = await fetch('/api/portfolio/settings/visibility')
        if (response.ok) {
          this.sectionVisibility = await response.json()
          return true
        }
        return false
      } catch (error) {

        return false
      }
    },

    async updateSectionVisibility(key, isVisible) {
      try {
        const authStore = useAuthStore()
        const response = await fetch(`/api/portfolio/settings/visibility/${key}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({ is_visible: isVisible })
        })

        if (response.ok) {
          await this.fetchSectionVisibility()
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    isSectionVisible(key) {
      const section = this.sectionVisibility.find(s => s.section_key === key)
      return section ? section.is_visible === 1 : true
    },

    // ========== CORES ==========
    async fetchColors() {
      try {
        const response = await fetch('/api/portfolio/colors')
        const data = await response.json()
        if (data && Object.keys(data).length > 0) {
          this.colors = data
        }
      } catch (error) {
        this.error = error.message
      }
    },

    async updateColors(data) {
      const authStore = useAuthStore()
      try {
        const response = await fetch('/api/portfolio/colors', {
          method: 'PUT',
          headers: authStore.getAuthHeaders(),
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          this.colors = { ...this.colors, ...data }
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========== INICIALIZAÇÃO ==========
    async initializeData() {
      this.loading = true
      try {
        await Promise.all([
          this.fetchHero(),
          this.fetchAbout(),
          this.fetchExperiences(),
          this.fetchSkills(),
          this.fetchProjects(),
          this.fetchContact(),
          this.fetchFooter(),
          this.fetchSectionVisibility(),
          this.fetchColors()
        ])
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
