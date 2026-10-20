# CodeXplus Rebuild — A to Z Plan (Markdown Specification)

Version 1 · Fastify + PostgreSQL + custom Admin + Next.js (Webangles layout)

## 0. Plan Overview
- **Backend & CMS**: Custom Fastify 5 REST API + PostgreSQL (Drizzle ORM) replacing Sanity CMS completely.
- **Admin Panel**: Custom dynamic Admin built with Vite + React + shadcn/ui + TanStack Router/Query + Tiptap + dnd-kit.
- **Public Site**: Next.js 15 (App Router) recreating the Webangles Framer template layout with CodeXplus content.
- **Single Source of Truth**: `packages/shared` Zod schemas define all models and dynamic section blocks.

---

## 1. Directory Structure

```
codexplus/
├── apps/
│   ├── api/          # Fastify 5, Drizzle ORM, Zod Type Provider, Sharp, Auth
│   ├── admin/        # Vite + React 19, shadcn/ui, dnd-kit block builder
│   └── web/          # Next.js 15 App Router, Tailwind, Framer Motion
├── packages/
│   └── shared/       # Zod schemas & types for collections, section blocks, & forms
├── content/
│   └── seed/         # Migrated JSON data and downloaded assets
├── design-ref/       # Extracted design tokens and specs
├── docs/             # PLAN.md, api.md, contract-requests.md, deploy.md
└── .agents/          # Antigravity CLI skills and config
```

---

## 2. Dynamic Section Blocks (Home & Pages)
1. `hero` (eyebrow, headline, description, primaryCta, secondaryCta, scrollLabel)
2. `clientMarquee` (items, speed, direction)
3. `aboutStats` (eyebrow, heading, paragraphs, points, stats, badges, cta)
4. `services` (eyebrow, heading, intro, serviceIds, marqueeTags, layout)
5. `whyUs` (heading, 3 items with icons & descriptions)
6. `techStack` (eyebrow, heading, intro, groupIds, showMarquee)
7. `featuredProjects` (eyebrow, heading, filters, limit, projectIds)
8. `testimonials` (heading, subheading, testimonialIds, showRating)
9. `journal` (eyebrow, heading, limit, allArticlesCta)
10. `cta` (eyebrow, heading, description, email, badge, ctas)
11. `contactForm` (heading, intro, contact details, fields, submitLabel)

---

## 3. Database Entities (Drizzle Postgres)
- `users`: id, email, password_hash (argon2id), role (admin/editor), is_active, last_login_at
- `sessions`: id, user_id, refresh_hash, expires_at, user_agent, ip
- `media`: id, filename, mime, size, width, height, blurhash, alt, folder, variants (jsonb), uploaded_by
- `site_settings`: site_name, tagline, logo_id, favicon_id, seo (jsonb), contact (jsonb), socials (jsonb), footer (jsonb)
- `navigation`: items (jsonb), cta (jsonb)
- `pages`: id, slug, title, seo (jsonb), status, published_at
- `page_sections`: id, page_id, type, position, enabled, data (jsonb)
- `services`, `projects`, `testimonials`, `posts`, `team_members`, `clients`, `tech_stack_groups`, `faqs`
- `form_submissions`: id, type, payload (jsonb), status (new/read/archived), ip, created_at
- `subscribers`: id, email, confirmed, created_at
- `audit_log`, `revisions`
