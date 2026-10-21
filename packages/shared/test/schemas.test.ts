import { describe, it, expect } from 'vitest';
import {
  SectionBlockSchema,
  HeroBlockSchema,
  ContactFormSubmissionSchema,
  SiteSettingsSchema,
  parseMeta,
} from '../src/index.js';

describe('Shared Schemas & Contracts', () => {
  it('should validate hero section block successfully', () => {
    const rawHero = {
      type: 'hero',
      eyebrow: 'Digital Creative & Engineering Powerhouse',
      headline: 'Transforming Bold Ideas Into Powerful Digital Products.',
      description: 'CodeXPlus is an independent creative studio.',
      primaryCta: { label: 'View Selected Work', href: '#portfolio' },
      secondaryCta: { label: 'Get In Touch', href: '#contact' },
      scrollLabel: 'Scroll Down',
      enabled: true,
    };

    const parsed = SectionBlockSchema.parse(rawHero);
    expect(parsed.type).toBe('hero');
    expect(parsed.enabled).toBe(true);
  });

  it('should reject invalid discriminated section union', () => {
    const invalidBlock = {
      type: 'unknownBlock',
      headline: 'test',
    };
    expect(() => SectionBlockSchema.parse(invalidBlock)).toThrow();
  });

  it('should catch spam in honeypot field of contact form', () => {
    const spamSubmission = {
      name: 'Bot User',
      email: 'bot@example.com',
      message: 'Hello buy my product and click here',
      honeypot: 'bot-filled-this',
    };
    expect(() => ContactFormSubmissionSchema.parse(spamSubmission)).toThrow();
  });

  it('should accept valid contact form submission with optional phone and trimmed fields', () => {
    const valid = {
      name: '  Hassan Abbas  ',
      email: '  test@codexplus.site  ',
      phone: '+92 300 1234567',
      message: 'This is a genuine inquiry for full-stack engineering services.',
      consent: true,
    };
    const parsed = ContactFormSubmissionSchema.parse(valid);
    expect(parsed.name).toBe('Hassan Abbas');
    expect(parsed.email).toBe('test@codexplus.site');
    expect(parsed.phone).toBe('+92 300 1234567');
  });

  it('should reject invalid email and too short message', () => {
    expect(() =>
      ContactFormSubmissionSchema.parse({
        name: 'Ha',
        email: 'invalid-email',
        message: 'short',
      })
    ).toThrow();
  });

  it('should correctly parse field metadata', () => {
    const meta = parseMeta(ContactFormSubmissionSchema.shape.name);
    expect(meta).toBeDefined();
    expect(meta?.widget).toBe('text');
    expect(meta?.label).toBe('Your Name');
  });
});
