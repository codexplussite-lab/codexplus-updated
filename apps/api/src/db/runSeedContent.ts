import { seedInitialContent } from './seedContent.js';

async function run() {
  await seedInitialContent();
  console.log('Seeding finished successfully.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
