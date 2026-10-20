import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('status_type', ['draft', 'published']);
export const roleEnum = pgEnum('role_type', ['admin', 'editor']);
export const submissionStatusEnum = pgEnum('submission_status_type', ['new', 'read', 'archived']);

// 1. Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('editor').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Sessions (Refresh rotation)
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  refreshHash: text('refresh_hash').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  userAgent: text('user_agent'),
  ip: text('ip'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Media
export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: text('filename').notNull(),
  mime: text('mime').notNull(),
  size: integer('size').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  blurhash: text('blurhash'),
  alt: text('alt').default('').notNull(),
  folder: text('folder').default('general').notNull(),
  variants: jsonb('variants'),
  uploadedBy: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 4. Singletons: Site Settings
export const siteSettings = pgTable('site_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  siteName: text('site_name').default('CodeXplus').notNull(),
  tagline: text('tagline'),
  logoId: uuid('logo_id').references(() => media.id, { onDelete: 'set null' }),
  faviconId: uuid('favicon_id').references(() => media.id, { onDelete: 'set null' }),
  seo: jsonb('seo'),
  contact: jsonb('contact'),
  socials: jsonb('socials'),
  footer: jsonb('footer'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 5. Singletons: Navigation
export const navigation = pgTable('navigation', {
  id: uuid('id').defaultRandom().primaryKey(),
  items: jsonb('items').notNull(),
  cta: jsonb('cta'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 6. Pages
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  seo: jsonb('seo'),
  status: statusEnum('status').default('draft').notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 7. Page Sections
export const pageSections = pgTable('page_sections', {
  id: uuid('id').defaultRandom().primaryKey(),
  pageId: uuid('page_id').references(() => pages.id, { onDelete: 'cascade' }).notNull(),
  type: text('type').notNull(),
  position: integer('position').default(0).notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 8. Services
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  number: text('number').notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  bullets: jsonb('bullets').notNull(),
  cta: jsonb('cta'),
  position: integer('position').default(0).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 9. Projects
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  summary: text('summary').notNull(),
  year: text('year').default('2026').notNull(),
  client: text('client'),
  tags: jsonb('tags').notNull(),
  coverId: uuid('cover_id').references(() => media.id, { onDelete: 'set null' }),
  gallery: jsonb('gallery'),
  url: text('url'),
  body: jsonb('body'),
  featured: boolean('featured').default(false).notNull(),
  position: integer('position').default(0).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  seo: jsonb('seo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 10. Testimonials
export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  company: text('company').notNull(),
  quote: text('quote').notNull(),
  rating: integer('rating').default(5).notNull(),
  avatarId: uuid('avatar_id').references(() => media.id, { onDelete: 'set null' }),
  position: integer('position').default(0).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 11. Posts (Blog / Journal)
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  excerpt: text('excerpt').notNull(),
  body: jsonb('body').notNull(),
  coverId: uuid('cover_id').references(() => media.id, { onDelete: 'set null' }),
  author: text('author').default('CodeXplus Team').notNull(),
  readMinutes: integer('read_minutes').default(5).notNull(),
  publishedAt: timestamp('published_at'),
  status: statusEnum('status').default('draft').notNull(),
  seo: jsonb('seo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 12. Team Members
export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  photoId: uuid('photo_id').references(() => media.id, { onDelete: 'set null' }),
  bio: text('bio'),
  socials: jsonb('socials'),
  position: integer('position').default(0).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 13. Clients
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  logoId: uuid('logo_id').references(() => media.id, { onDelete: 'set null' }),
  href: text('href'),
  position: integer('position').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 14. Tech Stack Groups
export const techStackGroups = pgTable('tech_stack_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  items: jsonb('items').notNull(),
  position: integer('position').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 15. FAQs
export const faqs = pgTable('faqs', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  position: integer('position').default(0).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 16. Form Submissions
export const formSubmissions = pgTable('form_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(), // 'contact' | 'newsletter'
  payload: jsonb('payload').notNull(),
  status: submissionStatusEnum('status').default('new').notNull(),
  ip: text('ip'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 17. Subscribers
export const subscribers = pgTable('subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  confirmed: boolean('confirmed').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 18. Audit Log
export const auditLog = pgTable('audit_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: text('entity_id').notNull(),
  diff: jsonb('diff'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 19. Revisions
export const revisions = pgTable('revisions', {
  id: uuid('id').defaultRandom().primaryKey(),
  entity: text('entity').notNull(),
  entityId: text('entity_id').notNull(),
  data: jsonb('data').notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
