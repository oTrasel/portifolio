const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');
const { verifyToken } = require('./auth');

// Configurar pasta de uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📁 Salvando arquivo em:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'hero-' + uniqueSuffix + path.extname(file.originalname);
    console.log('📝 Nome do arquivo:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas!'));
    }
  }
});

// Middleware para verificar se admin está habilitado em rotas de escrita
const checkAdminEnabled = (req, res, next) => {
  if (req.method !== 'GET' && process.env.ADMIN_ENABLED === 'false') {
    return res.status(403).json({ error: 'Acesso administrativo desabilitado' });
  }
  next();
};

// Aplicar middleware em todas as rotas
router.use(checkAdminEnabled);

// ========== HERO ==========
router.get('/hero', (req, res) => {
  db.get('SELECT * FROM hero ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

router.put('/hero', verifyToken, (req, res) => {
  const { name, title, description, photo_url } = req.body;
  
  db.run(
    'INSERT OR REPLACE INTO hero (id, name, title, description, photo_url, updated_at) VALUES (1, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [name, title, description, photo_url],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Rota de upload de foto do hero
router.post('/hero/upload-photo', verifyToken, upload.single('photo'), (req, res) => {
  console.log('📸 Requisição de upload recebida');
  console.log('📦 Arquivo:', req.file);
  
  try {
    if (!req.file) {
      console.log('❌ Nenhum arquivo no request');
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const photoUrl = `/uploads/${req.file.filename}`;
    console.log('✅ Arquivo salvo:', photoUrl);
    
    // Buscar foto antiga para deletar
    db.get('SELECT photo_url FROM hero WHERE id = 1', [], (err, row) => {
      if (!err && row && row.photo_url) {
        const oldPhotoPath = path.join(__dirname, '..', row.photo_url);
        console.log('🗑️ Deletando foto antiga:', oldPhotoPath);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      
      // Atualizar com a nova foto
      db.run(
        'UPDATE hero SET photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
        [photoUrl],
        function(err) {
          if (err) {
            console.error('❌ Erro ao atualizar banco:', err.message);
            return res.status(500).json({ error: err.message });
          }
          
          // Se não afetou nenhuma linha, inserir
          if (this.changes === 0) {
            db.run(
              'INSERT INTO hero (id, name, title, description, photo_url) VALUES (1, ?, ?, ?, ?)',
              ['Seu Nome', 'Seu Título', 'Sua descrição', photoUrl],
              function(err) {
                if (err) {
                  console.error('❌ Erro ao inserir no banco:', err.message);
                  return res.status(500).json({ error: err.message });
                }
                console.log('✅ Hero criado com photo_url:', photoUrl);
                res.json({ success: true, photo_url: photoUrl });
              }
            );
          } else {
            console.log('✅ Banco atualizado com photo_url:', photoUrl);
            res.json({ success: true, photo_url: photoUrl });
          }
        }
      );
    });
  } catch (error) {
    console.error('❌ Erro no upload:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========== ABOUT ==========
router.get('/about', (req, res) => {
  db.get('SELECT * FROM about ORDER BY id DESC LIMIT 1', (err, about) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all('SELECT * FROM about_stats ORDER BY display_order', (err, stats) => {
      if (err) return res.status(500).json({ error: err.message });
      
      res.json({
        ...about,
        stats: stats || []
      });
    });
  });
});

router.put('/about', verifyToken, (req, res) => {
  const { intro, description, email, location } = req.body;
  
  db.run(
    'INSERT OR REPLACE INTO about (id, intro, description, email, location, updated_at) VALUES (1, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [intro, description, email, location],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// ========== ABOUT STATS ==========
router.post('/about/stats', verifyToken, (req, res) => {
  const { icon, value, label } = req.body;
  
  // Primeiro pegar o próximo display_order
  db.get('SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM about_stats', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const nextOrder = row.next_order;
    
    db.run(
      'INSERT INTO about_stats (icon, number, label, display_order) VALUES (?, ?, ?, ?)',
      [icon, value, label, nextOrder],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
      }
    );
  });
});

router.put('/about/stats/:id', verifyToken, (req, res) => {
  const { icon, value, label } = req.body;
  
  db.run(
    'UPDATE about_stats SET icon = ?, number = ?, label = ? WHERE id = ?',
    [icon, value, label, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

router.delete('/about/stats/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM about_stats WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// ========== EXPERIENCES ==========
router.get('/experiences', (req, res) => {
  db.all('SELECT * FROM experiences ORDER BY display_order, id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const experiences = rows.map(exp => ({
      ...exp,
      technologies: exp.technologies.split(',')
    }));
    
    res.json(experiences);
  });
});

router.post('/experiences', verifyToken, (req, res) => {
  const { period, title, company, description, technologies } = req.body;
  const techString = Array.isArray(technologies) ? technologies.join(',') : technologies;
  
  db.run(
    'INSERT INTO experiences (period, title, company, description, technologies) VALUES (?, ?, ?, ?, ?)',
    [period, title, company, description, techString],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

router.put('/experiences/:id', verifyToken, (req, res) => {
  const { period, title, company, description, technologies } = req.body;
  const techString = Array.isArray(technologies) ? technologies.join(',') : technologies;
  
  db.run(
    'UPDATE experiences SET period = ?, title = ?, company = ?, description = ?, technologies = ? WHERE id = ?',
    [period, title, company, description, techString, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

router.delete('/experiences/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM experiences WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// ========== SKILLS ==========
router.get('/skills', (req, res) => {
  db.all('SELECT * FROM skill_categories ORDER BY display_order', (err, categories) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const promises = categories.map(category => {
      return new Promise((resolve) => {
        db.all(
          'SELECT * FROM skills WHERE category_id = ? ORDER BY display_order',
          [category.id],
          (err, skills) => {
            resolve({
              ...category,
              skills: skills || []
            });
          }
        );
      });
    });
    
    Promise.all(promises).then(result => {
      res.json(result);
    });
  });
});

// Adicionar categoria de skill
router.post('/skills/categories', verifyToken, (req, res) => {
  const { title, icon } = req.body;
  
  // Primeiro pegar o próximo display_order
  db.get('SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM skill_categories', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const nextOrder = row.next_order;
    
    db.run(
      'INSERT INTO skill_categories (title, icon, display_order) VALUES (?, ?, ?)',
      [title, icon, nextOrder],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
      }
    );
  });
});

// Atualizar categoria de skill
router.put('/skills/categories/:id', verifyToken, (req, res) => {
  const { title, icon } = req.body;
  
  db.run(
    'UPDATE skill_categories SET title = ?, icon = ? WHERE id = ?',
    [title, icon, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Deletar categoria de skill
router.delete('/skills/categories/:id', verifyToken, (req, res) => {
  // Primeiro deletar todas as skills da categoria
  db.run('DELETE FROM skills WHERE category_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Depois deletar a categoria
    db.run('DELETE FROM skill_categories WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    });
  });
});

// Atualizar skill individual
router.put('/skills/:id', verifyToken, (req, res) => {
  const { name, level } = req.body;
  
  db.run(
    'UPDATE skills SET name = ?, level = ? WHERE id = ?',
    [name, level, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Adicionar skill individual
router.post('/skills', verifyToken, (req, res) => {
  const { category_id, name, level } = req.body;
  
  db.run(
    'INSERT INTO skills (category_id, name, level) VALUES (?, ?, ?)',
    [category_id, name, level],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Deletar skill individual
router.delete('/skills/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM skills WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// ========== PROJECTS ==========
router.get('/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY display_order, id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const projects = rows.map(proj => ({
      ...proj,
      technologies: proj.technologies.split(',')
    }));
    
    res.json(projects);
  });
});

router.post('/projects', verifyToken, (req, res) => {
  const { title, description, technologies, demo, github, icon } = req.body;
  const techString = Array.isArray(technologies) ? technologies.join(',') : technologies;
  
  db.run(
    'INSERT INTO projects (title, description, technologies, demo, github, icon) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, techString, demo, github, icon],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

router.put('/projects/:id', verifyToken, (req, res) => {
  const { title, description, technologies, demo, github, icon } = req.body;
  const techString = Array.isArray(technologies) ? technologies.join(',') : technologies;
  
  db.run(
    'UPDATE projects SET title = ?, description = ?, technologies = ?, demo = ?, github = ?, icon = ? WHERE id = ?',
    [title, description, techString, demo, github, icon, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

router.delete('/projects/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// ========== CONTACT ==========
router.get('/contact', (req, res) => {
  db.get('SELECT * FROM contact ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

router.put('/contact', verifyToken, (req, res) => {
  const { email, github, linkedin, location } = req.body;
  
  db.run(
    'UPDATE contact SET email = ?, github = ?, linkedin = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
    [email, github, linkedin, location],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// ========== FOOTER ==========
router.get('/footer', (req, res) => {
  db.get('SELECT * FROM footer ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

router.put('/footer', verifyToken, (req, res) => {
  const { description, github, linkedin, email } = req.body;
  
  db.get('SELECT * FROM footer LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (row) {
      // Atualizar
      db.run(
        'UPDATE footer SET description = ?, github = ?, linkedin = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
        [description, github, linkedin, email],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, changes: this.changes });
        }
      );
    } else {
      // Criar
      db.run(
        'INSERT INTO footer (description, github, linkedin, email) VALUES (?, ?, ?, ?)',
        [description, github, linkedin, email],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, id: this.lastID });
        }
      );
    }
  });
});

// Section Visibility Routes
router.get('/settings/visibility', (req, res) => {
  db.all('SELECT * FROM section_visibility ORDER BY section_key', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.put('/settings/visibility/:key', verifyToken, (req, res) => {
  const { key } = req.params;
  const { is_visible } = req.body;
  
  db.run(
    'UPDATE section_visibility SET is_visible = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?',
    [is_visible ? 1 : 0, key],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

module.exports = router;
