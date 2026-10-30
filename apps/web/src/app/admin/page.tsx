'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ImageCropperModal } from '@/components/ImageCropperModal';
import {
  LayoutDashboard,
  Settings,
  Layers,
  FolderKanban,
  FileText,
  Users,
  Inbox,
  HelpCircle,
  Image as ImageIcon,
  LogOut,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Database,
  Globe,
  Edit2,
  X,
  Upload,
  Camera,
  Crop,
  Github,
  Linkedin,
  Twitter,
  KeyRound,
  Shield,
} from 'lucide-react';

const ENDPOINT_MAP: Record<string, string> = {
  service: 'services',
  services: 'services',
  project: 'projects',
  projects: 'projects',
  team: 'team',
  post: 'posts',
  posts: 'posts',
  article: 'posts',
  articles: 'posts',
  faq: 'faqs',
  faqs: 'faqs',
  media: 'media',
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'settings' | 'security' | 'hero' | 'services' | 'projects' | 'team' | 'articles' | 'faqs' | 'media' | 'inbox'
  >('overview');

  // Auth form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Admin Credentials form
  const [adminCreds, setAdminCreds] = useState({
    email: 'admin@codexplus.site',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [credStatus, setCredStatus] = useState<{ message?: string; error?: string }>({});

  // Media Library state
  const [mediaList, setMediaList] = useState<any[]>([
    {
      id: 'default-logo',
      filename: 'logo.svg',
      url: '/logo.svg',
      mime: 'image/svg+xml',
      title: 'Studio Logo',
    },
    {
      id: 'default-favicon',
      filename: 'favicon.png',
      url: '/favicon.png',
      mime: 'image/jpeg',
      title: 'Favicon Icon',
    },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Modal / Editing states
  const [isSavingModal, setIsSavingModal] = useState(false);
  const isSavingModalRef = useRef(false);
  const [editingItem, setEditingItem] = useState<{
    type: 'service' | 'project' | 'team' | 'post' | 'faq';
    item: any;
    isNew?: boolean;
  } | null>(null);

  // Content States
  const [siteSettings, setSiteSettings] = useState<any>({
    siteName: 'CodeXplus',
    tagline: 'Elite Web Systems & Full-Stack Digital Engineering Studio',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.png',
    contact: {
      email: 'contact@codexplus.site',
      phone: '+92 300 0000000',
      address: 'Karachi, Pakistan',
      turnaround: 'Within 24 Hours',
    },
    socials: {
      github: 'https://github.com/codexplus',
      linkedin: 'https://linkedin.com/company/codexplus',
      twitter: 'https://twitter.com/codexplus',
    },
    footer: {
      copyright: '© 2026 CodeXplus Studio. All rights reserved.',
    },
  });

  const [heroContent, setHeroContent] = useState<any>({
    badge: 'Studio',
    badgeText: 'Bespoke Web Systems & Architecture',
    titlePrimary: 'Smart Web Experiences,',
    titleGradient: 'Built From Every Angle',
    description:
      'CodeXplus builds modern digital architectures, headless CMS portals, and high-performance web applications using Next.js and Fastify — engineered for businesses that demand high conversion and zero downtime.',
    primaryCtaText: 'Start a Project',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'Explore Case Studies',
    secondaryCtaHref: '/portfolio',
  });

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    imageSrc: string;
  }>({
    isOpen: false,
    imageSrc: '',
  });
  const [postsList, setPostsList] = useState<any[]>([]);
  const [faqsList, setFaqsList] = useState<any[]>([]);
  const [inboxList, setInboxList] = useState<any[]>([]);

  // Initial Data Fetch
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [siteRes, srvRes, prjRes, teamRes, postRes, faqRes, mediaRes, heroRes, inboxRes] = await Promise.all([
        fetch('/api/backend/public/site').catch(() => null),
        fetch('/api/backend/admin/services').catch(() => null),
        fetch('/api/backend/admin/projects').catch(() => null),
        fetch('/api/backend/admin/team').catch(() => null),
        fetch('/api/backend/admin/posts').catch(() => null),
        fetch('/api/backend/admin/faqs').catch(() => null),
        fetch('/api/backend/admin/media').catch(() => null),
        fetch('/api/backend/admin/pages/home').catch(() => null),
        fetch('/api/backend/admin/submissions').catch(() => null),
      ]);

      if (siteRes?.ok) {
        const data = await siteRes.json();
        if (data.settings) setSiteSettings(data.settings);
      }
      if (srvRes?.ok) {
        const data = await srvRes.json();
        if (data.items) setServicesList(data.items);
      }
      if (prjRes?.ok) {
        const data = await prjRes.json();
        if (data.items) setProjectsList(data.items);
      }
      if (teamRes?.ok) {
        const data = await teamRes.json();
        if (data.items) {
          setTeamList(
            data.items.map((m: any) => ({
              ...m,
              photoUrl: m.socials?.photoUrl || m.photoUrl || '',
              github: m.socials?.github || m.github || '',
              linkedin: m.socials?.linkedin || m.linkedin || '',
              twitter: m.socials?.twitter || m.twitter || '',
            }))
          );
        }
      }
      if (postRes?.ok) {
        const data = await postRes.json();
        if (data.items) setPostsList(data.items);
      }
      if (faqRes?.ok) {
        const data = await faqRes.json();
        if (data.items) setFaqsList(data.items);
      }
      if (mediaRes?.ok) {
        const data = await mediaRes.json();
        if (data.items && data.items.length > 0) {
          setMediaList(data.items);
        }
      }
      if (heroRes?.ok) {
        const data = await heroRes.json();
        const heroSection = data.sections?.find((s: any) => s.type === 'hero');
        if (heroSection?.data) {
          setHeroContent((prev: any) => ({ ...prev, ...heroSection.data }));
        }
      }
      if (inboxRes?.ok) {
        const data = await inboxRes.json();
        if (data.items) {
          setInboxList(data.items);
        }
      }

      const me = await fetch('/api/backend/auth/me').catch(() => null);
      if (me?.ok) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/backend/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Login failed. Please check credentials.');
      }

      setIsAuthenticated(true);
      fetchInitialData();
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredStatus({});

    if (adminCreds.newPassword && adminCreds.newPassword !== adminCreds.confirmPassword) {
      setCredStatus({ error: 'New password and confirmation do not match.' });
      return;
    }

    try {
      const res = await fetch('/api/backend/auth/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminCreds.email,
          newPassword: adminCreds.newPassword || undefined,
          currentPassword: adminCreds.currentPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCredStatus({ error: data.message || 'Failed to update credentials' });
      } else {
        setCredStatus({ message: 'Admin User ID and Password updated in PostgreSQL!' });
        setAdminCreds({ ...adminCreds, currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err: any) {
      setCredStatus({ error: err.message || 'Connection error' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/backend/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const uploaded = data.media || {
          id: crypto.randomUUID(),
          filename: file.name,
          url: data.media?.url || URL.createObjectURL(file),
          mime: file.type,
          title: file.name,
        };
        setMediaList([uploaded, ...mediaList]);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaveStatus('saving');
    try {
      // 1. Save Site Settings (Site Name, Tagline, Contact, Socials, Logo & Favicon URLs)
      const siteReq = fetch('/api/backend/admin/singletons/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings),
      });

      // 2. Save Hero Section
      const heroReq = fetch('/api/backend/admin/pages/home/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: [
            {
              type: 'hero',
              position: 0,
              enabled: true,
              data: heroContent,
            },
          ],
        }),
      });

      await Promise.all([siteReq, heroReq]);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSaveModalItem = async (itemData: any) => {
    if (!editingItem || isSavingModalRef.current) return;
    isSavingModalRef.current = true;
    setIsSavingModal(true);
    setSaveStatus('saving');

    const { type, isNew } = editingItem;
    const method = isNew ? 'POST' : 'PUT';
    const resource = ENDPOINT_MAP[type] ?? (type.endsWith('s') ? type : `${type}s`);
    const endpoint = isNew ? `/api/backend/admin/${resource}` : `/api/backend/admin/${resource}/${itemData.id}`;

    // Clean and normalize payload before sending
    const payload = { ...itemData };
    if (type === 'service') {
      if (typeof payload.bullets === 'string') {
        payload.bullets = payload.bullets
          .split('\n')
          .map((b: string) => b.trim())
          .filter(Boolean);
      }
      if (!payload.slug && payload.title) {
        payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    } else if (type === 'project') {
      if (typeof payload.tags === 'string') {
        payload.tags = payload.tags
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
      }
      if (!payload.slug && payload.title) {
        payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    } else if (type === 'post') {
      if (!payload.slug && payload.title) {
        payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedRecord = await res.json().catch(() => payload);

        if (type === 'team') {
          const formatted = {
            ...payload,
            id: savedRecord.id || itemData.id,
            photoUrl: payload.photoUrl || '',
            github: payload.github || '',
            linkedin: payload.linkedin || '',
            twitter: payload.twitter || '',
          };
          if (isNew) {
            setTeamList([...teamList, formatted]);
          } else {
            setTeamList(teamList.map((t) => (t.id === itemData.id ? formatted : t)));
          }
        } else if (type === 'service') {
          if (isNew) {
            setServicesList([...servicesList, savedRecord.id ? savedRecord : payload]);
          } else {
            setServicesList(servicesList.map((s) => (s.id === itemData.id ? payload : s)));
          }
        } else if (type === 'project') {
          if (isNew) {
            setProjectsList([...projectsList, savedRecord.id ? savedRecord : payload]);
          } else {
            setProjectsList(projectsList.map((p) => (p.id === itemData.id ? payload : p)));
          }
        } else if (type === 'post') {
          if (isNew) {
            setPostsList([...postsList, savedRecord.id ? savedRecord : payload]);
          } else {
            setPostsList(postsList.map((p) => (p.id === itemData.id ? payload : p)));
          }
        } else if (type === 'faq') {
          if (isNew) {
            setFaqsList([...faqsList, savedRecord.id ? savedRecord : payload]);
          } else {
            setFaqsList(faqsList.map((f) => (f.id === itemData.id ? payload : f)));
          }
        }

        setEditingItem(null);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        alert('Server returned an error while saving to database.');
        setSaveStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      isSavingModalRef.current = false;
      setIsSavingModal(false);
    }
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record permanently from the database?')) {
      return;
    }

    try {
      const resource = ENDPOINT_MAP[type] ?? (type.endsWith('s') ? type : `${type}s`);
      const res = await fetch(`/api/backend/admin/${resource}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        if (type === 'service' || type === 'services') setServicesList(servicesList.filter((x) => x.id !== id));
        if (type === 'project' || type === 'projects') setProjectsList(projectsList.filter((x) => x.id !== id));
        if (type === 'team') setTeamList(teamList.filter((x) => x.id !== id));
        if (type === 'post' || type === 'posts') setPostsList(postsList.filter((x) => x.id !== id));
        if (type === 'faq' || type === 'faqs') setFaqsList(faqsList.filter((x) => x.id !== id));
        if (type === 'media') setMediaList(mediaList.filter((x) => x.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-[#6320EE] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-mono text-sm">Connecting to CodeXplus Fastify Engine...</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#6320EE]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#0D0D14] border border-white/10 p-8 rounded-3xl relative z-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6320EE] to-[#8059E3] flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-[#6320EE]/40">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CodeXplus Studio</h1>
              <p className="text-xs text-gray-400">Custom Fastify CMS & Media Asset Hub</p>
            </div>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Operator Email / User ID
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8059E3] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Access Key / Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8059E3] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full purple-pill-btn py-3 rounded-xl text-sm font-semibold text-white hover:brightness-110 transition shadow-lg shadow-[#6320EE]/30 mt-2"
            >
              Sign In to CMS Studio
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <span className="text-xs text-gray-500 font-mono">
              Fastify 5 + PostgreSQL Engine · v1.0.0
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-white flex">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-white/[0.08] bg-[#0A0A0F] flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08] px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6320EE] to-[#8059E3] flex items-center justify-center font-bold text-white text-sm">
                C
              </div>
              <div>
                <span className="text-sm font-bold block leading-none">CodeXplus</span>
                <span className="text-[10px] text-[#A855F7] font-mono">CMS Studio</span>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-400 hover:text-white transition"
              title="Open Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Studio Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'media'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-pink-400" />
              <span>Media Library ({mediaList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'hero'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Hero & Headlines</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'services'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services ({servicesList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'projects'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects ({projectsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'team'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team & People ({teamList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'articles'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Journal & Articles ({postsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'faqs'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQs & Support ({faqsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'settings'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Logo, Favicon & Brand</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'security'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Admin ID & Password</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'inbox'
                  ? 'bg-[#6320EE] text-white shadow-lg shadow-[#6320EE]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Inquiries Inbox</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block truncate">Admin User</span>
              <span className="text-[10px] text-gray-500 truncate block">Fastify Master</span>
            </div>
          </div>
          <button
            onClick={() => {
              fetch('/api/backend/auth/logout', { method: 'POST' }).catch(() => null);
              setIsAuthenticated(false);
            }}
            className="p-1.5 text-gray-500 hover:text-red-400 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 max-w-5xl">
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/[0.08]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {activeTab === 'overview' && 'Studio Overview'}
              {activeTab === 'media' && 'Media Assets & Picture Library'}
              {activeTab === 'hero' && 'Hero Section & Kinetic Headline'}
              {activeTab === 'services' && 'Capabilities & Services'}
              {activeTab === 'projects' && 'Selected Works & Case Studies'}
              {activeTab === 'team' && 'Team & Leadership'}
              {activeTab === 'articles' && 'Journal & Engineering Articles'}
              {activeTab === 'faqs' && 'Frequently Asked Questions'}
              {activeTab === 'settings' && 'Logo, Favicon & Brand Settings'}
              {activeTab === 'security' && 'Admin Credentials & Security'}
              {activeTab === 'inbox' && 'Client Inquiries & Leads'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Direct live control over database records, images, links, and front-end rendering.
            </p>
          </div>

          <button
            onClick={handleSaveAll}
            disabled={saveStatus === 'saving'}
            className="purple-pill-btn px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 hover:brightness-110 transition shadow-lg shadow-[#6320EE]/25"
          >
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing Changes...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved to Database!</span>
              </>
            ) : saveStatus === 'error' ? (
              <>
                <span className="text-red-300">Save Error</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save & Publish All</span>
              </>
            )}
          </button>
        </div>

        {/* TAB: SECURITY / ADMIN ID & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#0D0D14] border border-white/[0.08] max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Change Admin Access Credentials</h3>
                  <p className="text-xs text-gray-400">Update operator login email and master password</p>
                </div>
              </div>

              {credStatus.message && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  {credStatus.message}
                </div>
              )}
              {credStatus.error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {credStatus.error}
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    Admin User ID / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={adminCreds.email}
                    onChange={(e) => setAdminCreds({ ...adminCreds, email: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    New Password (leave empty to keep current)
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={adminCreds.newPassword}
                    onChange={(e) => setAdminCreds({ ...adminCreds, newPassword: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>

                {adminCreds.newPassword.length > 0 && (
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      value={adminCreds.confirmPassword}
                      onChange={(e) => setAdminCreds({ ...adminCreds, confirmPassword: e.target.value })}
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="purple-pill-btn px-6 py-2.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Update Credentials in PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS (LOGO & FAVICON) */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-6">
              <h3 className="text-sm font-bold text-white">Brand Visuals: Logo & Favicon</h3>

              {/* Logo Manager */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Navbar & Header Logo</span>
                    <span className="text-[11px] text-gray-400">Current logo URL or upload new file</span>
                  </div>
                  {siteSettings.logoUrl && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                      <img src={siteSettings.logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={siteSettings.logoUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                    placeholder="/logo.png or uploaded image URL"
                    className="flex-1 bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                  <label className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition">
                    <Camera className="w-4 h-4" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        const res = await fetch('/api/backend/admin/media/upload', {
                          method: 'POST',
                          body: fd,
                        }).catch(() => null);
                        if (res?.ok) {
                          const data = await res.json();
                          const url = data.media?.url || URL.createObjectURL(file);
                          setSiteSettings({ ...siteSettings, logoUrl: url });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Favicon Manager */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Browser Tab Favicon</span>
                    <span className="text-[11px] text-gray-400">Favicon icon displayed in browser tab</span>
                  </div>
                  {siteSettings.faviconUrl && (
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                      <img src={siteSettings.faviconUrl} alt="Favicon Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={siteSettings.faviconUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, faviconUrl: e.target.value })}
                    placeholder="/favicon.jpeg or uploaded image URL"
                    className="flex-1 bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                  <label className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition">
                    <Camera className="w-4 h-4" />
                    <span>Upload Favicon</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        const res = await fetch('/api/backend/admin/media/upload', {
                          method: 'POST',
                          body: fd,
                        }).catch(() => null);
                        if (res?.ok) {
                          const data = await res.json();
                          const url = data.media?.url || URL.createObjectURL(file);
                          setSiteSettings({ ...siteSettings, faviconUrl: url });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* General Text Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Studio Brand Name</label>
                  <input
                    type="text"
                    value={siteSettings.siteName || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={siteSettings.tagline || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-bold text-white">Contact & Operations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Primary Email</label>
                  <input
                    type="text"
                    value={siteSettings.contact?.email || ''}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contact: { ...siteSettings.contact, email: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Turnaround SLA</label>
                  <input
                    type="text"
                    value={siteSettings.contact?.turnaround || ''}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contact: { ...siteSettings.contact, turnaround: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MEDIA ASSET LIBRARY */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#0D0D14] border border-dashed border-white/20 text-center hover:border-[#8059E3] transition">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-[#6320EE]/10 border border-[#8059E3]/20 flex items-center justify-center text-[#8059E3] mx-auto mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Upload New Picture or Asset</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
                PNG, JPG, SVG, WebP formats supported. Images are stored directly in public uploads folder.
              </p>
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="purple-pill-btn px-6 py-2.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Picture...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Select Picture from Computer</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4">Uploaded Images ({mediaList.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaList.map((img) => (
                  <div
                    key={img.id}
                    className="p-3 rounded-2xl bg-[#0D0D14] border border-white/[0.08] group relative flex flex-col justify-between"
                  >
                    <div className="w-full h-36 rounded-xl bg-black/40 overflow-hidden relative mb-2 flex items-center justify-center">
                      <img
                        src={img.url}
                        alt={img.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="overflow-hidden pr-2">
                        <span className="text-xs font-semibold text-white block truncate">{img.filename}</span>
                        <span className="text-[10px] text-gray-500 font-mono block uppercase">{img.mime || 'IMAGE'}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem('media', img.id)}
                        className="p-1 text-gray-500 hover:text-red-400 transition"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">Database</span>
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  PostgreSQL 16
                </span>
                <span className="text-[10px] text-gray-500 mt-1 block">Docker Container Active</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">Backend</span>
                <span className="text-lg font-bold text-white">Fastify 5</span>
                <span className="text-[10px] text-gray-500 mt-1 block">Port 4000 REST API</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">Team Members</span>
                <span className="text-lg font-bold text-white">{teamList.length} Craftsmen</span>
                <span className="text-[10px] text-gray-500 mt-1 block">Live on /team</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">Media Assets</span>
                <span className="text-lg font-bold text-white">{mediaList.length} Files</span>
                <span className="text-[10px] text-gray-500 mt-1 block">Pictures & Graphics</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-white/[0.08]">
              <h3 className="text-sm font-bold text-white mb-4">Quick Studio Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-left transition"
                >
                  <Settings className="w-5 h-5 text-[#8059E3] mb-2" />
                  <span className="text-xs font-semibold text-white block">Change Logo & Favicon →</span>
                  <span className="text-[11px] text-gray-400 mt-1 block">Upload navbar brand logo and favicon</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-left transition"
                >
                  <KeyRound className="w-5 h-5 text-amber-400 mb-2" />
                  <span className="text-xs font-semibold text-white block">Admin User ID & Password →</span>
                  <span className="text-[11px] text-gray-400 mt-1 block">Change credentials for dashboard access</span>
                </button>

                <button
                  onClick={() => setActiveTab('team')}
                  className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-left transition"
                >
                  <Users className="w-5 h-5 text-[#8059E3] mb-2" />
                  <span className="text-xs font-semibold text-white block">Manage Team & Links →</span>
                  <span className="text-[11px] text-gray-400 mt-1 block">Add bios, photos & GitHub, LinkedIn, Twitter</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-bold text-white">Eyebrow Pill</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={heroContent.badge}
                    onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Badge Subtitle</label>
                  <input
                    type="text"
                    value={heroContent.badgeText}
                    onChange={(e) => setHeroContent({ ...heroContent, badgeText: e.target.value })}
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-bold text-white">Kinetic Headline & Copy</h3>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Top Primary Text</label>
                <input
                  type="text"
                  value={heroContent.titlePrimary}
                  onChange={(e) => setHeroContent({ ...heroContent, titlePrimary: e.target.value })}
                  className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Bottom Gradient Animated Line</label>
                <input
                  type="text"
                  value={heroContent.titleGradient}
                  onChange={(e) => setHeroContent({ ...heroContent, titleGradient: e.target.value })}
                  className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Value Proposition Copy</label>
                <textarea
                  rows={4}
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: TEAM */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Control who is featured on the team and leadership page with their social profile links.</p>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'team',
                    isNew: true,
                    item: {
                      name: '',
                      role: '',
                      bio: '',
                      photoUrl: '',
                      github: '',
                      linkedin: '',
                      twitter: '',
                      status: 'published',
                    },
                  })
                }
                className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Team Member</span>
              </button>
            </div>

            {teamList.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6320EE]/30 to-[#8059E3]/20 border border-white/10 flex items-center justify-center font-bold text-white text-lg overflow-hidden shrink-0">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name?.charAt(0) || 'T'
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{member.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {member.status}
                      </span>
                    </h4>
                    <p className="text-xs text-[#8059E3] font-medium">{member.role}</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-lg">{member.bio}</p>

                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      {member.github && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Github className="w-3 h-3 text-[#A855F7]" /> GitHub linked
                        </span>
                      )}
                      {member.linkedin && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Linkedin className="w-3 h-3 text-[#A855F7]" /> LinkedIn linked
                        </span>
                      )}
                      {member.twitter && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Twitter className="w-3 h-3 text-[#A855F7]" /> Twitter linked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem({ type: 'team', item: member })}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition"
                    title="Edit Member"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('team', member.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Manage client deliverables and architecture offerings.</p>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'service',
                    isNew: true,
                    item: {
                      number: String(servicesList.length + 1).padStart(2, '0'),
                      title: '',
                      slug: '',
                      description: '',
                      bullets: 'High-Performance Architecture\nType-Safe Contracts\nSub-15ms Latency',
                      status: 'published',
                    },
                  })
                }
                className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            {servicesList.map((srv, idx) => (
              <div
                key={srv.id || idx}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#8059E3]">{srv.number || `0${idx + 1}`}</span>
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">{srv.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setEditingItem({
                        type: 'service',
                        item: {
                          ...srv,
                          bullets: Array.isArray(srv.bullets) ? srv.bullets.join('\n') : (srv.bullets || ''),
                        },
                      })
                    }
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('service', srv.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Showcase selected works, client studies, and technology tags.</p>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'project',
                    isNew: true,
                    item: { title: '', category: 'Platform', summary: '', client: '', year: '2026', imageUrl: '', status: 'published' },
                  })
                }
                className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Case Study</span>
              </button>
            </div>

            {projectsList.map((prj, idx) => (
              <div
                key={prj.id || idx}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-gray-500">{prj.category}</span>
                  <h4 className="text-sm font-bold text-white">{prj.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">{prj.summary}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem({ type: 'project', item: prj })}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('project', prj.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Technical insights, engineering post-mortems, and field notes.</p>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'post',
                    isNew: true,
                    item: { title: '', category: 'Engineering', excerpt: '', status: 'published' },
                  })
                }
                className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write Article</span>
              </button>
            </div>

            {postsList.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#8059E3]">{post.category}</span>
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">{post.excerpt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem({ type: 'post', item: post })}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('post', post.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Control FAQ entries shown to prospective clients.</p>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'faq',
                    isNew: true,
                    item: { question: '', answer: '', status: 'published' },
                  })
                }
                className="purple-pill-btn px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {faqsList.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">{faq.answer}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem({ type: 'faq', item: faq })}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('faq', faq.id)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">
                Direct inquiries and project briefs submitted by visitors from the website contact forms.
              </p>
              <button
                onClick={async () => {
                  const res = await fetch('/api/backend/admin/submissions').catch(() => null);
                  if (res?.ok) {
                    const data = await res.json();
                    if (data.items) setInboxList(data.items);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs text-gray-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Leads</span>
              </button>
            </div>

            {inboxList.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0D0D14] border border-white/[0.08] text-center">
                <Inbox className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-white">No inquiries yet</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Any message sent through the public contact forms is stored in PostgreSQL table{' '}
                  <code className="text-[#A855F7]">form_submissions</code>.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inboxList.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-sm">
                            {sub.payload?.name || 'Anonymous Lead'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono bg-[#6320EE]/20 text-[#A855F7] border border-[#6320EE]/40">
                            {sub.type || 'contact'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">
                          {sub.payload?.email} {sub.payload?.company ? `• ${sub.payload.company}` : ''}
                        </p>
                      </div>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : ''}
                      </span>
                    </div>

                    {sub.payload?.message && (
                      <p className="text-xs text-gray-300 bg-[#13131F] p-3 rounded-xl border border-white/5 leading-relaxed">
                        {sub.payload.message}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
                      {sub.payload?.budget && (
                        <span className="bg-white/5 px-2 py-1 rounded-md">Budget: {sub.payload.budget}</span>
                      )}
                      {sub.payload?.timeline && (
                        <span className="bg-white/5 px-2 py-1 rounded-md">Timeline: {sub.payload.timeline}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* EDIT MODAL DIALOG WITH PICTURE & SOCIAL PROFILES */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E0E14] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white capitalize">
                {editingItem.isNew ? 'Create New' : 'Edit'} {editingItem.type}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveModalItem(editingItem.item);
              }}
              className="space-y-4"
            >
              {'name' in editingItem.item && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.item.name || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, name: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              {'role' in editingItem.item && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem.item.role || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, role: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              {/* Photo Upload / URL field for Team */}
              {editingItem.type === 'team' && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                    <span>Member Picture / Photo</span>
                    <span className="text-[10px] text-[#A855F7]">Crop / Center Face Supported</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingItem.item.photoUrl || ''}
                      placeholder="/uploads/... or https://..."
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, photoUrl: e.target.value },
                        })
                      }
                      className="flex-1 bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                    {editingItem.item.photoUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setCropperState({
                            isOpen: true,
                            imageSrc: editingItem.item.photoUrl,
                          })
                        }
                        className="px-3 py-2 bg-[#8059E3]/20 hover:bg-[#8059E3]/30 text-[#A855F7] hover:text-white rounded-xl border border-[#8059E3]/30 flex items-center gap-1.5 text-xs font-semibold transition"
                        title="Crop / Adjust Photo"
                      >
                        <Crop className="w-3.5 h-3.5" />
                        <span>Crop</span>
                      </button>
                    )}
                    <label className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload & Crop</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setCropperState({
                                isOpen: true,
                                imageSrc: event.target.result as string,
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                  {editingItem.item.photoUrl && (
                    <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0">
                        <img
                          src={editingItem.item.photoUrl}
                          alt="Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-white font-medium block">Live Framing Preview</span>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          Positioning is automatically focused at the top so heads are never cut off. Click "Crop" to re-frame.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Social profile links inputs for Team (GitHub, LinkedIn, Twitter) */}
              {editingItem.type === 'team' && (
                <div className="pt-2 border-t border-white/[0.08] space-y-3">
                  <span className="text-xs font-mono text-[#A855F7] uppercase tracking-wider block">
                    Social Profile Links
                  </span>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1 flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-gray-300" />
                      <span>GitHub Profile URL</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={editingItem.item.github || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, github: e.target.value },
                        })
                      }
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      value={editingItem.item.linkedin || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, linkedin: e.target.value },
                        })
                      }
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1 flex items-center gap-1.5">
                      <Twitter className="w-3.5 h-3.5 text-[#1da1f2]" />
                      <span>Twitter / X Profile URL</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://twitter.com/username"
                      value={editingItem.item.twitter || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, twitter: e.target.value },
                        })
                      }
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>
                </div>
              )}

              {/* Cover Image for Projects */}
              {editingItem.type === 'project' && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                    <span>Project Cover Picture</span>
                    <span className="text-[10px] text-[#A855F7]">URL or Upload</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingItem.item.imageUrl || ''}
                      placeholder="/uploads/... or https://..."
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, imageUrl: e.target.value },
                        })
                      }
                      className="flex-1 bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                    <label className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl cursor-pointer border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch('/api/backend/admin/media/upload', {
                            method: 'POST',
                            body: fd,
                          }).catch(() => null);
                          if (res?.ok) {
                            const data = await res.json();
                            const url = data.media?.url || URL.createObjectURL(file);
                            setEditingItem({
                              ...editingItem,
                              item: { ...editingItem.item, imageUrl: url },
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              {'title' in editingItem.item && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.item.title || ''}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const autoSlug = newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        setEditingItem({
                          ...editingItem,
                          item: {
                            ...editingItem.item,
                            title: newTitle,
                            slug: editingItem.isNew ? autoSlug : (editingItem.item.slug || autoSlug),
                          },
                        });
                      }}
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                      <span>URL Slug</span>
                      <span className="text-[10px] text-gray-500">Auto-generated or custom</span>
                    </label>
                    <input
                      type="text"
                      value={editingItem.item.slug || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, slug: e.target.value },
                        })
                      }
                      className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#8059E3]"
                    />
                  </div>
                </>
              )}

              {editingItem.type === 'service' && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Service Number (e.g. 01, 02)</label>
                  <input
                    type="text"
                    value={editingItem.item.number || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, number: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              {'category' in editingItem.item && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.item.category || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, category: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              {editingItem.type === 'project' && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                    <span>Tech Tags</span>
                    <span className="text-[10px] text-gray-500">Comma separated</span>
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingItem.item.tags)
                        ? editingItem.item.tags.join(', ')
                        : editingItem.item.tags || ''
                    }
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, tags: e.target.value },
                      })
                    }
                    placeholder="Next.js 15, Fastify, PostgreSQL, Tailwind"
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              {'question' in editingItem.item && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={editingItem.item.question || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, question: e.target.value },
                      })
                    }
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  {'bio' in editingItem.item
                    ? 'Bio / Description'
                    : 'summary' in editingItem.item
                    ? 'Summary'
                    : 'answer' in editingItem.item
                    ? 'Answer'
                    : 'excerpt' in editingItem.item
                    ? 'Excerpt'
                    : 'Description'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={
                    editingItem.item.bio ??
                    editingItem.item.summary ??
                    editingItem.item.answer ??
                    editingItem.item.excerpt ??
                    editingItem.item.description ??
                    ''
                  }
                  onChange={(e) => {
                    const key =
                      'bio' in editingItem.item
                        ? 'bio'
                        : 'summary' in editingItem.item
                        ? 'summary'
                        : 'answer' in editingItem.item
                        ? 'answer'
                        : 'excerpt' in editingItem.item
                        ? 'excerpt'
                        : 'description';
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, [key]: e.target.value },
                    });
                  }}
                  className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                />
              </div>

              {editingItem.type === 'service' && (
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                    <span>Key Features / Capabilities</span>
                    <span className="text-[10px] text-gray-500">One per line</span>
                  </label>
                  <textarea
                    rows={3}
                    value={
                      Array.isArray(editingItem.item.bullets)
                        ? editingItem.item.bullets.join('\n')
                        : editingItem.item.bullets || ''
                    }
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, bullets: e.target.value },
                      })
                    }
                    placeholder="High-Performance Architecture&#10;Type-Safe Contracts&#10;Sub-15ms Latency"
                    className="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8059E3]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingModal || saveStatus === 'saving'}
                  className="purple-pill-btn px-5 py-2 rounded-xl text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSavingModal ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Entry...</span>
                    </>
                  ) : (
                    <span>Save Entry</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
