import { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import {
  siteSettings,
  navigation,
  pages,
  pageSections,
  services,
  projects,
  testimonials,
  posts,
  teamMembers,
  clients,
  techStackGroups,
  faqs,
  media,
  formSubmissions,
  auditLog,
} from '../db/schema.js';
import { eq, desc, asc } from 'drizzle-orm';
import { AppError } from '../plugins/error-handler.js';

export async function adminRoutes(fastify: FastifyInstance) {
  // 1. Singletons: Site Settings
  fastify.get('/singletons/site-settings', async (request, reply) => {
    const [settings] = await db.select().from(siteSettings).limit(1);
    if (!settings) return reply.send({});
    return reply.send({
      ...settings,
      logoUrl: (settings.seo as any)?.logoUrl || (settings as any).logoUrl || '/logo.png',
      faviconUrl: (settings.seo as any)?.faviconUrl || (settings as any).faviconUrl || '/favicon.jpeg',
    });
  });

  fastify.put('/singletons/site-settings', async (request, reply) => {
    const body = request.body as any;
    const [existing] = await db.select().from(siteSettings).limit(1);

    const seoData = {
      ...(existing?.seo as Record<string, any> || {}),
      ...(body.seo || {}),
      logoUrl: body.logoUrl || (body.seo as any)?.logoUrl || (existing?.seo as any)?.logoUrl || '/logo.png',
      faviconUrl: body.faviconUrl || (body.seo as any)?.faviconUrl || (existing?.seo as any)?.faviconUrl || '/favicon.jpeg',
    };

    const updatePayload: Record<string, any> = {
      siteName: body.siteName || existing?.siteName || 'CodeXplus',
      tagline: body.tagline ?? existing?.tagline,
      contact: body.contact || existing?.contact,
      socials: body.socials || existing?.socials,
      footer: body.footer || existing?.footer,
      seo: seoData,
      updatedAt: new Date(),
    };

    if (existing) {
      await db.update(siteSettings).set(updatePayload).where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values(updatePayload as any);
    }
    return reply.send({ success: true });
  });

  // 2. Singletons: Navigation
  fastify.get('/singletons/navigation', async (request, reply) => {
    const [nav] = await db.select().from(navigation).limit(1);
    return reply.send(nav || { items: [] });
  });

  fastify.put('/singletons/navigation', async (request, reply) => {
    const body = request.body as any;
    const [existing] = await db.select().from(navigation).limit(1);

    if (existing) {
      await db.update(navigation).set({ ...body, updatedAt: new Date() }).where(eq(navigation.id, existing.id));
    } else {
      await db.insert(navigation).values(body);
    }
    return reply.send({ success: true });
  });

  // 3. Team Members CRUD (Supports Full Social Links: Github, Linkedin, Twitter & Photo)
  fastify.get('/team', async (request, reply) => {
    const items = await db.select().from(teamMembers).orderBy(asc(teamMembers.position));
    return reply.send({ items });
  });

  fastify.post('/team', async (request, reply) => {
    const body = request.body as any;
    const socials = {
      photoUrl: body.photoUrl || '',
      github: body.github || '',
      linkedin: body.linkedin || '',
      twitter: body.twitter || '',
    };

    const [created] = await db.insert(teamMembers).values({
      name: body.name || 'Team Member',
      role: body.role || 'Specialist',
      bio: body.bio || '',
      position: body.position || 0,
      status: body.status || 'published',
      socials,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/team/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;

    const socials = {
      photoUrl: body.photoUrl || '',
      github: body.github || '',
      linkedin: body.linkedin || '',
      twitter: body.twitter || '',
    };

    await db.update(teamMembers).set({
      name: body.name,
      role: body.role,
      bio: body.bio,
      status: body.status || 'published',
      socials,
      updatedAt: new Date(),
    }).where(eq(teamMembers.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/team/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return reply.send({ success: true });
  });

  // 4. Services CRUD
  fastify.get('/services', async (request, reply) => {
    const items = await db.select().from(services).orderBy(asc(services.position));
    return reply.send({ items });
  });

  fastify.post('/services', async (request, reply) => {
    const body = request.body as any;
    const [created] = await db.insert(services).values({
      number: body.number || '01',
      title: body.title || 'New Service',
      slug: body.slug || `service-${Date.now()}`,
      description: body.description || '',
      bullets: body.bullets || ['High Performance Architecture'],
      status: body.status || 'published',
      position: body.position || 0,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/services/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    await db.update(services).set({
      number: body.number,
      title: body.title,
      description: body.description,
      status: body.status || 'published',
      updatedAt: new Date(),
    }).where(eq(services.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/services/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(services).where(eq(services.id, id));
    return reply.send({ success: true });
  });

  // 5. Projects CRUD
  fastify.get('/projects', async (request, reply) => {
    const items = await db.select().from(projects).orderBy(asc(projects.position));
    return reply.send({ items });
  });

  fastify.post('/projects', async (request, reply) => {
    const body = request.body as any;
    const [created] = await db.insert(projects).values({
      title: body.title || 'New Project',
      slug: body.slug || `project-${Date.now()}`,
      category: body.category || 'Platform',
      summary: body.summary || '',
      year: body.year || '2026',
      client: body.client || 'Client',
      tags: body.tags || ['Next.js 15', 'Fastify 5'],
      url: body.imageUrl || null,
      status: body.status || 'published',
      position: body.position || 0,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/projects/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    await db.update(projects).set({
      title: body.title,
      category: body.category,
      summary: body.summary,
      year: body.year,
      client: body.client,
      url: body.imageUrl || undefined,
      status: body.status || 'published',
      updatedAt: new Date(),
    }).where(eq(projects.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/projects/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(projects).where(eq(projects.id, id));
    return reply.send({ success: true });
  });

  // 6. Posts (Articles) CRUD
  fastify.get('/posts', async (request, reply) => {
    const items = await db.select().from(posts).orderBy(desc(posts.publishedAt));
    return reply.send({ items });
  });

  fastify.post('/posts', async (request, reply) => {
    const body = request.body as any;
    const [created] = await db.insert(posts).values({
      title: body.title || 'New Article',
      slug: body.slug || `article-${Date.now()}`,
      category: body.category || 'Architecture',
      excerpt: body.excerpt || '',
      body: body.body || { text: '' },
      status: body.status || 'published',
      publishedAt: new Date(),
    }).returning();
    return reply.send(created);
  });

  fastify.put('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    await db.update(posts).set({
      title: body.title,
      category: body.category,
      excerpt: body.excerpt,
      status: body.status || 'published',
      updatedAt: new Date(),
    }).where(eq(posts.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(posts).where(eq(posts.id, id));
    return reply.send({ success: true });
  });

  // 7. FAQs CRUD
  fastify.get('/faqs', async (request, reply) => {
    const items = await db.select().from(faqs).orderBy(asc(faqs.position));
    return reply.send({ items });
  });

  fastify.post('/faqs', async (request, reply) => {
    const body = request.body as any;
    const [created] = await db.insert(faqs).values({
      question: body.question || '',
      answer: body.answer || '',
      position: body.position || 0,
      status: body.status || 'published',
    }).returning();
    return reply.send(created);
  });

  fastify.put('/faqs/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    await db.update(faqs).set({
      question: body.question,
      answer: body.answer,
      status: body.status || 'published',
      updatedAt: new Date(),
    }).where(eq(faqs.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/faqs/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(faqs).where(eq(faqs.id, id));
    return reply.send({ success: true });
  });

  // 8. Pages & Sections
  fastify.get('/pages/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);

    if (!page) {
      throw new AppError({ code: 'NOT_FOUND', message: 'Page not found', statusCode: 404 });
    }

    const sections = await db.select().from(pageSections).where(eq(pageSections.pageId, page.id)).orderBy(asc(pageSections.position));
    return reply.send({ page, sections });
  });

  fastify.put('/pages/:slug/sections', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { sections } = request.body as { sections: Array<{ id?: string; type: string; position: number; enabled: boolean; data: any }> };

    const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
    if (!page) {
      throw new AppError({ code: 'NOT_FOUND', message: 'Page not found', statusCode: 404 });
    }

    await db.transaction(async (tx) => {
      await tx.delete(pageSections).where(eq(pageSections.pageId, page.id));
      if (sections && sections.length > 0) {
        await tx.insert(pageSections).values(
          sections.map((sec, idx) => ({
            pageId: page.id,
            type: sec.type,
            position: idx,
            enabled: sec.enabled !== false,
            data: sec.data,
          }))
        );
      }
    });

    return reply.send({ success: true, count: sections?.length || 0 });
  });

  // 9. Form Submissions Inbox
  fastify.get('/submissions', async (request, reply) => {
    const items = await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
    return reply.send({ items });
  });

  fastify.patch('/submissions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: 'new' | 'read' | 'archived' };

    await db.update(formSubmissions).set({ status }).where(eq(formSubmissions.id, id));
    return reply.send({ success: true });
  });
}
