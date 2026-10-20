# CodeXplus — Agent rules

## Project
Monorepo (pnpm): apps/api (Fastify 5, TypeScript strict), apps/admin (Vite + React), apps/web (Next.js 15 App Router), packages/shared (zod schemas + inferred types).
Goal: rebuild codexplus.site on the Webangles template layout, with a custom Fastify backend and a custom admin panel that controls the whole site (replacing Sanity). Full plan: docs/PLAN.md. Design reference: design-ref/. Content: content/seed/.

## Conventions
- zod schemas in packages/shared are the single source of truth for validation, admin forms, and types.
- No any. Env validated with zod at startup. Error shape: { error: { code, message, details } }.
- Postgres via Drizzle with migrations; never edit an applied migration.
- Public API is read-only and returns published content only. Never expose password hashes or internal fields.
- Conventional commits. Ask before adding dependencies outside the approved list in docs/PLAN.md section 2.

## Operating rules for the agent
- One phase per session. Before finishing: run typecheck, lint, tests; update PROGRESS.md (done / next / open decisions); commit on the phase branch.
- Never read, print, or edit .env* files or commit secrets; use .env.example.
- Never run destructive DB commands (drop/truncate/reset) except on the local docker test DB.
- For any change to packages/shared, list affected apps and update them in the same task.
- After the API phase, export OpenAPI and write docs/api.md as the contract for admin and web.
- Never copy text from the Webangles template; only layout, spacing, typography and motion are references.
- When unsure about a design decision, write it under Open decisions in PROGRESS.md and ask instead of guessing.
