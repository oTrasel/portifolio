const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const { initializeDatabase } = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configurável
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
};

// Rate Limiting para prevenir ataques
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limite de requisições
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limite de tamanho do payload
app.use(limiter);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando!' });
});

// Inicializar banco de dados e servidor
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  });
}).catch(err => {
  console.error('❌ Erro ao inicializar banco de dados:', err);
  process.exit(1);
});
