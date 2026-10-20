import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import argon2 from 'argon2';
import crypto from 'crypto';
import { db } from '../db/index.js';
import { users, sessions } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { env } from '../config/env.js';
import { AppError } from '../plugins/error-handler.js';
import { requireAuth } from '../middleware/auth.js';

export async function authRoutes(fastify: FastifyInstance) {
  // Login
  fastify.post(
    '/login',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute',
        },
      },
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body as { email: string; password: string };

      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user || !user.isActive) {
        throw new AppError({
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
          statusCode: 401,
        });
      }

      const validPassword = await argon2.verify(user.passwordHash, password);
      if (!validPassword) {
        throw new AppError({
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
          statusCode: 401,
        });
      }

      // Generate refresh token
      const rawRefreshToken = crypto.randomBytes(40).toString('hex');
      const refreshHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
      const expiresAt = new Date(Date.now() + env.REFRESH_TTL * 1000);

      await db.insert(sessions).values({
        userId: user.id,
        refreshHash,
        expiresAt,
        userAgent: request.headers['user-agent'],
        ip: request.ip,
      });

      await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

      reply.setCookie('refresh_token', rawRefreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: env.REFRESH_TTL,
      });

      return reply.send({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    }
  );

  // Refresh with rotation
  fastify.post('/refresh', async (request, reply) => {
    const rawRefreshToken = request.cookies['refresh_token'];
    if (!rawRefreshToken) {
      throw new AppError({
        code: 'UNAUTHORIZED',
        message: 'No refresh token provided',
        statusCode: 401,
      });
    }

    const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
    const [currentSession] = await db.select().from(sessions).where(eq(sessions.refreshHash, tokenHash)).limit(1);

    if (!currentSession || new Date() > currentSession.expiresAt) {
      reply.clearCookie('refresh_token');
      throw new AppError({
        code: 'UNAUTHORIZED',
        message: 'Session expired or invalidated',
        statusCode: 401,
      });
    }

    // Rotate token
    const newRawRefreshToken = crypto.randomBytes(40).toString('hex');
    const newRefreshHash = crypto.createHash('sha256').update(newRawRefreshToken).digest('hex');
    const newExpiresAt = new Date(Date.now() + env.REFRESH_TTL * 1000);

    await db
      .update(sessions)
      .set({
        refreshHash: newRefreshHash,
        expiresAt: newExpiresAt,
      })
      .where(eq(sessions.id, currentSession.id));

    reply.setCookie('refresh_token', newRawRefreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: env.REFRESH_TTL,
    });

    return reply.send({ message: 'Token rotated successfully' });
  });

  // Logout
  fastify.post('/logout', async (request, reply) => {
    const rawRefreshToken = request.cookies['refresh_token'];
    if (rawRefreshToken) {
      const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
      await db.delete(sessions).where(eq(sessions.refreshHash, tokenHash));
    }

    reply.clearCookie('refresh_token');
    return reply.send({ message: 'Logged out successfully' });
  });

  // Me
  fastify.get('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    return reply.send({ user: request.user });
  });
}
