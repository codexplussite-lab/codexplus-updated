import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../plugins/error-handler.js';
import { db } from '../db/index.js';
import { sessions, users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const refreshToken = request.cookies['refresh_token'];
  if (!refreshToken) {
    throw new AppError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      statusCode: 401,
    });
  }

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  const [session] = await db
    .select({
      sessionId: sessions.id,
      userId: sessions.userId,
      expiresAt: sessions.expiresAt,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.refreshHash, tokenHash))
    .limit(1);

  if (!session || !session.isActive || new Date() > session.expiresAt) {
    reply.clearCookie('refresh_token');
    throw new AppError({
      code: 'UNAUTHORIZED',
      message: 'Session invalid or expired',
      statusCode: 401,
    });
  }

  request.user = {
    id: session.userId,
    email: session.email,
    role: session.role,
  };
}

export function requireRole(allowedRoles: ('admin' | 'editor')[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await requireAuth(request, reply);
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      throw new AppError({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions',
        statusCode: 403,
      });
    }
  };
}

export async function requireCsrf(request: FastifyRequest, reply: FastifyReply) {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const csrfHeader = request.headers['x-csrf-token'];
    if (!csrfHeader) {
      throw new AppError({
        code: 'CSRF_MISSING',
        message: 'CSRF token header is required for state-changing operations',
        statusCode: 403,
      });
    }
  }
}
