<template>
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">Sobre Mim</h2>
      
      <div class="about-content">
        <div class="about-text">
          <p class="about-intro">
            Desenvolvedor Full Stack com experiência em Laravel, Vue.js, APIs REST e bancos de dados relacionais.
          </p>
          
          <p class="about-description">
            Atuo no desenvolvimento de aplicações web escaláveis, integrando back-end e front-end com foco em 
            performance e qualidade. Possuo vivência com Docker, versionamento com Git e metodologias ágeis. 
            Experiência em análise e suporte técnico, modelagem de dados e criação de relatórios em Power BI. 
            Profissional proativo, com perfil voltado à resolução de problemas e aprimoramento contínuo das práticas de desenvolvimento.
          </p>
          
          <div class="about-info">
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">trasel.lucas02@gmail.com</span>
            </div>
            <div class="info-item">
              <span class="info-label">Localização:</span>
              <span class="info-value">Porto Alegre, RS</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">
                <span class="status-indicator"></span>
                Disponível para projetos
              </span>
            </div>
          </div>
          
          <a href="#contact" class="btn btn-primary">Entre em Contato</a>
        </div>
        
        <div class="about-stats">
          <div class="stat-card">
            <div class="stat-icon">💼</div>
            <h3 class="stat-number">4+</h3>
            <p class="stat-label">Anos de Experiência</p>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🎓</div>
            <h3 class="stat-number">2</h3>
            <p class="stat-label">Formações Concluídas</p>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <h3 class="stat-number">5</h3>
            <p class="stat-label">Empresas</p>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🛠️</div>
            <h3 class="stat-number">10+</h3>
            <p class="stat-label">Tecnologias</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection'
}
</script>

<style scoped>
.about-section {
  background: var(--dark-bg);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-text {
  animation: fadeInUp 0.8s ease-out;
}

.about-intro {
  font-size: 1.3rem;
  color: var(--light-text);
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.8;
}

.about-description {
  font-size: 1.1rem;
  color: var(--gray-text);
  margin-bottom: 30px;
  line-height: 1.8;
}

.about-info {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--gray-text);
  font-weight: 500;
}

.info-value {
  color: var(--light-text);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.stat-card {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  cursor: default;
}

.stat-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.stat-label {
  color: var(--gray-text);
  font-size: 0.95rem;
  font-weight: 500;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .about-stats {
    grid-template-columns: 1fr;
  }

  .about-intro {
    font-size: 1.1rem;
  }

  .about-description {
    font-size: 1rem;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
