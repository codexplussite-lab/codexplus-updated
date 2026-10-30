import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';

export const publicRouter = Router();

// 1. Site Metadata & Hero
publicRouter.get('/site', (req: Request, res: Response) => {
  const getSetting = db.prepare('SELECT value FROM settings WHERE key = ?');
  const siteRow = getSetting.get('site') as { value: string } | undefined;
  const heroRow = getSetting.get('hero') as { value: string } | undefined;

  const site = siteRow ? JSON.parse(siteRow.value) : {};
  const hero = heroRow ? JSON.parse(heroRow.value) : {};

  res.json({ site, hero });
});

// 2. Services
publicRouter.get('/services', (req: Request, res: Response) => {
  const stmt = db.prepare("SELECT * FROM services WHERE status = 'published' ORDER BY position ASC");
  const items = (stmt.all() as any[]).map((s) => ({
    ...s,
    bullets: s.bullets ? JSON.parse(s.bullets) : [],
  }));
  res.json({ items });
});

// 3. Projects
publicRouter.get('/projects', (req: Request, res: Response) => {
  const stmt = db.prepare("SELECT * FROM projects WHERE status = 'published' ORDER BY position ASC");
  const items = (stmt.all() as any[]).map((p) => ({
    ...p,
    tags: p.tags ? JSON.parse(p.tags) : [],
  }));
  res.json({ items });
});

// 4. Articles / Posts
publicRouter.get('/posts', (req: Request, res: Response) => {
  const stmt = db.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC");
  const items = stmt.all();
  res.json({ items });
});

// 5. Team
publicRouter.get('/team', (req: Request, res: Response) => {
  const stmt = db.prepare("SELECT * FROM team WHERE status = 'published' ORDER BY position ASC");
  const items = (stmt.all() as any[]).map((m) => ({
    ...m,
    photoUrl: m.photo_url,
  }));
  res.json({ items });
});

// 6. Submit Contact Form
publicRouter.post('/contact', (req: Request, res: Response) => {
  const { name, email, phone, budget, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  const stmt = db.prepare(
    'INSERT INTO submissions (name, email, phone, budget, message) VALUES (?, ?, ?, ?, ?)'
  );
  stmt.run(name, email, phone || null, budget || null, message);

  res.json({ success: true, message: 'Message received and stored in database' });
});
