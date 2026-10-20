import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export interface AppErrorOptions {
  code: string;
  message: string;
  statusCode?: number;
  details?: unknown;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(opts: AppErrorOptions) {
    super(opts.message);
    this.name = 'AppError';
    this.code = opts.code;
    this.statusCode = opts.statusCode || 400;
    this.details = opts.details;
  }
}

const errorHandlerPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error: any, request, reply) => {
    request.log.error(error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      });
    }

    if (error && typeof error === 'object' && 'validation' in error && Array.isArray(error.validation)) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.validation,
        },
      });
    }

    const statusCode = error && typeof error === 'object' && typeof error.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500;
    return reply.status(statusCode).send({
      error: {
        code: (error && error.code) || 'INTERNAL_SERVER_ERROR',
        message: statusCode === 500 ? 'An unexpected error occurred' : (error && error.message) || 'Error',
        details: process.env.NODE_ENV === 'development' && error ? error.stack : undefined,
      },
    });
  });
};

export const errorHandler = fp(errorHandlerPlugin);
