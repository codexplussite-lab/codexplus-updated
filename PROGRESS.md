# CodeXplus Rebuild — Project Progress Tracker

## Status Overview
- Current Phase: Phase 9 (Stabilization, Security & Production Docker Hardening)
- Last Updated: 28 Oct 2026

---

## Phases Checklist

- [x] **Phase 0: Setup**
  - [x] Git repository initialized
  - [x] Root `AGENTS.md` created
  - [x] Monorepo structure (`pnpm-workspace.yaml`, base `package.json`, `tsconfig.base.json`)
- [x] **Phase 1: Design Extraction & Tokens** (`design-ref/`)
- [x] **Phase 2: Contract & Shared Schemas** (`packages/shared`)
- [x] **Phase 3: Database & Migrations** (`apps/api` Drizzle + Postgres)
- [x] **Phase 4: Fastify API Core & CRUD Modules**
- [x] **Phase 5: Content Scrape & Seed Assets**
- [x] **Phase 6: Admin Panel & Web Frontend**
- [x] **Phase 7: Forms & Seed Import**
- [x] **Phase 8: Visual QA**
- [x] **Phase 9: Stabilization, Operations & Security Review**
  - [x] Task 1: Fix root cause of singular URLs (`ENDPOINT_MAP` in `apps/web/src/app/admin/page.tsx`), remove API rewrite workaround
  - [x] Task 2: Duplicate submission prevention in admin (`isSavingModalRef`, disabled button, spinner)
  - [x] Task 3: Complete CRUD with auto-slug, position, number increment, and extended form fields
  - [x] Task 4: Automated, idempotent database init & migrations (`apps/api/src/db/init.ts`) on container boot
  - [x] Task 5: Security hardening, credential rotation, magic-byte media validation (15MB limit), safe static SVG logo
  - [x] Task 6: Repository cleanup (*.bak removed, obsolete upload route deleted, proxy rewritten with binary arrayBuffer)
  - [x] Task 7: Dynamic frontend data freshness (`cache: 'no-store'`, dynamic Articles page)
  - [x] Task 8: Operations tooling (`scripts/backup-db.sh`, `scripts/reset-admin-password.sh`, `Dockerfile` dependency layer caching)
- [ ] **Phase 10: Server Deployment & Acceptance Verification**

---

## Open Decisions & Content TODOs
1. **Team Profiles Verification (Pending Owner Confirmation)**:
   - `Arman Naqvi` (Lead Architect & Founder): Confirm bio, role, and official social handles (GitHub, LinkedIn, Twitter).
   - `Sofia Chen`, `Marcus Vance`, `Elena Rostova`: Confirm whether these are actual team members/partners or if team section should only feature confirmed founders/leads. (Currently displayed with "Pending confirmation" flags).
2. **Case Studies & Portfolio Verification**:
   - `Lemonide Tech Enterprise Portal`, `Viper Creative Experience Studio`, `Million One Global Commerce`: Currently labeled accurately as Architecture Demos / Motion Studies / Proof-of-Concepts derived from template references with "Request Brief" actions. Owner to confirm whether genuine completed client case studies and screenshots can be published.
3. **Testimonials Confirmation**:
   - Sample testimonials (`Elena Vasquez`, `Marcus Feld`, `Sofia Lindgren`) are marked as concept demos and kept off production pages pending verified client quotes and permissions.
4. **Counters & Metrics**:
   - Replaced speculative numbers (e.g. 40k+ shipped, 99% retention) with verified qualitative engineering pillars (Senior Execution, 100% Type Safe, Fastify & Next.js 15, 24h Turnaround).
5. **Contact Info & Location**:
   - Confirm official Karachi office address and final primary domain email (`ha4244488@gmail.com` / `info@codexplus.site` / `hello@codexplus.studio`).
6. **Social Media Accounts**:
   - Provide verified organization handles for GitHub, LinkedIn, and X/Twitter.
