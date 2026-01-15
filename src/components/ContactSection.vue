<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <h2 class="section-title">Entre em Contato</h2>
      <p class="contact-subtitle">
        Tem algum projeto em mente? Vamos conversar!
      </p>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-card">
            <div class="contact-icon">📧</div>
            <h3>Email</h3>
            <p>trasel.lucas02@gmail.com</p>
            <a href="mailto:trasel.lucas02@gmail.com" class="contact-link">Enviar email</a>
          </div>
          
          <div class="contact-card">
            <div class="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/lucastrasel</p>
            <a href="https://linkedin.com/in/lucastrasel" target="_blank" class="contact-link">Ver perfil</a>
          </div>
          
          <div class="contact-card">
            <div class="contact-icon">📍</div>
            <h3>Localização</h3>
            <p>Porto Alegre, RS</p>
            <p class="location-detail">Disponível para remoto</p>
          </div>
          
          <div class="social-links">
            <a href="https://github.com/oTrasel" target="_blank" class="social-link" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/lucastrasel" target="_blank" class="social-link" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:trasel.lucas02@gmail.com" class="social-link" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
        
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Seu nome completo">
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required placeholder="seu.email@example.com">
          </div>
          
          <div class="form-group">
            <label for="subject">Assunto</label>
            <input type="text" id="subject" v-model="form.subject" required placeholder="Assunto da mensagem">
          </div>
          
          <div class="form-group">
            <label for="message">Mensagem</label>
            <textarea id="message" v-model="form.message" required rows="5" placeholder="Sua mensagem..."></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary btn-submit">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // Aqui você pode adicionar a lógica para enviar o formulário
      console.log('Formulário enviado:', this.form);
      alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      this.form = { name: '', email: '', subject: '', message: '' };
    }
  }
}
</script>

<style scoped>
.contact-section {
  background: var(--dark-bg);
}

.contact-subtitle {
  text-align: center;
  color: var(--gray-text);
  font-size: 1.2rem;
  margin-bottom: 60px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 50px;
  max-width: 1100px;
  margin: 0 auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-card {
  background: var(--card-bg);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.contact-card h3 {
  font-size: 1.2rem;
  color: var(--light-text);
  margin-bottom: 8px;
}

.contact-card p {
  color: var(--gray-text);
  margin-bottom: 10px;
}

.location-detail {
  font-size: 0.9rem;
  color: var(--primary-color);
}

.contact-link {
  display: inline-block;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  margin-top: 5px;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: var(--secondary-color);
  transform: translateX(5px);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  width: 50px;
  height: 50px;
  background: var(--card-bg);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.contact-form {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  animation: fadeInUp 0.8s ease-out;
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  background: var(--dark-bg);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  color: var(--light-text);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 20px;
  }

  .form-group input,
  .form-group textarea {
    padding: 12px;
  }
}
</style>
