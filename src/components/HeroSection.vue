<template>
  <div class="hero">
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    
    <div class="container hero-content">
      <div class="hero-text fade-in-up">
        <h1 class="hero-greeting">Olá, eu sou</h1>
        <h2 class="hero-name">{{ hero.name }}</h2>
        <p class="hero-title">{{ hero.title }}</p>
        <p class="hero-description">
          {{ hero.description }}
        </p>
        <div class="hero-buttons">
          <a href="#contact" class="btn btn-primary">Entre em Contato</a>
          <a href="#projects" class="btn btn-outline">Ver Projetos</a>
        </div>
      </div>
      
      <div class="hero-image fade-in-up">
        <div class="image-wrapper">
          <div v-if="hero.photo_url" class="hero-photo">
            <img :src="hero.photo_url" :alt="hero.name" @error="handleImageError" />
          </div>
          <div v-else class="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

export default {
  name: 'HeroSection',
  setup() {
    const portfolioStore = usePortfolioStore()
    const hero = computed(() => portfolioStore.hero)
    
    const handleImageError = () => {
      // Silently handle image load errors
    }
    
    return {
      hero,
      handleImageError
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--gradient-1);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: var(--gradient-2);
  bottom: -100px;
  right: -100px;
  animation-delay: 2s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: var(--gradient-3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation-delay: 0.2s;
}

.hero-greeting {
  font-size: 1.5rem;
  color: var(--gray-text);
  font-weight: 500;
  margin-bottom: 10px;
}

.hero-name {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  animation: gradient 3s ease infinite;
}

.hero-title {
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--gray-text);
  line-height: 1.8;
  margin-bottom: 30px;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-image {
  animation-delay: 0.4s;
}

.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-photo {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
  border: 5px solid var(--primary-color);
  animation: float 6s ease-in-out infinite;
}

.hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: var(--gradient-1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(102, 102, 241, 0.4);
  animation: float 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.image-placeholder svg {
  width: 180px;
  height: 180px;
  color: rgba(255, 255, 255, 0.9);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 10px;
  background: var(--primary-color);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-name {
    font-size: 2.8rem;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-photo,
  .image-placeholder {
    width: 280px;
    height: 280px;
  }

  .image-placeholder svg {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: 2.2rem;
  }

  .hero-title {
    font-size: 1.4rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-photo,
  .image-placeholder {
    width: 220px;
    height: 220px;
  }
}
</style>
