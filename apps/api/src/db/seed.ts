import argon2 from 'argon2';
import { db } from './index.js';
import { users } from './schema.js';
import { env } from '../config/env.js';
import { eq } from 'drizzle-orm';

export async function seed() {
  console.log('Seeding initial admin user...');
  const existing = await db.select().from(users).where(eq(users.email, env.ADMIN_SEED_EMAIL)).limit(1);

  if (existing.length > 0) {
    console.log(`Admin user ${env.ADMIN_SEED_EMAIL} already exists. Skipping.`);
    return;
  }

  const hash = await argon2.hash(env.ADMIN_SEED_PASSWORD, {
    type: argon2.argon2id,
  });

  await db.insert(users).values({
    email: env.ADMIN_SEED_EMAIL,
    passwordHash: hash,
    role: 'admin',
    isActive: true,
  });

  console.log(`Initial admin created: ${env.ADMIN_SEED_EMAIL}`);
}
