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
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const UPLOADS_DIR = path.resolve(process.cwd(), process.env.UPLOADS_DIR || './uploads');

// Ensure uploads dir
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middlewares
app.use(cors({
  origin: [CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
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

app.listen(PORT, () => {
  console.log(`🚀 CodeXplus Backend Server running on http://localhost:${PORT}`);
  console.log(`📦 SQLite Database ready`);
});
