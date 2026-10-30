import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { db } from '../db/index.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';

export const adminRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'codexplus-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@codexplus.site';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Configure Multer for File Uploads
const uploadDir = path.resolve(process.cwd(), process.env.UPLOADS_DIR || './uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// 1. Admin Login
adminRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { email } });
    return;
  }
  res.status(401).json({ error: 'Invalid email or password' });
});

// Protect all following routes with requireAuth
adminRouter.use(requireAuth);

// 2. Upload Endpoint
adminRouter.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, filename: req.file.filename });
});

// 3. Auth Verify Me
adminRouter.get('/me', (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

// 4. Settings Get/Update
adminRouter.get('/settings', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM settings');
  const rows = stmt.all() as { key: string; value: string }[];
  const settings: Record<string, any> = {};
  for (const r of rows) {
    try {
      settings[r.key] = JSON.parse(r.value);
    } catch {
      settings[r.key] = r.value;
    }
  }
  res.json({ settings });
});

adminRouter.post('/settings', (req: Request, res: Response) => {
  const { key, value } = req.body;
  if (!key || value === undefined) {
    res.status(400).json({ error: 'Key and value required' });
    return;
  }

  const upsert = db.prepare(`
    INSERT INTO settings (key, value, updated_at) 
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);
  upsert.run(String(key), typeof value === 'string' ? value : JSON.stringify(value));
  res.json({ success: true });
});

// 5. Services CRUD
adminRouter.get('/services', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM services ORDER BY position ASC');
  const items = (stmt.all() as any[]).map((s) => ({
    ...s,
    bullets: s.bullets ? JSON.parse(s.bullets) : [],
  }));
  res.json({ items });
});

adminRouter.post('/services', (req: Request, res: Response) => {
  const { number, title, slug, description, bullets, status, position } = req.body;
  const insert = db.prepare(`
    INSERT INTO services (number, title, slug, description, bullets, status, position)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    String(number || '01'),
    String(title || 'New Service'),
    String(slug || `service-${Date.now()}`),
    String(description || ''),
    JSON.stringify(Array.isArray(bullets) ? bullets : []),
    String(status || 'published'),
    Number(position ?? 0)
  );
  res.json({ success: true, id: result.lastInsertRowid });
});

adminRouter.put('/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { number, title, slug, description, bullets, status, position } = req.body;
  const update = db.prepare(`
    UPDATE services 
    SET number = ?, title = ?, slug = ?, description = ?, bullets = ?, status = ?, position = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  update.run(
    String(number || '01'),
    String(title || ''),
    String(slug || ''),
    String(description || ''),
    JSON.stringify(Array.isArray(bullets) ? bullets : []),
    String(status || 'published'),
    Number(position ?? 0),
    String(id)
  );
  res.json({ success: true });
});

adminRouter.delete('/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM services WHERE id = ?').run(String(id));
  res.json({ success: true });
});

// 6. Projects CRUD
adminRouter.get('/projects', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM projects ORDER BY position ASC');
  const items = (stmt.all() as any[]).map((p) => ({
    ...p,
    tags: p.tags ? JSON.parse(p.tags) : [],
  }));
  res.json({ items });
});

adminRouter.post('/projects', (req: Request, res: Response) => {
  const { title, slug, category, summary, year, client, tags, image_url, status, featured, position } = req.body;
  const insert = db.prepare(`
    INSERT INTO projects (title, slug, category, summary, year, client, tags, image_url, status, featured, position)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    String(title || 'New Project'),
    String(slug || `project-${Date.now()}`),
    String(category || 'Platform'),
    String(summary || ''),
    String(year || '2026'),
    String(client || ''),
    JSON.stringify(Array.isArray(tags) ? tags : []),
    image_url ? String(image_url) : null,
    String(status || 'published'),
    featured ? 1 : 0,
    Number(position ?? 0)
  );
  res.json({ success: true, id: result.lastInsertRowid });
});

adminRouter.put('/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, category, summary, year, client, tags, image_url, status, featured, position } = req.body;
  const update = db.prepare(`
    UPDATE projects 
    SET title = ?, slug = ?, category = ?, summary = ?, year = ?, client = ?, tags = ?, image_url = ?, status = ?, featured = ?, position = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  update.run(
    String(title || ''),
    String(slug || ''),
    String(category || ''),
    String(summary || ''),
    String(year || '2026'),
    String(client || ''),
    JSON.stringify(Array.isArray(tags) ? tags : []),
    image_url ? String(image_url) : null,
    String(status || 'published'),
    featured ? 1 : 0,
    Number(position ?? 0),
    String(id)
  );
  res.json({ success: true });
});

adminRouter.delete('/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM projects WHERE id = ?').run(String(id));
  res.json({ success: true });
});

// 7. Posts CRUD
adminRouter.get('/posts', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM posts ORDER BY published_at DESC');
  res.json({ items: stmt.all() });
});

adminRouter.post('/posts', (req: Request, res: Response) => {
  const { title, slug, category, excerpt, body, author, read_minutes, status } = req.body;
  const insert = db.prepare(`
    INSERT INTO posts (title, slug, category, excerpt, body, author, read_minutes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    String(title || 'New Post'),
    String(slug || `post-${Date.now()}`),
    String(category || 'Architecture'),
    String(excerpt || ''),
    String(body || ''),
    String(author || 'CodeXplus Team'),
    String(read_minutes || '5 min read'),
    String(status || 'published')
  );
  res.json({ success: true, id: result.lastInsertRowid });
});

adminRouter.put('/posts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, category, excerpt, body, author, read_minutes, status } = req.body;
  const update = db.prepare(`
    UPDATE posts 
    SET title = ?, slug = ?, category = ?, excerpt = ?, body = ?, author = ?, read_minutes = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  update.run(
    String(title || ''),
    String(slug || ''),
    String(category || ''),
    String(excerpt || ''),
    String(body || ''),
    String(author || 'CodeXplus Team'),
    String(read_minutes || '5 min read'),
    String(status || 'published'),
    String(id)
  );
  res.json({ success: true });
});

adminRouter.delete('/posts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM posts WHERE id = ?').run(String(id));
  res.json({ success: true });
});

// 8. Team CRUD
adminRouter.get('/team', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM team ORDER BY position ASC');
  const items = (stmt.all() as any[]).map((m) => ({
    ...m,
    photoUrl: m.photo_url,
  }));
  res.json({ items });
});

adminRouter.post('/team', (req: Request, res: Response) => {
  const { name, role, bio, photo_url, photoUrl, github, linkedin, twitter, position, status } = req.body;
  const insert = db.prepare(`
    INSERT INTO team (name, role, bio, photo_url, github, linkedin, twitter, position, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    String(name || 'New Member'),
    String(role || 'Engineer'),
    String(bio || ''),
    String(photo_url || photoUrl || ''),
    String(github || ''),
    String(linkedin || ''),
    String(twitter || ''),
    Number(position ?? 0),
    String(status || 'published')
  );
  res.json({ success: true, id: result.lastInsertRowid });
});

adminRouter.put('/team/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, role, bio, photo_url, photoUrl, github, linkedin, twitter, position, status } = req.body;
  const update = db.prepare(`
    UPDATE team 
    SET name = ?, role = ?, bio = ?, photo_url = ?, github = ?, linkedin = ?, twitter = ?, position = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  update.run(
    String(name || ''),
    String(role || ''),
    String(bio || ''),
    String(photo_url || photoUrl || ''),
    String(github || ''),
    String(linkedin || ''),
    String(twitter || ''),
    Number(position ?? 0),
    String(status || 'published'),
    String(id)
  );
  res.json({ success: true });
});

adminRouter.delete('/team/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM team WHERE id = ?').run(String(id));
  res.json({ success: true });
});

// 9. Contact Briefs Submissions Inbox
adminRouter.get('/submissions', (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC');
  res.json({ items: stmt.all() });
});

adminRouter.delete('/submissions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM submissions WHERE id = ?').run(String(id));
  res.json({ success: true });
});
