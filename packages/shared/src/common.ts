import { z } from 'zod';
import { withMeta } from './meta.js';

export const StatusEnum = z.enum(['draft', 'published']);
export type Status = z.infer<typeof StatusEnum>;

export const RoleEnum = z.enum(['admin', 'editor']);
export type Role = z.infer<typeof RoleEnum>;

export const LinkSchema = z.object({
  label: withMeta(z.string().min(1), { label: 'Link Label', widget: 'text' }),
  href: withMeta(z.string().min(1), { label: 'URL / Path', widget: 'link' }),
  target: z.enum(['_self', '_blank']).default('_self').optional(),
});
export type Link = z.infer<typeof LinkSchema>;

export const SeoSchema = z.object({
  title: withMeta(z.string().min(1).max(70), { label: 'Meta Title', widget: 'text', maxLength: 70 }),
  description: withMeta(z.string().max(160).optional(), { label: 'Meta Description', widget: 'textarea', maxLength: 160 }),
  ogImage: withMeta(z.string().uuid().optional(), { label: 'OG Image ID', widget: 'image', referenceCollection: 'media' }),
  keywords: z.array(z.string()).optional(),
  noIndex: z.boolean().default(false),
});
export type Seo = z.infer<typeof SeoSchema>;

export const MediaVariantSchema = z.object({
  width: z.number(),
  height: z.number(),
  url: z.string().url(),
  format: z.enum(['webp', 'avif']),
  size: z.number(),
});

export const MediaSchema = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  mime: z.string(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  blurhash: z.string().nullable().optional(),
  alt: z.string().default(''),
  folder: z.string().default('general'),
  variants: z.record(z.string(), MediaVariantSchema).optional(),
  uploadedBy: z.string().uuid().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type Media = z.infer<typeof MediaSchema>;
