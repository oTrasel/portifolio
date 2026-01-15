<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <h2 class="section-title">Habilidades & Tecnologias</h2>
      
      <div class="skills-grid">
        <div class="skill-category" v-for="(category, index) in skillCategories" :key="index">
          <div class="category-icon">{{ category.icon }}</div>
          <h3 class="category-title">{{ category.title }}</h3>
          <div class="skills-list">
            <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

export default {
  name: 'SkillsSection',
  setup() {
    const portfolioStore = usePortfolioStore()
    const skillCategories = computed(() => portfolioStore.skillCategories)
    
    return {
      skillCategories
    }
  },
  data() {
    return {
      _skillCategories: [
        {
          icon: '💻',
          title: 'Front-end',
          skills: [
            { name: 'Vue.js', level: 85 },
            { name: 'JavaScript', level: 85 },
            { name: 'HTML/CSS', level: 90 },
            { name: 'Responsive Design', level: 85 }
          ]
        },
        {
          icon: '⚙️',
          title: 'Back-end',
          skills: [
            { name: 'PHP', level: 85 },
            { name: 'Laravel', level: 85 },
            { name: 'PostgreSQL', level: 85 },
            { name: 'PL/pgSQL', level: 80 },
            { name: 'API REST', level: 85 }
          ]
        },
        {
          icon: '🗄️',
          title: 'Banco de Dados',
          skills: [
            { name: 'PostgreSQL', level: 85 },
            { name: 'Oracle SQL', level: 80 },
            { name: 'SQL Server', level: 80 },
            { name: 'Modelagem de Dados', level: 75 }
          ]
        },
        {
          icon: '🛠️',
          title: 'Ferramentas & DevOps',
          skills: [
            { name: 'Git', level: 85 },
            { name: 'Docker', level: 75 },
            { name: 'Power BI', level: 80 },
            { name: 'Metodologias Ágeis', level: 80 }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.skills-section {
  background: var(--dark-bg);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.skill-category {
  background: var(--card-bg);
  padding: 35px;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
}

.skill-category:nth-child(2) {
  animation-delay: 0.1s;
}

.skill-category:nth-child(3) {
  animation-delay: 0.2s;
}

.skill-category:nth-child(4) {
  animation-delay: 0.3s;
}

.skill-category:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.2);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-text);
  margin-bottom: 25px;
  text-align: center;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  width: 100%;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 600;
  color: var(--light-text);
  font-size: 0.95rem;
}

.skill-level {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.9rem;
}

.skill-bar {
  height: 8px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.skill-progress {
  height: 100%;
  background: var(--gradient-1);
  border-radius: 10px;
  transition: width 1s ease-out;
  position: relative;
  overflow: hidden;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skill-category {
    padding: 25px;
  }
}
</style>
