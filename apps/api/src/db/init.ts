import { runMigrations } from './migrate.js';
import { seed } from './seed.js';
import { seedInitialContent } from './seedContent.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function initializeDatabase() {
  console.log('🔄 Checking database migrations and initial seed status...');

  let lastErr: any;
  for (let attempt = 1; attempt <= 15; attempt++) {
    try {
      await runMigrations();
      lastErr = null;
      break;
    } catch (err: any) {
      lastErr = err;
      console.warn(`⚠️ Migration attempt ${attempt}/15 failed: ${err?.message || err}`);
      await sleep(3000);
    }
  }
  if (lastErr) {
    throw new Error('Database migrations failed: ' + (lastErr?.message || lastErr));
  }

  await seed();
  await seedInitialContent();
  console.log('✅ Database initialization complete.');
}
