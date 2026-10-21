'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactFormSubmissionSchema } from '@codexplus/shared';
import { FadeIn } from '@/components/motion/MotionWrapper';
import { GsapSplitText } from '@/components/motion/GsapAnimations';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: string;
  general?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [lastSubmittedTime, setLastSubmittedTime] = useState<number>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: true,
    honeypot: '',
  });

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Prevent accidental rapid double submission (5 second debounce)
    const now = Date.now();
    if (now - lastSubmittedTime < 5000) {
      return;
    }

    setFieldErrors({});
    setErrorMessage('');

    // 2. Client-side optimistic validation using the exact shared Zod schema
    const clientValidation = ContactFormSubmissionSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: FieldErrors = {};
      for (const issue of clientValidation.error.issues) {
        const fieldName = issue.path[0]?.toString() as keyof FieldErrors;
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      setStatus('error');
      setErrorMessage('Please review and correct the highlighted fields before submitting.');
      return;
    }

    setStatus('loading');
    setLastSubmittedTime(now);

    try {
      // 3. Post to our internal Next.js API route (/api/contact)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.success) {
        if (responseData.error?.details) {
          setFieldErrors(responseData.error.details);
          setErrorMessage(responseData.error.message || 'Validation error on server.');
        } else {
          setErrorMessage(
            responseData.error?.message ||
              'Unable to process your brief at this time. Please contact contact@codexplus.site directly.'
          );
        }
        setStatus('error');
        return;
      }

      // 4. Success State
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: true,
        honeypot: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error connecting to our server gateway. Please check your connection or reach us at contact@codexplus.site.'
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-28 px-6 max-w-4xl mx-auto border-t border-white/[0.06]"
    >
      <FadeIn className="text-center mb-16">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
          Inquire
        </span>
        <GsapSplitText
          tag="h2"
          text="Let's Build Together."
          className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
        />
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Tell us about your project vision, timeline, and goals. We review all technical inquiries and return preliminary architecture notes within 24 hours.
        </p>
      </FadeIn>

      <FadeIn delay={0.15} className="webangles-card p-8 md:p-12 rounded-3xl relative">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot field for anti-spam bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="form-honeypot">Leave this field blank</label>
            <input
              id="form-honeypot"
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-gray-300 mb-2">
                Your Name <span className="text-[#8059E3]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  clearFieldError('name');
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                  fieldErrors.name ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/[0.08] focus:border-[#8059E3] focus:ring-[#8059E3]/25'
                } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition`}
                placeholder="Elena Vasquez"
              />
              {fieldErrors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.name}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-gray-300 mb-2">
                Email Address <span className="text-[#8059E3]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearFieldError('email');
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                  fieldErrors.email ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/[0.08] focus:border-[#8059E3] focus:ring-[#8059E3]/25'
                } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition`}
                placeholder="elena@company.com"
              />
              {fieldErrors.email && (
                <p id="contact-email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-medium text-gray-300 mb-2">
              Phone / WhatsApp <span className="text-gray-500 text-[11px]">(Optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                clearFieldError('phone');
              }}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                fieldErrors.phone ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/[0.08] focus:border-[#8059E3] focus:ring-[#8059E3]/25'
              } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition`}
              placeholder="+1 (555) 019-2834 or +92 300 1234567"
            />
            {fieldErrors.phone && (
              <p id="contact-phone-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.phone}</span>
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-gray-300 mb-2">
              Project Brief & Objectives <span className="text-[#8059E3]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                clearFieldError('message');
              }}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                fieldErrors.message ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/[0.08] focus:border-[#8059E3] focus:ring-[#8059E3]/25'
              } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition resize-none`}
              placeholder="Tell us about your product, expected timelines, and primary goals..."
            />
            {fieldErrors.message && (
              <p id="contact-message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.message}</span>
              </p>
            )}
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => {
                  setFormData({ ...formData, consent: e.target.checked });
                  clearFieldError('consent');
                }}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] text-[#8059E3] focus:ring-[#8059E3] focus:ring-offset-0 transition"
              />
              <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
                I agree to the collection and processing of my contact details and project brief solely for communication regarding this inquiry as detailed in the{' '}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-[#8059E3] underline hover:text-white transition"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.consent}</span>
              </p>
            )}
          </div>

          {/* Accessible Form Feedback State */}
          <div aria-live="polite" className="pt-2">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">Brief Received</p>
                    <p className="text-xs text-emerald-300 leading-relaxed">
                      Thank you! Your project brief has been received. Our senior engineering team will review it and reply with initial architecture insights within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-sm flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">Submission Notice</p>
                    <p className="text-xs text-red-300 leading-relaxed">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-full font-semibold text-sm text-white purple-pill-btn group hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-[#8059E3]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying & Submitting Brief...</span>
              </>
            ) : (
              <>
                <span>Send Project Brief</span>
                <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-gray-500 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8059E3]" />
            <span>End-to-end encrypted • Zero spam guarantee</span>
          </div>
        </form>
      </FadeIn>
    </section>
  );
}
