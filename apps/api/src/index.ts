import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from './config/env.js';
import { errorHandler } from './plugins/error-handler.js';
import { corePlugins } from './plugins/core.js';
import { authRoutes } from './routes/auth.js';
import { publicRoutes } from './routes/public.js';
import { formRoutes } from './routes/forms.js';
import { adminRoutes } from './routes/admin.js';
import { mediaRoutes } from './routes/media.js';
import { initializeDatabase } from './db/init.js';
import fastifyStatic from '@fastify/static';
import path from 'path';

export async function buildApp() {
  const fastify = Fastify({
    logger: env.NODE_ENV === 'development' ? { transport: { target: 'pino-pretty' } } : true,
  });

  // Zod Type Provider setup
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Plugins
  await fastify.register(errorHandler);
  await fastify.register(corePlugins);

  // Static uploads serving
  await fastify.register(fastifyStatic, {
    root: path.resolve(env.UPLOADS_DIR),
    prefix: '/uploads/',
  });

  // Health check
  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // Routes
  await fastify.register(authRoutes, { prefix: '/backend/auth' });
  await fastify.register(publicRoutes, { prefix: '/backend/public' });
  await fastify.register(formRoutes, { prefix: '/backend/forms' });
  await fastify.register(adminRoutes, { prefix: '/backend/admin' });
  await fastify.register(mediaRoutes, { prefix: '/backend/admin/media' });

  return fastify;
}

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      // 1. Run migrations and idempotent seed on startup
      await initializeDatabase();

      // 2. Build Fastify app and listen
      const app = await buildApp();
      await app.listen({ port: env.PORT, host: env.HOST });
      console.log(`🚀 CodeXplus API Server listening on http://${env.HOST}:${env.PORT}`);
    } catch (err) {
      console.error('Fatal error starting server:', err);
      process.exit(1);
    }
  })();
}
