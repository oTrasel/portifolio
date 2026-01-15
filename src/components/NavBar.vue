<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container nav-container">
      <a href="#" class="logo">
        <span class="logo-bracket">&lt;</span>
        {{ portfolioStore.hero.name || 'Portfolio' }}
        <span class="logo-bracket">/&gt;</span>
      </a>
      
      <button class="menu-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul class="nav-links" :class="{ 'active': isMenuOpen }">
        <li><a href="#" @click="closeMenu">Início</a></li>
        <li v-if="isSectionVisible('about')"><a href="#about" @click="closeMenu">Sobre</a></li>
        <li v-if="isSectionVisible('experiences')"><a href="#experience" @click="closeMenu">Experiência</a></li>
        <li v-if="isSectionVisible('skills')"><a href="#skills" @click="closeMenu">Habilidades</a></li>
        <li v-if="isSectionVisible('projects')"><a href="#projects" @click="closeMenu">Projetos</a></li>
        <li v-if="isSectionVisible('contact')"><a href="#contact" @click="closeMenu">Contato</a></li>
      </ul>
      
      <router-link to="/login" class="admin-btn" title="Admin">
        ⚙️
      </router-link>
    </div>
  </nav>
</template>

<script>
import { usePortfolioStore } from '../stores/portfolio'

export default {
  name: 'NavBar',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    }
  },
  setup() {
    const portfolioStore = usePortfolioStore()
    return { portfolioStore }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    isSectionVisible(key) {
      return this.portfolioStore.isSectionVisible(key)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-text);
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  color: var(--primary-color);
}

.logo-bracket {
  color: var(--primary-color);
  font-weight: 800;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 35px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a:hover::after {
  width: 100%;
}

.admin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--gray-text);
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.admin-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  opacity: 1;
  transform: rotate(90deg);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--light-text);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(10px);
    padding: 30px;
    gap: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .nav-links.active {
    transform: translateX(0);
  }

  .nav-links a {
    font-size: 1.2rem;
  }

  .nav-links a::after {
    bottom: -8px;
  }
}
</style>
