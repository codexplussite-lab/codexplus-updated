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
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(publicRoutes, { prefix: '/api/public' });
  await fastify.register(formRoutes, { prefix: '/api/forms' });
  await fastify.register(adminRoutes, { prefix: '/api/admin' });
  await fastify.register(mediaRoutes, { prefix: '/api/admin/media' });

  return fastify;
}

if (process.env.NODE_ENV !== 'test') {
  buildApp()
    .then(async (app) => {
      await app.listen({ port: env.PORT, host: env.HOST });
      console.log(`🚀 CodeXplus API Server listening on http://${env.HOST}:${env.PORT}`);
    })
    .catch((err) => {
      console.error('Error starting server:', err);
      process.exit(1);
    });
}
