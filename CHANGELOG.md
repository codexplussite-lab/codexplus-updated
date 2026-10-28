# CHANGELOG — CodeXplus Stabilization Release

## Summary of Changes

### 1. Singular URL Fix & Workaround Removal (Task 1)
- **Root Cause Identified**: The browser was sending `/api/backend/admin/service` because `apps/web/src/app/admin/page.tsx` was calling `endpoint = /api/backend/admin/${type}` where `type` was `'service'`, `'project'`, `'post'`, `'faq'`. In addition, earlier Docker containers were running an old uncommitted build.
- **Source Fix**: Updated `ENDPOINT_MAP` in `apps/web/src/app/admin/page.tsx` with bidirectional singular-to-plural mapping (`service` -> `services`, `project` -> `projects`, `post` -> `posts`, `faq` -> `faqs`, `team` -> `team`), ensuring all client requests natively use standard plural REST endpoints.
- **Workaround Removed**: Removed `rewriteUrl` in `apps/api/src/index.ts`. All endpoints are now natively plural.

### 2. Duplicate Submission Prevention (Task 2)
- Added dedicated `isSavingModalRef` and `isSavingModal` state in `apps/web/src/app/admin/page.tsx`.
- Form submission (`handleSaveModalItem`) now prevents re-entry while an active save is in progress.
- Modal submit button is disabled during submission with a spinner and "Saving Entry..." indicator, eliminating double-click and duplicate POSTs in Docker logs.
- Added re-entry guard for `handleSaveAll` (hero & site settings).

### 3. Complete CRUD & Admin Modal Upgrades (Task 3)
- **Services**:
  - `POST /backend/admin/services`: Auto-generates clean unique slug from title; auto-increments sequence number (`01`, `02`, ...) and position; supports `bullets` array.
  - `PUT /backend/admin/services/:id`: Dynamically updates only fields actually sent (`number`, `title`, `slug`, `description`, `bullets`, `cta`, `position`, `status`).
  - Added `number`, `slug`, and `bullets` (multi-line) input fields to the Admin modal.
- **Projects**:
  - `POST /backend/admin/projects`: Auto-generates slug; auto-increments position; handles `tags` array.
  - `PUT /backend/admin/projects/:id`: Dynamically updates `title`, `slug`, `category`, `summary`, `tags`, `url`, `body`, `featured`, `position`, `status`.
  - Added `slug` and `tags` (comma separated) fields to the Admin modal.
- **Team**:
  - `POST /backend/admin/team` & `PUT /backend/admin/team/:id`: Full support for social links (`github`, `linkedin`, `twitter`) and photo URL.
- **Articles (Posts)**:
  - `POST /backend/admin/posts` & `PUT /backend/admin/posts/:id`: Support for `title`, `slug`, `category`, `excerpt`, `body`, `author`, `readMinutes`, `status`.
- **FAQs**:
  - `POST /backend/admin/faqs` & `PUT /backend/admin/faqs/:id`: Full support for `question`, `answer`, `category`, `position`, `status`.

### 4. Automatic & Safe Database Initialization (Task 4)
- Created `apps/api/src/db/init.ts` exporting `initializeDatabase()`.
- Automatically applies pending Drizzle migrations (`runMigrations()`), creates admin account (`seed()`), and populates initial site content (`seedInitialContent()`) on container start.
- All seeding operations are 100% idempotent (skips existing records).
- `PUT /backend/admin/pages/:slug/sections` now automatically upserts the target page row if missing, eliminating 404 errors.
- Fastify server in `apps/api/src/index.ts` and `entrypoint.sh` wait for database initialization before serving traffic.

### 5. Security & Upload Hardening (Task 5)
- Rotated default passwords away from `AdminPassword123!` across `env.ts`, `.env.example`, and seeds.
- Hardened media uploads in `apps/api/src/routes/media.ts`:
  - Strict extension and MIME allowlist: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`.
  - File signature (magic bytes) verification directly in Node buffer to block spoofed/renamed files (`.php`, `.html`, `.svg`, `.txt`, `.exe`).
  - Strict 15MB file size limit enforced.
  - SVGs are served safely as static assets from `apps/web/public/` (`/logo.svg`, `/favicon.png`).
- Session cookies set with `HttpOnly`, `SameSite=Lax`, and `Secure` flags.
- Rate limiting active on login (10 req/min) and contact form (10 req/hour).

### 6. Cleanup & Proxy Route Gateway (Task 6)
- Deleted all `*.bak` and `*.save*` files from the repository.
- Overhauled `apps/web/src/app/api/backend/[...path]/route.ts`:
  - Configurable `API_BASE` via `API_INTERNAL_URL` (defaults to internal container port 4000).
  - Preserves binary/multipart file uploads using `arrayBuffer` buffer forwarding.
  - Forwards `set-cookie` headers back to client across all HTTP methods (GET, POST, PUT, PATCH, DELETE).
- Fixed `apps/web/src/app/api/contact/route.ts` to forward to `/backend/forms/contact` (matching Fastify prefix).

### 7. Public Site Caching & Dynamic Articles (Task 7)
- Changed `Cache-Control` in `apps/api/src/routes/public.ts` to `no-cache, no-store, must-revalidate` so updates made in `/admin` reflect immediately on the frontend.
- Added `{ cache: 'no-store' }` to frontend fetches in `Services.tsx`, `FeaturedProjects.tsx`, `Hero.tsx`, `TeamSection.tsx`, and `Navbar.tsx`.
- Updated `apps/web/src/app/articles/page.tsx` to dynamically fetch published posts from `/api/backend/public/posts` with fallback to static articles.

### 8. Operations & Docker Performance (Task 8)
- Added `.dockerignore` to eliminate transferring `node_modules`, `.next`, and `.git` into build context.
- Optimized `Dockerfile` with multi-stage build and dependency caching (`deps` layer), reducing rebuild time from 10–15 minutes to under 1–2 minutes.
- Created `scripts/backup-db.sh` for automated daily PostgreSQL backups with 14-day retention.
- Created `scripts/reset-admin-password.sh` for easy admin credential resets.
- Confirmed `restart: unless-stopped` on all Docker services.
