'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:4000/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 px-6 max-w-4xl mx-auto border-t border-white/[0.06] bg-black">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">Contact</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Let&apos;s Build Together.</h2>
        <p className="text-gray-400 text-sm md:text-base">We respond to all serious project inquiries within 24 hours.</p>
      </div>

      <div className="webangles-card p-8 md:p-12 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8059E3] transition"
                placeholder="Elena Vasquez"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8059E3] transition"
                placeholder="elena@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Phone / WhatsApp</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8059E3] transition"
              placeholder="+92 324 3315524"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Project Brief</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8059E3] transition resize-none"
              placeholder="Tell us about your project, timeline and goals..."
            />
          </div>

          {status === 'success' && (
            <div className="p-4 rounded-xl bg-[#4F1AD6]/20 border border-[#8059E3]/40 text-purple-200 text-sm text-center">
              Message received! We will be in touch shortly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 rounded-full font-semibold text-sm text-white purple-pill-btn hover:brightness-110 transition disabled:opacity-50 shadow-xl shadow-[#4F1AD6]/30"
          >
            {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}
