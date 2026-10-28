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
import { requireAuth } from '../middleware/auth.js';

export async function adminRoutes(fastify: FastifyInstance) {
  // Saare admin routes ke liye login zaroori
  fastify.addHook('preHandler', requireAuth);

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
    const [last] = await db.select({ position: teamMembers.position }).from(teamMembers).orderBy(desc(teamMembers.position)).limit(1);
    const nextPos = (last?.position ?? -1) + 1;

    const socials = {
      photoUrl: body.photoUrl || body.socials?.photoUrl || '',
      github: body.github || body.socials?.github || '',
      linkedin: body.linkedin || body.socials?.linkedin || '',
      twitter: body.twitter || body.socials?.twitter || '',
    };

    const [created] = await db.insert(teamMembers).values({
      name: body.name || 'Team Member',
      role: body.role || 'Specialist',
      bio: body.bio || body.description || '',
      position: body.position !== undefined ? body.position : nextPos,
      status: body.status || 'published',
      socials,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/team/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (body.name !== undefined) updateData.name = body.name;
    if (body.role !== undefined) updateData.role = body.role;
    if (body.bio !== undefined) updateData.bio = body.bio;
    else if (body.description !== undefined) updateData.bio = body.description;
    if (body.position !== undefined) updateData.position = body.position;
    if (body.status !== undefined) updateData.status = body.status;

    if (body.photoUrl !== undefined || body.github !== undefined || body.linkedin !== undefined || body.twitter !== undefined || body.socials !== undefined) {
      const [existing] = await db.select({ socials: teamMembers.socials }).from(teamMembers).where(eq(teamMembers.id, id)).limit(1);
      const existingSocials = (existing?.socials as Record<string, any>) || {};
      updateData.socials = {
        photoUrl: body.photoUrl ?? body.socials?.photoUrl ?? existingSocials.photoUrl ?? '',
        github: body.github ?? body.socials?.github ?? existingSocials.github ?? '',
        linkedin: body.linkedin ?? body.socials?.linkedin ?? existingSocials.linkedin ?? '',
        twitter: body.twitter ?? body.socials?.twitter ?? existingSocials.twitter ?? '',
      };
    }

    await db.update(teamMembers).set(updateData).where(eq(teamMembers.id, id));
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
    const [last] = await db.select({ position: services.position }).from(services).orderBy(desc(services.position)).limit(1);
    const nextPos = (last?.position ?? -1) + 1;
    const number = body.number?.trim() || String(nextPos + 1).padStart(2, '0');
    const slug = body.slug?.trim() || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `service-${Date.now()}`;

    const [created] = await db.insert(services).values({
      number,
      title: body.title || 'New Service',
      slug,
      description: body.description || '',
      bullets: Array.isArray(body.bullets) ? body.bullets : (body.bullets ? [body.bullets] : ['High Performance Architecture']),
      cta: body.cta || null,
      status: body.status || 'published',
      position: body.position !== undefined ? body.position : nextPos,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/services/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (body.number !== undefined) updateData.number = body.number;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.bullets !== undefined) updateData.bullets = Array.isArray(body.bullets) ? body.bullets : [body.bullets];
    if (body.cta !== undefined) updateData.cta = body.cta;
    if (body.position !== undefined) updateData.position = body.position;
    if (body.status !== undefined) updateData.status = body.status;

    await db.update(services).set(updateData).where(eq(services.id, id));
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
    const [last] = await db.select({ position: projects.position }).from(projects).orderBy(desc(projects.position)).limit(1);
    const nextPos = (last?.position ?? -1) + 1;
    const slug = body.slug?.trim() || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`;

    const [created] = await db.insert(projects).values({
      title: body.title || 'New Project',
      slug,
      category: body.category || 'Platform',
      summary: body.summary || body.description || '',
      year: body.year || '2026',
      client: body.client || 'Client',
      tags: Array.isArray(body.tags) ? body.tags : ['Next.js 15', 'Fastify 5'],
      url: body.imageUrl || body.url || null,
      body: body.body || null,
      featured: body.featured !== undefined ? body.featured : true,
      status: body.status || 'published',
      position: body.position !== undefined ? body.position : nextPos,
    }).returning();
    return reply.send(created);
  });

  fastify.put('/projects/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.summary !== undefined) updateData.summary = body.summary;
    else if (body.description !== undefined) updateData.summary = body.description;
    if (body.year !== undefined) updateData.year = body.year;
    if (body.client !== undefined) updateData.client = body.client;
    if (body.tags !== undefined) updateData.tags = Array.isArray(body.tags) ? body.tags : [body.tags];
    if (body.imageUrl !== undefined || body.url !== undefined) updateData.url = body.imageUrl || body.url;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.position !== undefined) updateData.position = body.position;
    if (body.status !== undefined) updateData.status = body.status;

    await db.update(projects).set(updateData).where(eq(projects.id, id));
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
    const slug = body.slug?.trim() || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;
    const [created] = await db.insert(posts).values({
      title: body.title || 'New Article',
      slug,
      category: body.category || 'Architecture',
      excerpt: body.excerpt || body.summary || body.description || '',
      body: body.body || { text: '' },
      author: body.author || 'CodeXplus Team',
      readMinutes: body.readMinutes || 5,
      status: body.status || 'published',
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    }).returning();
    return reply.send(created);
  });

  fastify.put('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    else if (body.summary !== undefined) updateData.excerpt = body.summary;
    else if (body.description !== undefined) updateData.excerpt = body.description;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.readMinutes !== undefined) updateData.readMinutes = body.readMinutes;
    if (body.status !== undefined) updateData.status = body.status;

    await db.update(posts).set(updateData).where(eq(posts.id, id));
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
    const [last] = await db.select({ position: faqs.position }).from(faqs).orderBy(desc(faqs.position)).limit(1);
    const nextPos = (last?.position ?? -1) + 1;

    const [created] = await db.insert(faqs).values({
      question: body.question || '',
      answer: body.answer || '',
      position: body.position !== undefined ? body.position : nextPos,
      status: body.status || 'published',
    }).returning();
    return reply.send(created);
  });

  fastify.put('/faqs/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const updateData: Record<string, any> = { updatedAt: new Date() };

    if (body.question !== undefined) updateData.question = body.question;
    if (body.answer !== undefined) updateData.answer = body.answer;
    if (body.position !== undefined) updateData.position = body.position;
    if (body.status !== undefined) updateData.status = body.status;

    await db.update(faqs).set(updateData).where(eq(faqs.id, id));
    return reply.send({ success: true });
  });

  fastify.delete('/faqs/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(faqs).where(eq(faqs.id, id));
    return reply.send({ success: true });
  });

  // 8. Pages & Sections (Upsert Supported)
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

    let [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
    if (!page) {
      // Upsert: Create page row automatically so saving sections never 404s
      const [createdPage] = await db.insert(pages).values({
        slug,
        title: slug === 'home' ? 'Home' : slug.charAt(0).toUpperCase() + slug.slice(1),
        status: 'published',
        publishedAt: new Date(),
      }).returning();
      page = createdPage;
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
