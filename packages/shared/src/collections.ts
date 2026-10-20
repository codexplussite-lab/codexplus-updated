import { z } from 'zod';
import { withMeta } from './meta.js';
import { StatusEnum, LinkSchema, SeoSchema } from './common.js';

// 1. Site Settings (Singleton)
export const SiteSettingsSchema = z.object({
  siteName: withMeta(z.string().min(1).default('CodeXplus'), { label: 'Site Name', widget: 'text' }),
  tagline: withMeta(z.string().optional(), { label: 'Tagline', widget: 'text' }),
  logoId: withMeta(z.string().uuid().nullable().optional(), { label: 'Site Logo', widget: 'image', referenceCollection: 'media' }),
  faviconId: withMeta(z.string().uuid().nullable().optional(), { label: 'Favicon', widget: 'image', referenceCollection: 'media' }),
  seo: SeoSchema.optional(),
  contact: z.object({
    email: withMeta(z.string().email(), { label: 'Contact Email', widget: 'text' }),
    phone: withMeta(z.string(), { label: 'Phone Number', widget: 'text' }),
    whatsapp: withMeta(z.string().optional(), { label: 'WhatsApp Link', widget: 'link' }),
    address: withMeta(z.string(), { label: 'Address', widget: 'textarea' }),
  }),
  socials: z.object({
    github: withMeta(z.string().url().optional(), { label: 'GitHub URL', widget: 'link' }),
    linkedin: withMeta(z.string().url().optional(), { label: 'LinkedIn URL', widget: 'link' }),
    twitter: withMeta(z.string().url().optional(), { label: 'Twitter / X URL', widget: 'link' }),
    instagram: withMeta(z.string().url().optional(), { label: 'Instagram URL', widget: 'link' }),
    dribbble: withMeta(z.string().url().optional(), { label: 'Dribbble URL', widget: 'link' }),
  }),
  footer: z.object({
    newsletterLabel: z.string().default('Subscribe our newsletter:'),
    copyright: z.string().default('© Copyright 2026 - CodeXplus. All Rights Reserved.'),
    credits: z.string().optional(),
  }),
});
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

// 2. Navigation Item (Singleton)
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
export const NavItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    children: z.array(NavItemSchema).optional(),
  })
);

export const NavigationSchema = z.object({
  items: z.array(NavItemSchema),
  cta: LinkSchema.optional(),
});
export type Navigation = z.infer<typeof NavigationSchema>;

// 3. Service
export const ServiceSchema = z.object({
  id: z.string().uuid().optional(),
  number: withMeta(z.string(), { label: 'Service Number (e.g. 01)', widget: 'text' }),
  title: withMeta(z.string().min(1), { label: 'Title', widget: 'text' }),
  slug: withMeta(z.string().min(1), { label: 'Slug', widget: 'text' }),
  description: withMeta(z.string(), { label: 'Description', widget: 'textarea' }),
  bullets: withMeta(z.array(z.string()), { label: 'Bullet Points', widget: 'array' }),
  cta: LinkSchema.optional(),
  position: z.number().default(0),
  status: StatusEnum.default('draft'),
});
export type Service = z.infer<typeof ServiceSchema>;

// 4. Project
export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  title: withMeta(z.string().min(1), { label: 'Project Title', widget: 'text' }),
  slug: withMeta(z.string().min(1), { label: 'Slug', widget: 'text' }),
  category: withMeta(z.string().min(1), { label: 'Category', widget: 'text' }),
  summary: withMeta(z.string(), { label: 'Short Summary', widget: 'textarea' }),
  year: withMeta(z.string().default('2026'), { label: 'Year', widget: 'text' }),
  client: withMeta(z.string().optional(), { label: 'Client Name', widget: 'text' }),
  tags: withMeta(z.array(z.string()).default([]), { label: 'Tags', widget: 'array' }),
  coverId: withMeta(z.string().uuid().nullable().optional(), { label: 'Cover Image', widget: 'image', referenceCollection: 'media' }),
  gallery: withMeta(z.array(z.string().uuid()).default([]), { label: 'Gallery Images', widget: 'array', referenceCollection: 'media' }),
  url: withMeta(z.string().url().optional(), { label: 'Live URL', widget: 'link' }),
  body: withMeta(z.any().optional(), { label: 'Case Study Body (Tiptap)', widget: 'richText' }),
  featured: withMeta(z.boolean().default(false), { label: 'Featured Project', widget: 'toggle' }),
  position: z.number().default(0),
  status: StatusEnum.default('draft'),
  seo: SeoSchema.optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

// 5. Testimonial
export const TestimonialSchema = z.object({
  id: z.string().uuid().optional(),
  name: withMeta(z.string().min(1), { label: 'Client Name', widget: 'text' }),
  role: withMeta(z.string(), { label: 'Role / Designation', widget: 'text' }),
  company: withMeta(z.string(), { label: 'Company Name', widget: 'text' }),
  quote: withMeta(z.string(), { label: 'Quote / Testimonial', widget: 'textarea' }),
  rating: withMeta(z.number().min(1).max(5).default(5), { label: 'Rating (1-5)', widget: 'number' }),
  avatarId: withMeta(z.string().uuid().nullable().optional(), { label: 'Avatar Photo', widget: 'image', referenceCollection: 'media' }),
  position: z.number().default(0),
  status: StatusEnum.default('draft'),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

// 6. Post (Blog / Journal)
export const PostSchema = z.object({
  id: z.string().uuid().optional(),
  title: withMeta(z.string().min(1), { label: 'Post Title', widget: 'text' }),
  slug: withMeta(z.string().min(1), { label: 'Slug', widget: 'text' }),
  category: withMeta(z.string().min(1), { label: 'Category', widget: 'text' }),
  excerpt: withMeta(z.string(), { label: 'Excerpt', widget: 'textarea' }),
  body: withMeta(z.any(), { label: 'Content (Tiptap JSON)', widget: 'richText' }),
  coverId: withMeta(z.string().uuid().nullable().optional(), { label: 'Cover Image', widget: 'image', referenceCollection: 'media' }),
  author: withMeta(z.string().default('CodeXplus Team'), { label: 'Author', widget: 'text' }),
  readMinutes: withMeta(z.number().default(5), { label: 'Estimated Read Minutes', widget: 'number' }),
  publishedAt: z.string().datetime().nullable().optional(),
  status: StatusEnum.default('draft'),
  seo: SeoSchema.optional(),
});
export type Post = z.infer<typeof PostSchema>;

// 7. Team Member
export const TeamMemberSchema = z.object({
  id: z.string().uuid().optional(),
  name: withMeta(z.string().min(1), { label: 'Member Name', widget: 'text' }),
  role: withMeta(z.string(), { label: 'Role / Title', widget: 'text' }),
  photoId: withMeta(z.string().uuid().nullable().optional(), { label: 'Photo', widget: 'image', referenceCollection: 'media' }),
  bio: withMeta(z.string().optional(), { label: 'Short Bio', widget: 'textarea' }),
  socials: z.record(z.string(), z.string()).optional(),
  position: z.number().default(0),
  status: StatusEnum.default('draft'),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

// 8. Client (Partners / Logo wall)
export const ClientSchema = z.object({
  id: z.string().uuid().optional(),
  name: withMeta(z.string().min(1), { label: 'Client Name', widget: 'text' }),
  logoId: withMeta(z.string().uuid().nullable().optional(), { label: 'Logo Image', widget: 'image', referenceCollection: 'media' }),
  href: withMeta(z.string().url().optional(), { label: 'Website Link', widget: 'link' }),
  position: z.number().default(0),
});
export type Client = z.infer<typeof ClientSchema>;

// 9. Tech Stack Group
export const TechStackGroupSchema = z.object({
  id: z.string().uuid().optional(),
  title: withMeta(z.string().min(1), { label: 'Group Title (e.g. Frontend)', widget: 'text' }),
  items: withMeta(
    z.array(
      z.object({
        name: z.string(),
        icon: z.string().optional(),
        description: z.string().optional(),
      })
    ),
    { label: 'Technologies', widget: 'array' }
  ),
  position: z.number().default(0),
});
export type TechStackGroup = z.infer<typeof TechStackGroupSchema>;

// 10. FAQ
export const FaqSchema = z.object({
  id: z.string().uuid().optional(),
  question: withMeta(z.string().min(1), { label: 'Question', widget: 'text' }),
  answer: withMeta(z.string().min(1), { label: 'Answer', widget: 'textarea' }),
  position: z.number().default(0),
  status: StatusEnum.default('draft'),
});
export type Faq = z.infer<typeof FaqSchema>;
