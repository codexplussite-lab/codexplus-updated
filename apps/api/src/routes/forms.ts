import { FastifyInstance } from 'fastify';
import { ContactFormSubmissionSchema, NewsletterSubscriptionSchema } from '@codexplus/shared';
import { db } from '../db/index.js';
import { formSubmissions, subscribers } from '../db/schema.js';
import { AppError } from '../plugins/error-handler.js';
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

export async function formRoutes(fastify: FastifyInstance) {
  // Transporter
  const transporter = env.SMTP_HOST
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT || 587,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      })
    : null;

  // 1. Contact Form
  fastify.post(
    '/contact',
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 hour',
        },
      },
      schema: {
        body: ContactFormSubmissionSchema,
      },
    },
    async (request, reply) => {
      const data = request.body as any;

      // Honeypot check
      if (data.honeypot && data.honeypot.length > 0) {
        // Return 200 silently to fool spam bots
        return reply.send({ success: true, message: 'Message submitted successfully' });
      }

      await db.insert(formSubmissions).values({
        type: 'contact',
        payload: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        status: 'new',
        ip: request.ip,
      });

      // Send email notification
      if (transporter && env.MAIL_TO) {
        transporter
          .sendMail({
            from: `"CodeXplus Leads" <${env.SMTP_USER || 'no-reply@codexplus.site'}>`,
            to: env.MAIL_TO,
            subject: `New Lead from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nMessage:\n${data.message}`,
          })
          .catch((err) => request.log.error('Failed to send lead email:', err));
      }

      return reply.send({ success: true, message: 'Thank you! Your message has been sent.' });
    }
  );

  // 2. Newsletter Subscription
  fastify.post(
    '/subscribe',
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 hour',
        },
      },
      schema: {
        body: NewsletterSubscriptionSchema,
      },
    },
    async (request, reply) => {
      const data = request.body as any;

      if (data.honeypot && data.honeypot.length > 0) {
        return reply.send({ success: true, message: 'Subscribed successfully' });
      }

      try {
        await db.insert(subscribers).values({
          email: data.email,
          confirmed: true,
        });
      } catch (err: any) {
        // Ignore duplicate email errors gracefully
        if (!err.message?.includes('duplicate key')) {
          throw err;
        }
      }

      return reply.send({ success: true, message: 'Thank you for subscribing!' });
    }
  );
}
