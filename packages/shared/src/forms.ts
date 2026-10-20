import { z } from 'zod';
import { withMeta } from './meta.js';

export const ContactFormSubmissionSchema = z.object({
  name: withMeta(z.string().min(2, 'Name is required').max(100), { label: 'Your Name', widget: 'text' }),
  email: withMeta(z.string().email('Invalid email address'), { label: 'Your Email', widget: 'text' }),
  phone: withMeta(z.string().optional(), { label: 'Phone Number', widget: 'text' }),
  message: withMeta(z.string().min(5, 'Message must be at least 5 characters').max(3000), { label: 'Project Message', widget: 'textarea' }),
  honeypot: z.string().max(0, 'Spam detected').optional(),
  turnstileToken: z.string().optional(),
});
export type ContactFormSubmission = z.infer<typeof ContactFormSubmissionSchema>;

export const NewsletterSubscriptionSchema = z.object({
  email: withMeta(z.string().email('Invalid email address'), { label: 'Email', widget: 'text' }),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});
export type NewsletterSubscription = z.infer<typeof NewsletterSubscriptionSchema>;

export const SubmissionStatusEnum = z.enum(['new', 'read', 'archived']);
export type SubmissionStatus = z.infer<typeof SubmissionStatusEnum>;
