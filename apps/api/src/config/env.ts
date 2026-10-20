import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DATABASE_URL: z.string().url(),
  COOKIE_SECRET: z.string().min(32),
  ACCESS_TTL: z.coerce.number().default(900), // 15 mins
  REFRESH_TTL: z.coerce.number().default(604800), // 7 days
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),

  UPLOADS_DIR: z.string().default('./uploads'),
  MEDIA_BASE_URL: z.string().url().default('http://localhost:4000/uploads'),

  WEB_REVALIDATE_URL: z.string().url().optional(),
  REVALIDATE_SECRET: z.string().optional(),
  PREVIEW_SECRET: z.string().default('super-preview-secret-codexplus'),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_TO: z.string().email().optional(),

  TURNSTILE_SECRET: z.string().optional(),

  ADMIN_SEED_EMAIL: z.string().email().default('admin@codexplus.site'),
  ADMIN_SEED_PASSWORD: z.string().min(8).default('AdminPassword123!'),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);
