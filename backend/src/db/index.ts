import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dbPath = process.env.DATABASE_PATH || './data.db';
const fullDbPath = path.resolve(process.cwd(), dbPath);

// Ensure directory exists
const dbDir = path.dirname(fullDbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new DatabaseSync(fullDbPath);

export function initDatabase() {
  db.exec('PRAGMA journal_mode = WAL;');

  // 1. Settings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Services Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      description TEXT,
      bullets TEXT,
      status TEXT DEFAULT 'published',
      position INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      category TEXT,
      summary TEXT,
      year TEXT,
      client TEXT,
      tags TEXT,
      image_url TEXT,
      status TEXT DEFAULT 'published',
      featured INTEGER DEFAULT 1,
      position INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Articles / Posts Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      category TEXT,
      excerpt TEXT,
      body TEXT,
      author TEXT DEFAULT 'CodeXplus Team',
      read_minutes TEXT DEFAULT '5 min read',
      status TEXT DEFAULT 'published',
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Team Members Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT,
      photo_url TEXT,
      github TEXT,
      linkedin TEXT,
      twitter TEXT,
      position INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Submissions (Contact briefs) Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      budget TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default settings if empty
  const getSetting = db.prepare('SELECT value FROM settings WHERE key = ?');
  const site = getSetting.get('site');
  if (!site) {
    const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    insertSetting.run(
      'site',
      JSON.stringify({
        siteName: 'CodeXplus',
        tagline: 'Elite Web Systems & Full-Stack Digital Engineering Studio',
        logoUrl: '/logo.svg',
        faviconUrl: '/favicon.png',
        contactEmail: 'contact@codexplus.site',
        contactPhone: '+92 300 0000000',
        address: 'Karachi, Pakistan',
        turnaround: 'Within 24 Hours',
        github: 'https://github.com/codexplus',
        linkedin: 'https://linkedin.com/company/codexplus',
        twitter: 'https://twitter.com/codexplus',
      })
    );

    insertSetting.run(
      'hero',
      JSON.stringify({
        badge: 'Studio',
        badgeText: 'Bespoke Web Systems & Architecture',
        titlePrimary: 'Smart Web Experiences,',
        titleGradient: 'Built From Every Angle',
        description:
          'CodeXplus builds modern digital architectures, headless CMS portals, and high-performance web applications using Next.js and Fastify — engineered for businesses that demand high conversion and zero downtime.',
        primaryCtaText: 'Start a Project',
        primaryCtaHref: '/contact',
        secondaryCtaText: 'Explore Case Studies',
        secondaryCtaHref: '/portfolio',
      })
    );

    // Seed services
    const insertService = db.prepare(
      'INSERT INTO services (number, title, slug, description, bullets, position) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertService.run(
      '01',
      'Next.js 15 Platform Engineering',
      'nextjs-15-platform-engineering',
      'High-throughput web applications with sub-second page loads, RSC streaming, and modern edge deployment.',
      JSON.stringify([
        'App Router Architecture',
        'Server Actions & Streaming',
        'Core Web Vitals Optimization',
        'Design Token Integration',
      ]),
      0
    );
    insertService.run(
      '02',
      'Custom Node.js Backend & SQLite/APIs',
      'custom-backend-apis',
      'Bespoke microservices, strict validation, and low latency endpoints.',
      JSON.stringify([
        'SQLite & Database Architecture',
        'Session & JWT Auth',
        'Full Admin Panel Control',
        'High Throughput Performance',
      ]),
      1
    );
    insertService.run(
      '03',
      'Design Systems & 120fps Interaction',
      'design-systems-120fps-interaction',
      'Living component libraries, accessible Tailwind tokens, and buttery GSAP & WebGL interactions.',
      JSON.stringify([
        'Tailwind Design Tokens',
        'GSAP & WebGL Shaders',
        'WCAG AA Accessibility',
        'Figma to Code Pipeline',
      ]),
      2
    );

    // Seed projects
    const insertProject = db.prepare(
      'INSERT INTO projects (title, slug, category, summary, year, client, tags, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertProject.run(
      'Lemonide Tech Enterprise Portal',
      'lemonide-tech-enterprise-portal',
      'Enterprise Platform',
      'A high-throughput enterprise portal engineered for zero downtime and ultra-responsive real-time data sync.',
      '2026',
      'Lemonide Enterprise',
      JSON.stringify(['Next.js 15', 'Node.js', 'SQLite', 'Tailwind CSS']),
      0
    );
    insertProject.run(
      'Viper Creative Experience Studio',
      'viper-creative-experience-studio',
      'Creative Studio',
      'Award-winning interactive brand presence with GPU-accelerated living background shaders and buttery micro-interactions.',
      '2026',
      'Viper Studio',
      JSON.stringify(['Next.js 15', 'GSAP', 'WebGL / OGL', 'Framer Motion']),
      1
    );

    // Seed team
    const insertTeam = db.prepare(
      'INSERT INTO team (name, role, bio, github, linkedin, twitter, position) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    insertTeam.run(
      'Arman Naqvi',
      'Lead Architect & Founder',
      'Full-stack systems architecture, Node API pipelines, and database optimization.',
      'https://github.com/codexplus',
      'https://linkedin.com/company/codexplus',
      'https://twitter.com/codexplus',
      0
    );

    // Seed articles
    const insertPost = db.prepare(
      'INSERT INTO posts (title, slug, category, excerpt, body, read_minutes) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertPost.run(
      'Why Design Systems Fail After Year One — And How to Prevent It',
      'why-design-systems-fail',
      'Design Systems',
      'Most component libraries die quietly from token drift and undocumented exceptions. Here is the architectural wiring that keeps enterprise design systems maintainable.',
      'Full article content detailing design system resilience and token automation.',
      '8 min read'
    );
    insertPost.run(
      'The Next.js 15 Performance Architecture Checklist',
      'nextjs-15-performance-architecture',
      'Full-Stack Performance',
      'Font preloading strategies, edge cache revalidation pipelines, and strict bundle elimination: the exact blueprint we ship across high-throughput client builds.',
      'Full architectural breakdown on Next.js 15 App router performance tuning.',
      '12 min read'
    );
  }
}
