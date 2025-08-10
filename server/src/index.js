nk require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// CORS
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://venkygcu.github.io',
    'https://venkygcu.github.io/eshwar-ecommerce-store'
  ],
  credentials: true,
}));

app.use(express.json());

// SQLite setup
const dbPath = path.join(__dirname, '..', 'data.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    new_price REAL NOT NULL,
    old_price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helpers
function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
}

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

function onlyAdmin(req, res, next) {
  if (req.user?.email !== 'gunjivenkatesh072@gmail.com') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}

// Routes
app.get('/api/v1/health', (req, res) => res.json({ ok: true }));

app.post('/api/v1/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const password_hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
  stmt.run([username, email, password_hash], function (err) {
    if (err) {
      if (String(err).includes('UNIQUE')) return res.status(409).json({ message: 'Email already registered' });
      return res.status(500).json({ message: 'Signup failed' });
    }
    const user = { id: this.lastID, username, email };
    const token = signToken(user);
    return res.status(201).json({ token, user });
  });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ message: 'Login failed' });
    if (!row) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = bcrypt.compareSync(password, row.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const user = { id: row.id, username: row.username, email: row.email };
    const token = signToken(user);
    return res.json({ token, user });
  });
});

// Products
app.post('/api/v1/products', auth, onlyAdmin, (req, res) => {
  const { name, category, image, new_price, old_price } = req.body;
  if (!name || !category || !image || typeof new_price !== 'number') return res.status(400).json({ message: 'Missing fields' });
  const stmt = db.prepare('INSERT INTO products (name, category, image, new_price, old_price) VALUES (?, ?, ?, ?, ?)');
  stmt.run([name, category, image, new_price, old_price || null], function (err) {
    if (err) return res.status(500).json({ message: 'Failed to add product' });
    return res.status(201).json({ id: this.lastID });
  });
});

app.get('/api/v1/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to load products' });
    return res.json(rows || []);
  });
});

app.post('/api/v1/support/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' });
  const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run([name, email, message], function (err) {
    if (err) return res.status(500).json({ message: 'Failed to save message' });
    return res.status(201).json({ id: this.lastID });
  });
});

app.get('/api/v1/support/messages', auth, onlyAdmin, (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to load messages' });
    return res.json(rows || []);
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
