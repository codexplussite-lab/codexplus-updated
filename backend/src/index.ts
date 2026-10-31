import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { initDatabase } from './db/index.js';
import { publicRouter } from './routes/public.js';
import { adminRouter } from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const UPLOADS_DIR = path.resolve(process.cwd(), process.env.UPLOADS_DIR || './uploads');

// Ensure uploads dir
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middlewares
const allowedOrigins = [
  CORS_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://codexplus.site',
  'https://www.codexplus.site',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow reverse proxy / mobile / same-origin requests
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Initialize SQLite DB
initDatabase();

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CodeXplus Backend (Node.js + SQLite)' });
});

app.use('/api/public', publicRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, HOST, () => {
  console.log(`🚀 CodeXplus Backend Server running on http://${HOST}:${PORT}`);
  console.log(`📦 SQLite Database ready`);
});
