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
  formSubmissions,
  auditLog,
} from '../db/schema.js';
import { requireAuth, requireRole, requireCsrf } from '../middleware/auth.js';
import { eq, desc, asc } from 'drizzle-orm';
import { AppError } from '../plugins/error-handler.js';

export async function adminRoutes(fastify: FastifyInstance) {
  // All admin routes require Auth & CSRF verification
  fastify.addHook('preHandler', requireAuth);
  fastify.addHook('preHandler', requireCsrf);

  // Singletons: Site Settings
  fastify.get('/singletons/site-settings', async (request, reply) => {
    const [settings] = await db.select().from(siteSettings).limit(1);
    return reply.send(settings || {});
  });

  fastify.put('/singletons/site-settings', { preHandler: [requireRole(['admin'])] }, async (request, reply) => {
    const body = request.body as any;
    const [existing] = await db.select().from(siteSettings).limit(1);

    if (existing) {
      await db.update(siteSettings).set({ ...body, updatedAt: new Date() }).where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values(body);
    }
    return reply.send({ success: true });
  });

  // Singletons: Navigation
  fastify.get('/singletons/navigation', async (request, reply) => {
    const [nav] = await db.select().from(navigation).limit(1);
    return reply.send(nav || { items: [] });
  });

  fastify.put('/singletons/navigation', { preHandler: [requireRole(['admin'])] }, async (request, reply) => {
    const body = request.body as any;
    const [existing] = await db.select().from(navigation).limit(1);

    if (existing) {
      await db.update(navigation).set({ ...body, updatedAt: new Date() }).where(eq(navigation.id, existing.id));
    } else {
      await db.insert(navigation).values(body);
    }
    return reply.send({ success: true });
  });

  // Pages & Section Builder
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

    // Sync sections in transaction
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

  // Form Submissions Inbox
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

  // Audit Log
  fastify.get('/audit', { preHandler: [requireRole(['admin'])] }, async (request, reply) => {
    const logs = await db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(100);
    return reply.send({ items: logs });
  });
}
