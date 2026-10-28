# CodeXplus Operations & Deployment Guide

## 1. Architecture & Port Allocation

- **Frontend Container**: `codexplus_app`
  - Next.js 15: internal port `3000` -> exposed on `127.0.0.1:3000`
  - Fastify 5 API: internal port `4000` -> exposed on `127.0.0.1:4001`
  - *Host port 4000 is intentionally preserved for external PM2 services.*
- **Database Container**: `codexplus_postgres`
  - PostgreSQL 16 Alpine: internal port `5432` -> exposed on `127.0.0.1:5433`
  - User / Database: `codexfastify`

---

## 2. Deployment & Build

To rebuild and deploy the unified app:

```bash
docker-compose up -d --build app
```

### Build Optimization
- The `Dockerfile` uses a cached dependency layer (`base` -> `deps` -> `builder` -> `runner`).
- Rebuild times after code modifications take **under 1–2 minutes** instead of 10–15 minutes.
- `restart: unless-stopped` is configured on both containers to survive server reboots.

---

## 3. Automated Database Initialization & Seeding

On container startup, `entrypoint.sh` starts Fastify, which executes `src/db/init.ts`:
1. **Migrations**: Automatically executes pending Drizzle migrations from `./drizzle`.
2. **Admin User**: Ensures the primary admin account exists (idempotent, skips if present).
3. **Seed Content**: Ensures Site Settings, Navigation, Home Sections, Services, Projects, and Team exist (idempotent, skips if present).
4. **Pages & Sections Upsert**: `PUT /backend/admin/pages/:slug/sections` automatically creates the page record if missing, preventing 404s.

No manual seeding commands are required on fresh deployments.

---

## 4. PostgreSQL Backup & Restore

### Automated Daily Backup Script
A backup script is available at `scripts/backup-db.sh`. It performs an atomic `pg_dump`, compresses with `gzip -9`, and purges backups older than 14 days.

To configure daily backups via crontab:
```bash
# Open crontab
crontab -e

# Run every night at 03:00 AM
0 3 * * * /bin/bash /www/wwwroot/codexplus.site/scripts/backup-db.sh >> /var/log/codexplus_backup.log 2>&1
```

### Manual Backup Command
```bash
docker exec codexplus_postgres pg_dump -U codexfastify -d codexfastify | gzip -9 > codexplus_manual_backup_$(date +%F).sql.gz
```

### Restore Command
```bash
# CAUTION: Ensure container is running before restoring
gunzip -c codexplus_manual_backup_YYYYMMDD.sql.gz | docker exec -i codexplus_postgres psql -U codexfastify -d codexfastify
```

---

## 5. Admin Password Reset

To reset or update the admin credentials directly in the database:

### Using Helper Script:
```bash
./scripts/reset-admin-password.sh admin@codexplus.site 'YourNewStrongPassword!2026'
```

### Via Admin Panel:
Log in to `/admin` -> Navigate to **Admin Security** tab -> Enter Current Password, New Password, and click **Update Admin Credentials**.

---

## 6. Security Hardening & Media Allowlist

- **Upload Restrictions**:
  - Allowed extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`.
  - Extension and MIME type must match strictly.
  - File signature (magic bytes) verified directly in Node buffer to prevent renamed `.php`, `.html`, or executable files.
  - SVG uploads are blocked to eliminate stored XSS risks. (Brand logo and favicon SVGs are served safely from `/public`).
  - Maximum upload file size: **15 MB**.
- **Session Cookies**:
  - `access_token` and `refresh_token` cookies set with `HttpOnly`, `SameSite=Lax`, and `Secure` (in production).
- **Rate Limiting**:
  - Global: 100 requests / minute.
  - Login route (`/backend/auth/login`): 10 attempts / minute.
  - Contact form route: 10 submissions / hour.
