import { z } from 'zod';
import { withMeta } from './meta.js';
import { LinkSchema } from './common.js';

// Base props for every section block
const BaseSectionBlock = z.object({
  anchorId: withMeta(z.string().optional(), { label: 'Anchor ID (e.g. #about)', widget: 'text' }),
  enabled: withMeta(z.boolean().default(true), { label: 'Enabled / Visible', widget: 'toggle' }),
  theme: withMeta(z.enum(['default', 'dark', 'light']).default('default').optional(), {
    label: 'Theme Override',
    widget: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Dark', value: 'dark' },
      { label: 'Light', value: 'light' },
    ],
  }),
});

// 1. Hero Block
export const HeroBlockSchema = BaseSectionBlock.extend({
  type: z.literal('hero'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow Text', widget: 'text' }),
  headline: withMeta(z.string().min(1), { label: 'Headline', widget: 'text' }),
  description: withMeta(z.string().optional(), { label: 'Description', widget: 'textarea' }),
  primaryCta: withMeta(LinkSchema.optional(), { label: 'Primary CTA', widget: 'link' }),
  secondaryCta: withMeta(LinkSchema.optional(), { label: 'Secondary CTA', widget: 'link' }),
  scrollLabel: withMeta(z.string().default('Scroll Down'), { label: 'Scroll Button Label', widget: 'text' }),
  heroMediaId: withMeta(z.string().uuid().nullable().optional(), { label: 'Hero Image / Video', widget: 'image', referenceCollection: 'media' }),
});
export type HeroBlock = z.infer<typeof HeroBlockSchema>;

// 2. Client Marquee Block
export const ClientMarqueeBlockSchema = BaseSectionBlock.extend({
  type: z.literal('clientMarquee'),
  label: withMeta(z.string().optional(), { label: 'Marquee Title / Label', widget: 'text' }),
  items: withMeta(
    z.array(
      z.object({
        name: z.string(),
        logoId: z.string().uuid().nullable().optional(),
        href: z.string().url().optional(),
      })
    ),
    { label: 'Client Items', widget: 'array' }
  ),
  speed: withMeta(z.number().default(40), { label: 'Animation Speed (seconds)', widget: 'number' }),
  direction: withMeta(z.enum(['left', 'right']).default('left'), {
    label: 'Scroll Direction',
    widget: 'select',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
  }),
});
export type ClientMarqueeBlock = z.infer<typeof ClientMarqueeBlockSchema>;

// 3. About Stats Block
export const AboutStatsBlockSchema = BaseSectionBlock.extend({
  type: z.literal('aboutStats'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  paragraphs: withMeta(z.array(z.string()).min(1), { label: 'Intro Paragraphs', widget: 'array' }),
  points: withMeta(z.array(z.string()).default([]), { label: 'Bullet Points', widget: 'array' }),
  stats: withMeta(
    z.array(
      z.object({
        value: z.string(),
        suffix: z.string().optional(),
        label: z.string(),
      })
    ).default([]),
    { label: 'Metric Stats', widget: 'array' }
  ),
  badges: withMeta(
    z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ).default([]),
    { label: 'Highlight Badges', widget: 'array' }
  ),
  cta: withMeta(LinkSchema.optional(), { label: 'CTA Link', widget: 'link' }),
  imageId: withMeta(z.string().uuid().nullable().optional(), { label: 'Side Image', widget: 'image', referenceCollection: 'media' }),
});
export type AboutStatsBlock = z.infer<typeof AboutStatsBlockSchema>;

// 4. Services Block
export const ServicesBlockSchema = BaseSectionBlock.extend({
  type: z.literal('services'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  intro: withMeta(z.string().optional(), { label: 'Intro Summary', widget: 'textarea' }),
  serviceIds: withMeta(z.array(z.string().uuid()).default([]), {
    label: 'Referenced Services',
    widget: 'array',
    referenceCollection: 'services',
  }),
  marqueeTags: withMeta(z.array(z.string()).default([]), { label: 'Services Marquee Chips', widget: 'array' }),
  layout: withMeta(z.enum(['grid', 'list']).default('grid'), {
    label: 'Display Layout',
    widget: 'select',
    options: [
      { label: 'Grid (2x2)', value: 'grid' },
      { label: 'List', value: 'list' },
    ],
  }),
});
export type ServicesBlock = z.infer<typeof ServicesBlockSchema>;

// 5. Why Us Block
export const WhyUsBlockSchema = BaseSectionBlock.extend({
  type: z.literal('whyUs'),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  items: withMeta(
    z.array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      })
    ).max(3),
    { label: 'Why Us Differentiators (Max 3)', widget: 'array' }
  ),
});
export type WhyUsBlock = z.infer<typeof WhyUsBlockSchema>;

// 6. Tech Stack Block
export const TechStackBlockSchema = BaseSectionBlock.extend({
  type: z.literal('techStack'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  intro: withMeta(z.string().optional(), { label: 'Intro Text', widget: 'textarea' }),
  groupIds: withMeta(z.array(z.string().uuid()).default([]), {
    label: 'Tech Stack Groups',
    widget: 'array',
    referenceCollection: 'tech_stack_groups',
  }),
  showMarquee: withMeta(z.boolean().default(true), { label: 'Show Tech Marquee', widget: 'toggle' }),
});
export type TechStackBlock = z.infer<typeof TechStackBlockSchema>;

// 7. Featured Projects Block
export const FeaturedProjectsBlockSchema = BaseSectionBlock.extend({
  type: z.literal('featuredProjects'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  filters: withMeta(z.array(z.string()).default([]), { label: 'Category Filter Chips', widget: 'array' }),
  limit: withMeta(z.number().default(6), { label: 'Display Limit', widget: 'number' }),
  projectIds: withMeta(z.array(z.string().uuid()).optional(), {
    label: 'Manual Project Selection (Optional)',
    widget: 'array',
    referenceCollection: 'projects',
  }),
  cta: withMeta(LinkSchema.optional(), { label: 'All Projects CTA', widget: 'link' }),
});
export type FeaturedProjectsBlock = z.infer<typeof FeaturedProjectsBlockSchema>;

// 8. Testimonials Block
export const TestimonialsBlockSchema = BaseSectionBlock.extend({
  type: z.literal('testimonials'),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  subheading: withMeta(z.string().optional(), { label: 'Subheading', widget: 'text' }),
  testimonialIds: withMeta(z.array(z.string().uuid()).default([]), {
    label: 'Referenced Testimonials',
    widget: 'array',
    referenceCollection: 'testimonials',
  }),
  showRating: withMeta(z.boolean().default(true), { label: 'Show Stars / Rating', widget: 'toggle' }),
});
export type TestimonialsBlock = z.infer<typeof TestimonialsBlockSchema>;

// 9. Journal Block
export const JournalBlockSchema = BaseSectionBlock.extend({
  type: z.literal('journal'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  limit: withMeta(z.number().default(3), { label: 'Number of Posts', widget: 'number' }),
  allArticlesCta: withMeta(LinkSchema.optional(), { label: 'All Articles Link', widget: 'link' }),
});
export type JournalBlock = z.infer<typeof JournalBlockSchema>;

// 10. CTA Block
export const CtaBlockSchema = BaseSectionBlock.extend({
  type: z.literal('cta'),
  eyebrow: withMeta(z.string().optional(), { label: 'Eyebrow', widget: 'text' }),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  description: withMeta(z.string().optional(), { label: 'Description', widget: 'textarea' }),
  email: withMeta(z.string().email().optional(), { label: 'Contact Email', widget: 'text' }),
  badge: withMeta(z.string().optional(), { label: 'Status Badge (e.g. Booking Q4)', widget: 'text' }),
  primaryCta: withMeta(LinkSchema.optional(), { label: 'Primary CTA', widget: 'link' }),
  secondaryCta: withMeta(LinkSchema.optional(), { label: 'Secondary CTA', widget: 'link' }),
});
export type CtaBlock = z.infer<typeof CtaBlockSchema>;

// 11. Contact Form Block
export const ContactFormBlockSchema = BaseSectionBlock.extend({
  type: z.literal('contactForm'),
  heading: withMeta(z.string().min(1), { label: 'Heading', widget: 'text' }),
  intro: withMeta(z.string().optional(), { label: 'Intro Text', widget: 'textarea' }),
  details: z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
  submitLabel: withMeta(z.string().default('SUBMIT'), { label: 'Button Label', widget: 'text' }),
  successMessage: withMeta(z.string().default('Thank you! Your message has been received.'), { label: 'Success Alert', widget: 'text' }),
});
export type ContactFormBlock = z.infer<typeof ContactFormBlockSchema>;

// Discriminated union of all section blocks
export const SectionBlockSchema = z.discriminatedUnion('type', [
  HeroBlockSchema,
  ClientMarqueeBlockSchema,
  AboutStatsBlockSchema,
  ServicesBlockSchema,
  WhyUsBlockSchema,
  TechStackBlockSchema,
  FeaturedProjectsBlockSchema,
  TestimonialsBlockSchema,
  JournalBlockSchema,
  CtaBlockSchema,
  ContactFormBlockSchema,
]);
export type SectionBlock = z.infer<typeof SectionBlockSchema>;
export type SectionBlockType = SectionBlock['type'];
