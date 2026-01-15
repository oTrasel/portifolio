<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <h2 class="section-title">Projetos em Destaque</h2>
      
      <div class="projects-grid">
        <div class="project-card" v-for="(project, index) in projects" :key="index">
          <div class="project-image">
            <div class="project-overlay">
              <a :href="project.demo" target="_blank" class="project-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Ver Demo
              </a>
              <a :href="project.github" target="_blank" class="project-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            <div class="project-placeholder">{{ project.icon }}</div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
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
  name: 'ProjectsSection',
  setup() {
    const portfolioStore = usePortfolioStore()
    const projects = computed(() => portfolioStore.projects)
    
    return {
      projects
    }
  },
  data() {
    return {
      _projects: [
        {
          title: 'Sistema Web Corporativo',
          description: 'Aplicação web completa desenvolvida com Laravel e Vue.js, incluindo APIs RESTful, autenticação de usuários e painel administrativo.',
          technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'API REST'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '💼'
        },
        {
          title: 'Dashboards Power BI',
          description: 'Criação de dashboards interativos e relatórios personalizados para análise de dados corporativos com integração a múltiplas fontes de dados.',
          technologies: ['Power BI', 'SQL', 'PostgreSQL', 'Oracle'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '📊'
        },
        {
          title: 'Rotinas PL/pgSQL',
          description: 'Desenvolvimento de procedures, functions e triggers para otimização de processos de banco de dados PostgreSQL.',
          technologies: ['PostgreSQL', 'PL/pgSQL', 'SQL'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '🗄️'
        },
        {
          title: 'Sistema de Suporte Técnico',
          description: 'Desenvolvimento de páginas web para sistema de suporte com PHP, JavaScript e integração com banco de dados.',
          technologies: ['PHP', 'JavaScript', 'HTML/CSS', 'SQL'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '🛠️'
        },
        {
          title: 'Projeto Java - POO',
          description: 'Aplicação Java completa desenvolvida durante curso de especialização, aplicando conceitos de Programação Orientada a Objetos.',
          technologies: ['Java', 'POO', 'Maven'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '☕'
        },
        {
          title: 'Projeto C# - POO',
          description: 'Desenvolvimento de aplicação desktop em C# aplicando princípios SOLID e padrões de projeto orientado a objetos.',
          technologies: ['C#', '.NET', 'POO'],
          demo: '#',
          github: 'https://github.com/oTrasel',
          icon: '🔷'
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects-section {
  background: var(--darker-bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.project-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
}

.project-card:nth-child(2) {
  animation-delay: 0.1s;
}

.project-card:nth-child(3) {
  animation-delay: 0.2s;
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--gradient-1);
}

.project-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  background: var(--gradient-1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-btn {
  padding: 12px 20px;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.project-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-3px);
}

.project-btn svg {
  width: 18px;
  height: 18px;
}

.project-content {
  padding: 25px;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--light-text);
  margin-bottom: 12px;
}

.project-description {
  color: var(--gray-text);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-overlay {
    opacity: 1;
    background: rgba(15, 23, 42, 0.85);
  }
}
</style>
