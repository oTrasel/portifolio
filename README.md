# 🎨 Portfolio Dinâmico - Full Stack

Portfolio pessoal profissional com painel administrativo completo. Sistema full-stack que permite gerenciar todo o conteúdo do site de forma dinâmica através de uma interface administrativa intuitiva.

## 📌 Sobre o Projeto

Este é um sistema de portfolio moderno e totalmente personalizável, desenvolvido com Vue.js no frontend e Node.js + SQLite no backend. Diferente de portfolios estáticos, todos os dados são gerenciados através de um banco de dados e podem ser editados facilmente pelo painel admin, sem necessidade de alterar código.

### ✨ Características Principais

- 🎯 **Totalmente Dinâmico**: Todo conteúdo é editável pelo painel admin
- 🔐 **Sistema de Autenticação**: Login seguro com JWT
- 💾 **Banco de Dados SQLite**: Armazenamento persistente de dados
- 📱 **Responsivo**: Design adaptável para todos os dispositivos
- 🎨 **Interface Moderna**: Design clean com gradientes e animações
- ⚙️ **Controle de Visibilidade**: Habilite/desabilite seções conforme necessário
- 🚀 **Performance**: Build otimizado com Vite

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3** - Framework JavaScript progressivo
- **Vue Router 4** - Roteamento e navegação
- **Pinia** - Gerenciamento de estado
- **Vite** - Build tool e dev server

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Banco de dados relacional
- **JWT** - Autenticação segura
- **bcryptjs** - Hash de senhas

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Git (opcional)

## 🚀 Instalação e Configuração

### 1. Clone ou baixe o projeto

```bash
git clone [seu-repositorio]
cd portfolio
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

Edite o arquivo `backend/.env` e configure suas credenciais de admin:

```env
PORT=3000
JWT_SECRET=sua-chave-secreta-aqui
NODE_ENV=development

# Credenciais do Administrador
ADMIN_USERNAME=seu_usuario
ADMIN_PASSWORD=sua_senha_segura
```

> ⚠️ **Importante**: Altere o `JWT_SECRET`, `ADMIN_USERNAME` e `ADMIN_PASSWORD` para valores seguros!

### 4. Inicie o servidor Backend

```bash
npm start
# ou para desenvolvimento com auto-reload
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 5. Instale as dependências do Frontend

Em outro terminal:

```bash
cd ..
npm install
```

### 6. Inicie o servidor Frontend

```bash
npm run dev
```

Acesse em: `http://localhost:5173`

## 🎯 Como Usar

### Primeiro Acesso

1. **Acesse o site**: Abra `http://localhost:5173`
2. **Clique no ícone ⚙️** (canto superior direito) para acessar o admin
3. **Faça login** com as credenciais configuradas no `.env`
4. **Preencha suas informações** em cada seção do painel

### Estrutura do Banco de Dados

O banco de dados é criado automaticamente na primeira execução e contém as seguintes tabelas:

- `users` - Usuário administrador
- `hero` - Seção principal (nome, título, descrição)
- `about` - Sobre você (intro, descrição, email, localização)
- `about_stats` - Estatísticas da seção sobre
- `experiences` - Experiências profissionais
- `skill_categories` - Categorias de habilidades
- `skills` - Habilidades técnicas com níveis
- `projects` - Projetos do portfolio
- `contact` - Informações de contato
- `footer` - Conteúdo do rodapé
- `section_visibility` - Controle de visibilidade das seções

## 🎨 Painel Administrativo

### Seções Disponíveis

#### 🎯 Hero Section
Edite o banner principal do site:
- Nome
- Título profissional
- Descrição/especialidades

#### 👨‍💻 Sobre Mim
Adicione suas informações pessoais:
- Introdução curta
- Descrição detalhada
- Email e localização
- Estatísticas (anos de experiência, formações, etc)

#### 💼 Experiências
Gerencie seu histórico profissional:
- Empresa
- Cargo
- Período
- Descrição das atividades
- Ordenação personalizável

#### 🎯 Habilidades
Organize suas skills por categorias:
- Criar categorias (Frontend, Backend, etc)
- Adicionar habilidades
- Definir nível de proficiência (0-100%)
- Ícones personalizáveis

#### 🚀 Projetos
Showcase dos seus projetos:
- Título e descrição
- Tecnologias utilizadas
- Links (demo e GitHub)
- Ícone do projeto

#### 📧 Contato
Informações de contato:
- Email
- GitHub
- LinkedIn
- Localização

#### 📄 Footer
Configure o rodapé do site:
- Descrição
- Links sociais
- Email

#### ⚙️ Visibilidade
Controle quais seções aparecem no site:
- Ative/desative seções
- Links da navbar são atualizados automaticamente

### 🔄 Fluxo de Trabalho

1. **Login** → Acesse com suas credenciais
2. **Dashboard** → Visão geral com estatísticas
3. **Editar Seções** → Navegue pelo menu lateral
4. **Salvar** → Alterações são aplicadas imediatamente
5. **Visualizar** → Clique em "Ver Site" para conferir

## 📁 Estrutura do Projeto

```
portfolio/
├── backend/
│   ├── database.js          # Configuração do banco SQLite
│   ├── server.js            # Servidor Express
│   ├── .env                 # Variáveis de ambiente
│   ├── routes/
│   │   ├── auth.js          # Rotas de autenticação
│   │   └── portfolio.js     # Rotas de CRUD
│   └── portfolio.db         # Banco de dados (criado automaticamente)
│
├── src/
│   ├── components/          # Componentes Vue
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   │
│   ├── views/               # Páginas
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   └── admin/           # Páginas administrativas
│   │       ├── Dashboard.vue
│   │       ├── EditHero.vue
│   │       ├── EditAbout.vue
│   │       ├── EditExperiences.vue
│   │       ├── EditSkills.vue
│   │       ├── EditProjects.vue
│   │       ├── EditContact.vue
│   │       ├── EditFooter.vue
│   │       └── EditVisibility.vue
│   │
│   ├── stores/              # Gerenciamento de estado (Pinia)
│   │   ├── auth.js          # Estado de autenticação
│   │   └── portfolio.js     # Estado do portfolio
│   │
│   ├── router/              # Configuração de rotas
│   │   └── index.js
│   │
│   ├── styles/              # Estilos globais
│   │   └── admin.css
│   │
│   ├── App.vue              # Componente raiz
│   └── main.js              # Entry point
│
├── index.html
├── vite.config.js
└── package.json
```

## 🔐 Segurança

- Senhas são criptografadas com bcrypt (10 rounds)
- Autenticação via JWT com expiração de 24h
- Rotas administrativas protegidas
- Credenciais configuráveis via `.env`
- CORS configurável para produção
- Rate limiting contra ataques de força bruta
- **Flag de controle**: Habilite/desabilite acesso admin

### 🔒 Bloqueando Admin em Produção

Para **desabilitar completamente** o painel administrativo, edite o `.env`:

```env
ADMIN_ENABLED=false
```

Isso irá:
- ❌ Bloquear todas as tentativas de login
- ❌ Invalidar tokens JWT existentes  
- ❌ Retornar erro 403 em rotas admin
- ✅ Manter o site público funcionando

**Quando usar:**
- Após configurar todo o conteúdo do site
- Para máxima segurança em produção
- Quando não precisar mais fazer edições

**Para reativar o admin:**
```env
ADMIN_ENABLED=true
```

### ⚠️ Checklist de Segurança

Antes de colocar em produção:

1. ✅ Alterar `JWT_SECRET` para chave aleatória de 64+ caracteres
2. ✅ Trocar `ADMIN_USERNAME` e `ADMIN_PASSWORD` para valores seguros
3. ✅ Configurar `CORS_ORIGIN` com URL exata do frontend
4. ✅ Definir `NODE_ENV=production`
5. ✅ Nunca commitar arquivo `.env` no Git
6. ✅ Configurar `ADMIN_ENABLED=false` após setup inicial

> 📖 **Veja [SECURITY.md](SECURITY.md) para guia completo de segurança**

## 🚢 Deploy

### Backend

1. **Configure o ambiente de produção** no `.env`:
```env
NODE_ENV=production
```

2. **Deploy no serviço de sua escolha**:
   - Heroku
   - Railway
   - Render
   - VPS próprio

### Frontend

1. **Build de produção**:
```bash
npm run build
```

2. **Deploy** (escolha uma opção):
   - Vercel
   - Netlify
   - GitHub Pages
   - Cloudflare Pages

3. **Configure a API URL**:
Edite `vite.config.js` para apontar para seu backend em produção.

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se a porta 3000 está livre
- Confirme que todas as dependências foram instaladas
- Verifique o arquivo `.env`

### Erro de autenticação
- Verifique as credenciais no `.env`
- Limpe o localStorage do navegador
- Reinicie o servidor backend

### Banco de dados vazio
- Delete o arquivo `portfolio.db` e reinicie o servidor
- O banco será recriado automaticamente

## 📝 Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como base para seu próprio portfolio.

## 👤 Autor

Desenvolvido com ❤️ por você!

---

**Dica**: Após configurar todo o conteúdo, lembre-se de fazer backup regular do arquivo `portfolio.db`!

O painel administrativo permite editar todo o conteúdo do portfólio:

- **Hero Section**: Nome, título e descrição principal
- **Sobre Mim**: Informações pessoais e estatísticas
- **Experiências**: Adicionar, editar e remover experiências profissionais
- **Habilidades**: Gerenciar categorias e níveis de habilidades
- **Projetos**: Adicionar, editar e remover projetos
- **Contato**: Informações de contato e redes sociais

### Como Funciona

- Todos os dados são armazenados no **localStorage** do navegador
- As alterações são salvas instantaneamente
- Os dados persistem mesmo após recarregar a página
- Para resetar os dados, limpe o localStorage do navegador

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🎨 Personalização

### Alterando Credenciais de Admin

Edite o arquivo `src/stores/auth.js`:

```javascript
login(username, password) {
  const validUsername = 'seu_usuario'
  const validPassword = 'sua_senha_segura'
  // ...
}
```

### Cores e Estilos

Edite as variáveis CSS em `src/style.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... outras cores */
}
```

### Dados Iniciais

Os dados padrão estão definidos em `src/stores/portfolio.js`. Você pode alterá-los diretamente no código ou através do painel administrativo.

## 📱 Responsividade

O portfolio é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## ✨ Funcionalidades

### Portfolio
- Design moderno com gradientes animados
- Navegação suave entre seções
- Animações ao rolar a página
- Menu mobile responsivo
- Formulário de contato
- Links para redes sociais

### Sistema Administrativo
- Autenticação com login/senha
- Proteção de rotas
- CRUD completo de experiências e projetos
- Edição inline de textos
- Persistência de dados em localStorage
- Interface intuitiva e responsiva
- Feedback visual de ações

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes do portfolio
│   ├── AboutSection.vue
│   ├── ContactSection.vue
│   ├── ExperienceSection.vue
│   ├── FooterSection.vue
│   ├── HeroSection.vue
│   ├── NavBar.vue
│   ├── ProjectsSection.vue
│   └── SkillsSection.vue
├── views/               # Páginas
│   ├── Home.vue
│   ├── Login.vue
│   └── admin/           # Páginas do painel admin
│       ├── Dashboard.vue
│       ├── EditHero.vue
│       ├── EditAbout.vue
│       ├── EditExperiences.vue
│       ├── EditSkills.vue
│       ├── EditProjects.vue
│       └── EditContact.vue
├── stores/              # Gerenciamento de estado (Pinia)
│   ├── auth.js         # Store de autenticação
│   └── portfolio.js    # Store dos dados do portfolio
├── router/              # Configuração de rotas
│   └── index.js
├── styles/              # Estilos globais e do admin
│   └── admin.css
├── App.vue
├── main.js
└── style.css
```

## 🚀 Deploy

### Preparação para Produção

Antes de fazer deploy:

1. **Altere as credenciais de admin** em `src/stores/auth.js`
2. **Configure um backend real** (opcional) para substituir o localStorage
3. **Execute o build**: `npm run build`
4. **Faça upload da pasta `dist/`** para seu servidor

### Recomendações de Hosting

- **Vercel**: Deploy automático via Git
- **Netlify**: Suporte para SPA com redirecionamentos
- **GitHub Pages**: Hosting gratuito
- **AWS S3 + CloudFront**: Escalável e performático

## 🔒 Segurança

> ⚠️ **Atenção:** O sistema atual usa localStorage e autenticação client-side, adequado para uso pessoal. Para ambientes de produção com múltiplos usuários, recomenda-se implementar:

- Backend com API REST (Laravel, Node.js, etc.)
- Banco de dados (PostgreSQL, MySQL, MongoDB)
- Autenticação JWT ou sessões
- Hash de senhas
- Validação server-side

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**Lucas Trasel Gonçalves**
- Email: trasel.lucas02@gmail.com
- GitHub: [@oTrasel](https://github.com/oTrasel)
- LinkedIn: [lucastrasel](https://linkedin.com/in/lucastrasel)

