import { db } from './index.js';
import {
  siteSettings,
  navigation,
  pages,
  pageSections,
  services,
  projects,
  teamMembers,
} from './schema.js';
import { eq } from 'drizzle-orm';

export async function seedInitialContent() {
  console.log('Seeding initial site content...');

  // 1. Site Settings
  const [existingSettings] = await db.select().from(siteSettings).limit(1);
  if (!existingSettings) {
    await db.insert(siteSettings).values({
      siteName: 'CodeXplus',
      tagline: 'Elite Web Systems & Full-Stack Digital Engineering Studio',
      seo: {
        metaTitle: 'CodeXplus — Elite Web Systems & Full-Stack Digital Engineering Studio',
        metaDescription: 'CodeXplus builds high-performance web applications, custom digital architectures, and headless CMS platforms for ambitious businesses.',
        ogImage: '/logo.jpg',
      },
      contact: {
        email: 'contact@codexplus.site',
        phone: '+92 300 0000000',
        address: 'Karachi, Pakistan',
        turnaround: 'Within 24 Hours',
      },
      socials: {
        github: 'https://github.com/codexplus',
        linkedin: 'https://linkedin.com/company/codexplus',
        twitter: 'https://twitter.com/codexplus',
      },
      footer: {
        copyright: '© 2026 CodeXplus Studio. All rights reserved.',
        columns: [
          {
            title: 'Disciplines',
            links: [
              { label: 'Next.js Platforms', href: '/services' },
              { label: 'Fastify APIs', href: '/services' },
              { label: 'Design Systems', href: '/services' },
            ],
          },
        ],
      },
    });
    console.log('Site settings seeded.');
  }

  // 2. Navigation
  const [existingNav] = await db.select().from(navigation).limit(1);
  if (!existingNav) {
    await db.insert(navigation).values({
      items: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Work', href: '/portfolio' },
        { label: 'About', href: '/about' },
        { label: 'Journal', href: '/articles' },
        { label: 'Contact', href: '/contact' },
      ],
      cta: {
        label: 'Start a Project',
        href: '/contact',
      },
    });
    console.log('Navigation seeded.');
  }

  // 3. Services
  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        number: '01',
        title: 'Next.js 15 Platform Engineering',
        slug: 'nextjs-architecture',
        description: 'High-throughput web applications with sub-second page loads, RSC streaming, and modern edge deployment.',
        bullets: ['App Router Architecture', 'Server Actions & Streaming', 'Core Web Vitals Optimization', 'Design Token Integration'],
        position: 0,
        status: 'published',
      },
      {
        number: '02',
        title: 'Custom Fastify 5 Backend & APIs',
        slug: 'fastify-api-systems',
        description: 'Bespoke microservices, strict Zod validation, and high-concurrency Node.js endpoints with low latency.',
        bullets: ['Drizzle & PostgreSQL ORM', 'Session & Role Auth', 'Zero-Downtime CI/CD', 'OpenAPI Documentation'],
        position: 1,
        status: 'published',
      },
      {
        number: '03',
        title: 'Design Systems & 120fps Interaction',
        slug: 'design-systems-motion',
        description: 'Living component libraries, accessible Tailwind tokens, and buttery GSAP & WebGL interactions.',
        bullets: ['Tailwind Design Tokens', 'GSAP & WebGL Shaders', 'WCAG AA Accessibility', 'Figma to Code Pipeline'],
        position: 2,
        status: 'published',
      },
    ]);
    console.log('Services seeded.');
  }

  // 4. Projects
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: 'Lemonide Tech Enterprise Portal',
        slug: 'lemonide-enterprise-portal',
        category: 'Enterprise Portal',
        summary: 'A high-throughput enterprise portal engineered for zero downtime and ultra-responsive real-time data sync.',
        year: '2026',
        client: 'Lemonide Enterprise',
        tags: ['Next.js 15', 'Fastify 5', 'PostgreSQL', 'Tailwind CSS'],
        featured: true,
        position: 0,
        status: 'published',
      },
      {
        title: 'Viper Creative Experience Studio',
        slug: 'viper-creative-experience',
        category: 'Creative Studio',
        summary: 'Award-winning interactive brand presence with GPU-accelerated living background shaders and buttery micro-interactions.',
        year: '2026',
        client: 'Viper Studio',
        tags: ['Next.js 15', 'GSAP', 'WebGL / OGL', 'Framer Motion'],
        featured: true,
        position: 1,
        status: 'published',
      },
    ]);
    console.log('Projects seeded.');
  }

  // 5. Team Members
  const existingTeam = await db.select().from(teamMembers);
  if (existingTeam.length === 0) {
    await db.insert(teamMembers).values([
      {
        name: 'Arman Naqvi',
        role: 'Lead Architect & Founder',
        bio: 'Senior full-stack engineer and digital systems architect specializing in high-throughput Node.js APIs and Next.js platforms.',
        position: 0,
      },
    ]);
    console.log('Team members seeded.');
  }

  // 6. Home Page
  const [homePage] = await db.select().from(pages).where(eq(pages.slug, 'home')).limit(1);
  if (!homePage) {
    const [newPage] = await db.insert(pages).values({
      slug: 'home',
      title: 'CodeXplus — Elite Web Systems & Full-Stack Digital Engineering',
      status: 'published',
      publishedAt: new Date(),
    }).returning();

    await db.insert(pageSections).values([
      {
        pageId: newPage.id,
        type: 'hero',
        position: 0,
        enabled: true,
        data: {
          badge: 'Studio',
          badgeText: 'Bespoke Web Systems & Architecture',
          titlePrimary: 'Smart Web Experiences,',
          titleGradient: 'Built From Every Angle',
          description: 'CodeXplus builds modern digital architectures, headless CMS portals, and high-performance web applications using Next.js and Fastify — engineered for businesses that demand high conversion and zero downtime.',
          primaryCtaText: 'Start a Project',
          primaryCtaHref: '/contact',
          secondaryCtaText: 'Explore Case Studies',
          secondaryCtaHref: '/portfolio',
        },
      },
    ]);
    console.log('Home page and hero section seeded.');
  }
}
