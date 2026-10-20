import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { env } from '../config/env.js';

const pluginsConfig: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // 1. Helmet
  await fastify.register(helmet, {
    contentSecurityPolicy: env.NODE_ENV === 'production',
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  });

  // 2. CORS
  const origins = env.CORS_ORIGINS.split(',').map((o) => o.trim());
  await fastify.register(cors, {
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'x-csrf-token'],
  });

  // 3. Cookie
  await fastify.register(cookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {},
  });

  // 4. Global Rate Limit
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
};

export const corePlugins = fp(pluginsConfig);
