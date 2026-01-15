import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null
  }),
  
  actions: {
    async login(username, password) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          this.isAuthenticated = true
          this.user = data.user
          this.token = data.token
          localStorage.setItem('authToken', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          return true
        }
        return false
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        return false
      }
    },
    
    logout() {
      this.isAuthenticated = false
      this.user = null
      this.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
    
    checkAuth() {
      const token = localStorage.getItem('authToken')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        this.isAuthenticated = true
        this.token = token
        this.user = JSON.parse(userStr)
      }
    },

    getAuthHeaders() {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }
})
