<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="login-title">
            <span class="logo-bracket">&lt;</span>
            Admin Panel
            <span class="logo-bracket">/&gt;</span>
          </h1>
          <p class="login-subtitle">Entre com suas credenciais</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Usuário</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Digite seu usuário"
              required
              autocomplete="username"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Digite sua senha"
              required
              autocomplete="current-password"
            >
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="btn btn-primary btn-login">
            Entrar
          </button>
          
          <router-link to="/" class="btn btn-outline btn-back">
            Voltar ao Site
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const username = ref('')
    const password = ref('')
    const error = ref('')
    
    const handleLogin = () => {
      error.value = ''
      
      if (authStore.login(username.value, password.value)) {
        router.push('/admin')
      } else {
        error.value = 'Usuário ou senha incorretos'
      }
    }
    
    return {
      username,
      password,
      error,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--darker-bg);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login-container {
  position: relative;
  z-index: 1;
  max-width: 450px;
  width: 100%;
}

.login-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 50px;
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--light-text);
  margin-bottom: 10px;
}

.logo-bracket {
  color: var(--primary-color);
  font-weight: 800;
}

.login-subtitle {
  color: var(--gray-text);
  font-size: 1rem;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: var(--light-text);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.form-group input {
  width: 100%;
  padding: 15px;
  background: var(--dark-bg);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  color: var(--light-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.btn-login {
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  font-size: 1.1rem;
}

.btn-back {
  width: 100%;
  text-align: center;
  padding: 15px;
}

.login-info {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.login-info p {
  color: var(--gray-text);
  margin: 5px 0;
  font-size: 0.9rem;
}

.login-info strong {
  color: var(--light-text);
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px;
  }

  .login-title {
    font-size: 1.6rem;
  }
}
</style>
