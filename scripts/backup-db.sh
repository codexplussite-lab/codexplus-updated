#!/usr/bin/env bash
set -euo pipefail

# Configuration
CONTAINER_NAME="codexplus_postgres"
DB_USER="codexfastify"
DB_NAME="codexfastify"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/codexplus}"
RETENTION_DAYS=14
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/codexplus_db_${TIMESTAMP}.sql.gz"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

echo "🔄 [$(date)] Starting PostgreSQL database backup for ${DB_NAME}..."

# Execute pg_dump inside container and compress with gzip
if docker exec "${CONTAINER_NAME}" pg_dump -U "${DB_USER}" -d "${DB_NAME}" | gzip -9 > "${BACKUP_FILE}"; then
  echo "✅ Backup successfully created at: ${BACKUP_FILE} ($(du -sh "${BACKUP_FILE}" | cut -f1))"
else
  echo "❌ Backup failed!" >&2
  exit 1
fi

# Cleanup old backups older than RETENTION_DAYS
echo "🧹 Removing backups older than ${RETENTION_DAYS} days from ${BACKUP_DIR}..."
find "${BACKUP_DIR}" -type f -name "codexplus_db_*.sql.gz" -mtime +"${RETENTION_DAYS}" -delete

echo "✨ Backup job completed successfully."
