#!/usr/bin/env bash
set -euo pipefail

EMAIL="${1:-admin@codexplus.site}"
NEW_PASS="${2:-}"

if [ -z "$NEW_PASS" ]; then
  echo "Usage: ./scripts/reset-admin-password.sh <email> <new_password>"
  echo "Example: ./scripts/reset-admin-password.sh admin@codexplus.site 'MyNewStrongPass!2026'"
  exit 1
fi

echo "🔐 Resetting password for $EMAIL in container..."
docker exec codexplus_app sh -c "cd /app/apps/api && node -e '
const argon2 = require(\"argon2\");
const { Client } = require(\"pg\");

async function run() {
  const email = process.argv[1];
  const newPass = process.argv[2];
  const hash = await argon2.hash(newPass, { type: argon2.argon2id });
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query(\"UPDATE users SET password_hash = \$1, updated_at = NOW() WHERE email = \$2\", [hash, email]);
  if (res.rowCount === 0) {
    console.error(\"User not found for email: \" + email);
    await client.end();
    process.exit(1);
  }
  console.log(\"✅ Password successfully updated for user: \" + email);
  await client.end();
}
run();
' \"$EMAIL\" \"$NEW_PASS\""
