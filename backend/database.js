const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    throw new Error(`Erro ao conectar com o banco de dados: ${err.message}`);
  }
});

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Tabela de usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela Hero Section
    db.run(`
      CREATE TABLE IF NOT EXISTS hero (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        photo_url TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela About
    db.run(`
      CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        intro TEXT NOT NULL,
        description TEXT NOT NULL,
        email TEXT NOT NULL,
        location TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de estatísticas do About
  db.run(`
    CREATE TABLE IF NOT EXISTS about_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      number TEXT NOT NULL,
      label TEXT NOT NULL,
      display_order INTEGER DEFAULT 0
    )
  `);

  // Tabela de Experiências
  db.run(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      period TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT NOT NULL,
      technologies TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Categorias de Habilidades
  db.run(`
    CREATE TABLE IF NOT EXISTS skill_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      display_order INTEGER DEFAULT 0
    )
  `);

  // Tabela de Habilidades
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      display_order INTEGER DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES skill_categories (id) ON DELETE CASCADE
    )
  `);

  // Tabela de Projetos
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      technologies TEXT NOT NULL,
      demo TEXT,
      github TEXT,
      icon TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Contato
  db.run(`
    CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      github TEXT,
      linkedin TEXT,
      location TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Visibilidade das Seções
  db.run(`
    CREATE TABLE IF NOT EXISTS section_visibility (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_key TEXT UNIQUE NOT NULL,
      section_name TEXT NOT NULL,
      is_visible INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Footer
  db.run(`
    CREATE TABLE IF NOT EXISTS footer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      github TEXT,
      linkedin TEXT,
      email TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Cores do Site
  db.run(`
    CREATE TABLE IF NOT EXISTS colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      primary_color TEXT DEFAULT '#6366f1',
      secondary_color TEXT DEFAULT '#8b5cf6',
      accent_color TEXT DEFAULT '#ec4899',
      dark_bg TEXT DEFAULT '#0f172a',
      darker_bg TEXT DEFAULT '#020617',
      light_text TEXT DEFAULT '#f1f5f9',
      gray_text TEXT DEFAULT '#94a3b8',
      card_bg TEXT DEFAULT '#1e293b',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) reject(err);
    else {
      // Inserir dados iniciais
      insertInitialData();
      resolve();
    }
  });
});
}

async function insertInitialData() {
  // Obter credenciais do administrador do .env
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Verificar se já existe usuário admin
  db.get('SELECT * FROM users WHERE username = ?', [adminUsername], async (err, row) => {
    if (!row) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [adminUsername, hashedPassword]
      );
    }
  });

  // Inserir visibilidade padrão das seções se não existir
  db.get('SELECT * FROM section_visibility LIMIT 1', (err, row) => {
    if (!row) {
      const sections = [
        { key: 'about', name: 'Sobre Mim', visible: 1 },
        { key: 'experiences', name: 'Experiências', visible: 1 },
        { key: 'skills', name: 'Habilidades', visible: 1 },
        { key: 'projects', name: 'Projetos', visible: 1 },
        { key: 'contact', name: 'Contato', visible: 1 }
      ];

      sections.forEach(section => {
        db.run(
          'INSERT INTO section_visibility (section_key, section_name, is_visible) VALUES (?, ?, ?)',
          [section.key, section.name, section.visible]
        );
      });
    }
  });

  // Inserir cores padrão se não existir
  db.get('SELECT * FROM colors LIMIT 1', (err, row) => {
    if (!row) {
      db.run(
        `INSERT INTO colors (primary_color, secondary_color, accent_color, dark_bg, darker_bg, light_text, gray_text, card_bg) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ['#6366f1', '#8b5cf6', '#ec4899', '#0f172a', '#020617', '#f1f5f9', '#94a3b8', '#1e293b']
      );
    }
  });
  
  console.log('✅ Banco de dados inicializado');
}

module.exports = db;
module.exports.initializeDatabase = initializeDatabase;
module.exports.insertInitialData = insertInitialData;


