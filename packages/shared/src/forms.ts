import { z } from 'zod';
import { withMeta } from './meta.js';

export const ContactFormSubmissionSchema = z.object({
  name: withMeta(
    z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    { label: 'Your Name', widget: 'text' }
  ),
  email: withMeta(
    z
      .string({ required_error: 'Email address is required' })
      .trim()
      .email('Please provide a valid email address')
      .max(255, 'Email must not exceed 255 characters'),
    { label: 'Your Email', widget: 'text' }
  ),
  phone: withMeta(
    z
      .string()
      .trim()
      .max(30, 'Phone number must not exceed 30 characters')
      .refine(
        (val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val),
        'Please provide a valid phone or WhatsApp number'
      )
      .optional()
      .or(z.literal('')),
    { label: 'Phone Number', widget: 'text' }
  ),
  message: withMeta(
    z
      .string({ required_error: 'Project brief is required' })
      .trim()
      .min(10, 'Project brief must be at least 10 characters')
      .max(3000, 'Project brief must not exceed 3000 characters'),
    { label: 'Project Message', widget: 'textarea' }
  ),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy to submit')
    .optional(),
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
