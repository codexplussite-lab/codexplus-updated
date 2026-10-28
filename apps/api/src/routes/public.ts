import { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { siteSettings, navigation, pages, pageSections, services, projects, testimonials, posts, teamMembers, clients, techStackGroups, faqs } from '../db/schema.js';
import { eq, and, desc, asc } from 'drizzle-orm';
import { AppError } from '../plugins/error-handler.js';

export async function publicRoutes(fastify: FastifyInstance) {
  // 1. Site Metadata & Navigation & Footer
  fastify.get('/site', async (request, reply) => {
    const [settings] = await db.select().from(siteSettings).limit(1);
    const [nav] = await db.select().from(navigation).limit(1);

    const mergedSettings = settings
      ? {
          ...settings,
          logoUrl: (settings.seo as any)?.logoUrl || (settings as any).logoUrl || '/logo.png',
          faviconUrl: (settings.seo as any)?.faviconUrl || (settings as any).faviconUrl || '/favicon.jpeg',
        }
      : null;

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send({
      settings: mergedSettings,
      navigation: nav || null,
    });
  });

  // 2. Dynamic Page by Slug with resolved sections
  fastify.get('/pages/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const [page] = await db
      .select()
      .from(pages)
      .where(and(eq(pages.slug, slug), eq(pages.status, 'published')))
      .limit(1);

    if (!page) {
      throw new AppError({
        code: 'NOT_FOUND',
        message: 'Page not found',
        statusCode: 404,
      });
    }

    const sections = await db
      .select()
      .from(pageSections)
      .where(and(eq(pageSections.pageId, page.id), eq(pageSections.enabled, true)))
      .orderBy(asc(pageSections.position));

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send({
      page,
      sections,
    });
  });

  // 3. Projects
  fastify.get('/projects', async (request, reply) => {
    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.status, 'published'))
      .orderBy(asc(projects.position));

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send({ items: allProjects });
  });

  fastify.get('/projects/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.status, 'published')))
      .limit(1);

    if (!project) {
      throw new AppError({
        code: 'NOT_FOUND',
        message: 'Project not found',
        statusCode: 404,
      });
    }

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send(project);
  });

  // 4. Posts / Journal
  fastify.get('/posts', async (request, reply) => {
    const allPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.status, 'published'))
      .orderBy(desc(posts.publishedAt));

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send({ items: allPosts });
  });

  fastify.get('/posts/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, 'published')))
      .limit(1);

    if (!post) {
      throw new AppError({
        code: 'NOT_FOUND',
        message: 'Post not found',
        statusCode: 404,
      });
    }

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return reply.send(post);
  });

  // 5. Collections
  fastify.get('/services', async (request, reply) => {
    const items = await db.select().from(services).where(eq(services.status, 'published')).orderBy(asc(services.position));
    return reply.send({ items });
  });

  fastify.get('/testimonials', async (request, reply) => {
    const items = await db.select().from(testimonials).where(eq(testimonials.status, 'published')).orderBy(asc(testimonials.position));
    return reply.send({ items });
  });

  fastify.get('/team', async (request, reply) => {
    const items = await db.select().from(teamMembers).where(eq(teamMembers.status, 'published')).orderBy(asc(teamMembers.position));
    return reply.send({ items });
  });

  fastify.get('/faqs', async (request, reply) => {
    const items = await db.select().from(faqs).where(eq(faqs.status, 'published')).orderBy(asc(faqs.position));
    return reply.send({ items });
  });

  fastify.get('/clients', async (request, reply) => {
    const items = await db.select().from(clients).orderBy(asc(clients.position));
    return reply.send({ items });
  });

  fastify.get('/tech-stack', async (request, reply) => {
    const items = await db.select().from(techStackGroups).orderBy(asc(techStackGroups.position));
    return reply.send({ items });
  });
}
