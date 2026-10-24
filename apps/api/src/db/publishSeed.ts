import { db } from './index.js';
import { teamMembers, posts, faqs } from './schema.js';

async function updatePublishStatus() {
  await db.update(teamMembers).set({ status: 'published' });

  const existingPosts = await db.select().from(posts);
  if (existingPosts.length === 0) {
    await db.insert(posts).values([
      {
        title: 'Replacing Headless Sanity with an In-House Fastify 5 & PostgreSQL Engine',
        slug: 'replacing-sanity-with-fastify',
        category: 'Architecture',
        excerpt: 'A comprehensive architectural post-mortem explaining why we migrated from off-the-shelf third party SaaS CMS solutions to an owned, type-safe Fastify and PostgreSQL infrastructure.',
        body: { text: 'Detailed post architecture...' },
        status: 'published',
        readMinutes: 12,
        publishedAt: new Date(),
      },
    ]);
  }

  const existingFaqs = await db.select().from(faqs);
  if (existingFaqs.length === 0) {
    await db.insert(faqs).values([
      {
        question: 'What is your typical project timeline?',
        answer: 'Most standard web platform and MVP builds are completed within 4 to 8 weeks depending on scope.',
        position: 0,
        status: 'published',
      },
      {
        question: 'Do you offer ongoing retainer & architecture support?',
        answer: 'Yes, we provide senior engineering retainers for performance maintenance, updates, and scaling.',
        position: 1,
        status: 'published',
      },
    ]);
  }

  console.log('Collections published & seeded!');
  process.exit(0);
}

updatePublishStatus().catch((err) => {
  console.error(err);
  process.exit(1);
});
