<template>
  <div class="admin-page">
    <nav class="admin-navbar">
      <div class="admin-nav-container">
        <h1 class="admin-logo">
          <span class="logo-bracket">&lt;</span>
          Admin Panel
          <span class="logo-bracket">/&gt;</span>
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
            <router-link to="/admin/colors" class="menu-item">
              <span class="menu-icon">🎨</span>
              Cores do Site
            </router-link>
          </li>
          <li>
            <router-link to="/admin/visibility" class="menu-item">
              <span class="menu-icon">⚙️</span>
              Visibilidade
            </router-link>
          </li>
        </ul>
      </aside>
      
      <main class="admin-content">
        <div class="welcome-card">
          <h2 class="welcome-title">Bem-vindo ao Painel Administrativo!</h2>
          <p class="welcome-text">
            Aqui você pode gerenciar todo o conteúdo do seu portfólio de forma dinâmica.
          </p>
          
          <div class="quick-stats">
            <div class="stat-box">
              <div class="stat-icon">💼</div>
              <div class="stat-info">
                <div class="stat-number">{{ portfolioStore.experiences.length }}</div>
                <div class="stat-label">Experiências</div>
              </div>
            </div>
            
            <div class="stat-box">
              <div class="stat-icon">🛠️</div>
              <div class="stat-info">
                <div class="stat-number">{{ portfolioStore.skillCategories.length }}</div>
                <div class="stat-label">Categorias de Skills</div>
              </div>
            </div>
            
            <div class="stat-box">
              <div class="stat-icon">🚀</div>
              <div class="stat-info">
                <div class="stat-number">{{ portfolioStore.projects.length }}</div>
                <div class="stat-label">Projetos</div>
              </div>
            </div>
          </div>
          
          <div class="action-cards">
            <router-link to="/admin/hero" class="action-card">
              <div class="action-icon">🎯</div>
              <h3>Editar Hero</h3>
              <p>Altere nome, título e descrição principal</p>
            </router-link>
            
            <router-link to="/admin/experiences" class="action-card">
              <div class="action-icon">💼</div>
              <h3>Gerenciar Experiências</h3>
              <p>Adicione ou edite suas experiências profissionais</p>
            </router-link>
            
            <router-link to="/admin/projects" class="action-card">
              <div class="action-icon">🚀</div>
              <h3>Gerenciar Projetos</h3>
              <p>Adicione ou edite seus projetos</p>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { usePortfolioStore } from '../../stores/portfolio'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const portfolioStore = usePortfolioStore()
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }
    
    return {
      handleLogout,
      portfolioStore
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: var(--darker-bg);
}

.admin-navbar {
  background: var(--dark-bg);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-text);
}

.logo-bracket {
  color: var(--primary-color);
}

.admin-nav-actions {
  display: flex;
  gap: 15px;
}

.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  padding: 30px;
}

.admin-sidebar {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 25px;
  height: fit-content;
  position: sticky;
  top: 100px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--light-text);
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.menu-divider {
  height: 1px;
  background: rgba(99, 102, 241, 0.2);
  margin: 15px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: var(--gray-text);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.menu-item:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--light-text);
}

.menu-item.router-link-active {
  background: var(--primary-color);
  color: white;
}

.menu-icon {
  font-size: 1.2rem;
}

.admin-content {
  animation: fadeInUp 0.6s ease-out;
}

.welcome-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--light-text);
  margin-bottom: 15px;
}

.welcome-text {
  color: var(--gray-text);
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-box {
  background: var(--dark-bg);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--light-text);
}

.stat-label {
  color: var(--gray-text);
  font-size: 0.9rem;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.action-card {
  background: var(--dark-bg);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 15px;
  padding: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.action-card h3 {
  color: var(--light-text);
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.action-card p {
  color: var(--gray-text);
  font-size: 0.9rem;
}

@media (max-width: 968px) {
  .admin-container {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
  }
}
</style>
