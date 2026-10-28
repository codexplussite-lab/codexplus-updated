#!/bin/sh
set -e

echo "🚀 Starting CodeXplus Application Services..."

# 1. Start Fastify API (runs migrations and idempotent seeds automatically)
cd /app/apps/api
node dist/index.js &
API_PID=$!

# Wait briefly for Fastify API to bind and be healthy
echo "⏳ Waiting for Fastify API to become ready..."
for i in $(seq 1 30); do
  if wget -qO- http://127.0.0.1:4000/health >/dev/null 2>&1; then
    echo "✅ Fastify API is ready and listening on port 4000."
    break
  fi
  sleep 1
done

# 2. Start Next.js Frontend in foreground
echo "🌐 Starting Next.js Frontend on port 3000..."
cd /app/apps/web && exec npx next start -p 3000
