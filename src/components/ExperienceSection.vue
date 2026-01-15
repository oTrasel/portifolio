<template>
  <section id="experience" class="section experience-section">
    <div class="container">
      <h2 class="section-title">Experiência Profissional</h2>
      
      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in experiences" :key="index">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">{{ item.period }}</div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <h4 class="timeline-company">{{ item.company }}</h4>
            <p class="timeline-description">{{ item.description }}</p>
            <div class="timeline-tags">
              <span v-for="tech in item.technologies" :key="tech" class="tag">
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
  name: 'ExperienceSection',
  setup() {
    const portfolioStore = usePortfolioStore()
    const experiences = computed(() => portfolioStore.experiences)
    
    return {
      experiences
    }
  },
  data() {
    return {
      _experiences: [
        {
          period: 'Jul/2024 - Atual',
          title: 'Desenvolvedor Full Stack Júnior',
          company: 'DBSeller - Porto Alegre',
          description: 'Desenvolvimento de aplicações web com Laravel e Vue.js, criação de APIs RESTful e funcionalidades de backend. Modelagem e manutenção de bancos PostgreSQL, incluindo rotinas em PL/pgSQL. Resolução de problemas técnicos e entrega de soluções escaláveis.',
          technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'PL/pgSQL', 'API REST']
        },
        {
          period: 'Nov/2023 - Jul/2024',
          title: 'Analista de Suporte N2',
          company: 'Proditec Sistemas - Porto Alegre',
          description: 'Suporte avançado a sistemas corporativos. Desenvolvimento e manutenção de queries SQL (Oracle, SQL Server, PostgreSQL). Criação de páginas com PHP, JavaScript, HTML e CSS. Desenvolvimento de relatórios e dashboards em Power BI.',
          technologies: ['PHP', 'JavaScript', 'SQL', 'Power BI', 'Oracle', 'PostgreSQL']
        },
        {
          period: 'Mar/2023 - Nov/2023',
          title: 'Analista de Suporte N1',
          company: 'Proditec Sistemas - Porto Alegre',
          description: 'Atendimento a usuários e análise de chamados técnicos. Apoio no diagnóstico de problemas relacionados a banco de dados.',
          technologies: ['SQL', 'Suporte Técnico', 'Análise de Problemas']
        },
        {
          period: 'Mar/2021 - Mar/2023',
          title: 'Soldado - Suporte de TI',
          company: 'Exército Brasileiro - 1º Centro de Geoinformação',
          description: 'Suporte em software, hardware e redes para toda a organização. Manutenção preventiva e corretiva de sistemas.',
          technologies: ['Suporte Técnico', 'Hardware', 'Redes', 'Manutenção']
        },
        {
          period: 'Nov/2020 - Mar/2021',
          title: 'Estagiário de TI',
          company: 'Análise de Sistemas - Porto Alegre',
          description: 'Criação e manutenção de queries SQL. Desenvolvimento de relatórios personalizados utilizando Report Designer – MV.',
          technologies: ['SQL', 'Report Designer', 'MV']
        }
      ]
    }
  }
}
</script>

<style scoped>
.experience-section {
  background: var(--darker-bg);
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  padding-left: 60px;
  animation: fadeInUp 0.8s ease-out;
}

.timeline-item:nth-child(2) {
  animation-delay: 0.2s;
}

.timeline-item:nth-child(3) {
  animation-delay: 0.4s;
}

.timeline-marker {
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 4px solid var(--darker-bg);
  z-index: 1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.3);
  box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.3);
}

.timeline-content {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  cursor: default;
}

.timeline-content:hover {
  transform: translateX(10px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.timeline-date {
  display: inline-block;
  background: var(--gradient-1);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-text);
  margin-bottom: 8px;
}

.timeline-company {
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 15px;
}

.timeline-description {
  color: var(--gray-text);
  line-height: 1.8;
  margin-bottom: 20px;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 15px;
  }

  .timeline-item {
    padding-left: 45px;
  }

  .timeline-marker {
    left: 6px;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-title {
    font-size: 1.3rem;
  }
}
</style>
