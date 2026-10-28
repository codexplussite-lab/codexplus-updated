import { runMigrations } from './migrate.js';
import { seed } from './seed.js';
import { seedInitialContent } from './seedContent.js';

export async function initializeDatabase() {
  console.log('🔄 Checking database migrations and initial seed status...');
  try {
    await runMigrations();
  } catch (err: any) {
    console.warn('⚠️ Migration warning (tables may already exist):', err?.message || err);
  }

  try {
    await seed();
  } catch (err: any) {
    console.warn('⚠️ Admin user seed warning:', err?.message || err);
  }

  try {
    await seedInitialContent();
  } catch (err: any) {
    console.warn('⚠️ Initial content seed warning:', err?.message || err);
  }
  console.log('✅ Database initialization check complete.');
}

if (process.env.NODE_ENV !== 'test' && process.argv[1]?.includes('init')) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Database initialization error:', err);
      process.exit(1);
    });
}
