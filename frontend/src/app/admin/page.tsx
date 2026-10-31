'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ShieldCheck,
  Layers,
  FolderGit2,
  Users,
  FileText,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Save,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'services' | 'projects' | 'team' | 'posts' | 'submissions'>('settings');

  // Data states
  const [settings, setSettings] = useState<any>({ site: {}, hero: {} });
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file || !token || !editingItem) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditingItem({
          ...editingItem,
          data: { ...editingItem.data, [targetField]: data.url, photoUrl: data.url, photo_url: data.url }
        });
        showSuccessBanner('Image uploaded successfully!');
      }
    } catch (err) {
      console.error('File upload error', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Editing modals
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('codex_admin_token');
    if (savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
      localStorage.setItem('codex_admin_token', data.token);
      fetchData(data.token);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('codex_admin_token');
  };

  const fetchData = async (jwtToken: string) => {
    const headers = { Authorization: `Bearer ${jwtToken}` };
    try {
      const [setRes, srvRes, prjRes, teamRes, postRes, subRes] = await Promise.all([
        fetch(`${API_BASE}/admin/settings`, { headers }).then((r) => r.json()),
        fetch(`${API_BASE}/admin/services`, { headers }).then((r) => r.json()),
        fetch(`${API_BASE}/admin/projects`, { headers }).then((r) => r.json()),
        fetch(`${API_BASE}/admin/team`, { headers }).then((r) => r.json()),
        fetch(`${API_BASE}/admin/posts`, { headers }).then((r) => r.json()),
        fetch(`${API_BASE}/admin/submissions`, { headers }).then((r) => r.json()),
      ]);

      if (setRes.settings) setSettings(setRes.settings);
      if (srvRes.items) setServices(srvRes.items);
      if (prjRes.items) setProjects(prjRes.items);
      if (teamRes.items) setTeam(teamRes.items);
      if (postRes.items) setPosts(postRes.items);
      if (subRes.items) setSubmissions(subRes.items);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  const showSuccessBanner = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3500);
  };

  const saveSettings = async (key: 'site' | 'hero', value: any) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/admin/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key, value }),
      });
      showSuccessBanner(`${key.toUpperCase()} configuration saved in database!`);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (type: string, id: number) => {
    if (!token || !confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`${API_BASE}/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(token);
      showSuccessBanner('Deleted successfully from database');
    } catch (err) {
      console.error(err);
    }
  };

  const saveModalItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !token) return;
    const { type, data } = editingItem;
    const isEdit = !!data.id;
    const url = isEdit ? `${API_BASE}/admin/${type}/${data.id}` : `${API_BASE}/admin/${type}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setEditingItem(null);
        fetchData(token);
        showSuccessBanner(`${type.toUpperCase()} item saved to database!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-md bg-[#121217] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8059E3]/20 flex items-center justify-center text-[#8059E3]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CodeXplus Admin</h1>
              <p className="text-xs text-gray-400">Node.js + SQLite Custom Control Panel</p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codexplus.site"
                className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8059E3]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8059E3]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#6320EE] to-[#8059E3] hover:opacity-95 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#6320EE]/25"
            >
              Sign In to Database Portal
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-500">
            Default credentials: <span className="text-gray-400 font-mono">admin@codexplus.site</span> / <span className="text-gray-400 font-mono">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans flex flex-col md:flex-row relative">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0F0F14] border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8059E3]/20 flex items-center justify-center text-[#8059E3]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-xs tracking-wide">CodeXplus Admin</h2>
            <span className="text-[9px] text-emerald-400 font-mono">● SQLite Active</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown / Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 bg-[#070709]/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="space-y-2">
            {[
              { id: 'settings', label: 'Site & Hero', icon: Settings },
              { id: 'services', label: 'Services', icon: Layers },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'posts', label: 'Articles', icon: FileText },
              { id: 'submissions', label: 'Inquiries', icon: Inbox },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#8059E3]/20 text-[#8059E3] border border-[#8059E3]/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white bg-white/5"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> View Live Site
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400 bg-red-500/10 w-full text-left"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-[#0F0F14] border-r border-white/10 p-6 flex-col justify-between shrink-0 h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#8059E3]/20 flex items-center justify-center text-[#8059E3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide">CodeXplus</h2>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                ● SQLite Active
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'settings', label: 'Site & Hero', icon: Settings },
              { id: 'services', label: 'Services', icon: Layers },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'posts', label: 'Articles', icon: FileText },
              { id: 'submissions', label: 'Inquiries', icon: Inbox },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#8059E3]/20 text-[#8059E3] border border-[#8059E3]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Live Site
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 w-full text-left"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {saveSuccess}
          </div>
        )}

        {/* 1. Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Site & Hero Controls</h2>
                <p className="text-xs text-gray-400 mt-1">Manage global brand tokens and homepage hero copy.</p>
              </div>
            </div>

            {/* Site Info */}
            <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-sm text-[#8059E3]">General Site Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Site Name</label>
                  <input
                    type="text"
                    value={settings.site?.siteName || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, site: { ...settings.site, siteName: e.target.value } })
                    }
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Contact Email</label>
                  <input
                    type="text"
                    value={settings.site?.contactEmail || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, site: { ...settings.site, contactEmail: e.target.value } })
                    }
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Logo Image</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.site?.logoUrl || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, site: { ...settings.site, logoUrl: e.target.value } })
                      }
                      placeholder="/logo.svg or upload"
                      className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white whitespace-nowrap">
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !token) return;
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch(`${API_BASE}/admin/upload`, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                            body: fd,
                          });
                          const d = await res.json();
                          if (d.url) {
                            setSettings({ ...settings, site: { ...settings.site, logoUrl: d.url } });
                            showSuccessBanner('Logo image uploaded!');
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Favicon Icon</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.site?.faviconUrl || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, site: { ...settings.site, faviconUrl: e.target.value } })
                      }
                      placeholder="/favicon.png or upload"
                      className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white whitespace-nowrap">
                      Upload Favicon
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !token) return;
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch(`${API_BASE}/admin/upload`, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                            body: fd,
                          });
                          const d = await res.json();
                          if (d.url) {
                            setSettings({ ...settings, site: { ...settings.site, faviconUrl: d.url } });
                            showSuccessBanner('Favicon uploaded!');
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={() => saveSettings('site', settings.site)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8059E3] text-xs font-semibold hover:opacity-90 transition-all"
              >
                <Save className="w-4 h-4" /> Save Site Branding
              </button>
            </div>

            {/* Hero Copy */}
            <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-sm text-[#8059E3]">Homepage Hero Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Primary Title</label>
                  <input
                    type="text"
                    value={settings.hero?.titlePrimary || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, hero: { ...settings.hero, titlePrimary: e.target.value } })
                    }
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Gradient Accent Headline</label>
                  <input
                    type="text"
                    value={settings.hero?.titleGradient || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, hero: { ...settings.hero, titleGradient: e.target.value } })
                    }
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Hero Narrative Description</label>
                  <textarea
                    rows={3}
                    value={settings.hero?.description || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, hero: { ...settings.hero, description: e.target.value } })
                    }
                    className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-sm text-white"
                  />
                </div>
              </div>
              <button
                onClick={() => saveSettings('hero', settings.hero)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8059E3] text-xs font-semibold hover:opacity-90 transition-all"
              >
                <Save className="w-4 h-4" /> Save Hero Section
              </button>
            </div>
          </div>
        )}

        {/* 2. Services Tab */}
        {activeTab === 'services' && (
          <div className="max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Services ({services.length})</h2>
                <p className="text-xs text-gray-400 mt-1">Manage core engineering disciplines on the home & services page.</p>
              </div>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'services',
                    data: { number: '04', title: '', slug: '', description: '', bullets: [] },
                  })
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-[#8059E3] text-xs font-semibold rounded-xl hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((item) => (
                <div key={item.id} className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[#8059E3] font-bold">{item.number}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.bullets?.map((b: string, i: number) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setEditingItem({ type: 'services', data: item })}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('services', item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Projects Tab */}
        {activeTab === 'projects' && (
          <div className="max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Selected Works ({projects.length})</h2>
                <p className="text-xs text-gray-400 mt-1">Manage platform case studies and featured portfolio items.</p>
              </div>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'projects',
                    data: { title: '', category: 'Platform', summary: '', year: '2026', client: '', tags: [] },
                  })
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-[#8059E3] text-xs font-semibold rounded-xl hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((item) => (
                <div key={item.id} className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-400 font-semibold">{item.category}</span>
                      <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags?.map((t: string, i: number) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setEditingItem({ type: 'projects', data: item })}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('projects', item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Team Tab */}
        {activeTab === 'team' && (
          <div className="max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Team Members ({team.length})</h2>
                <p className="text-xs text-gray-400 mt-1">Manage engineers, roles, and bio profiles.</p>
              </div>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'team',
                    data: { name: '', role: '', bio: '', photo_url: '', github: '', linkedin: '', twitter: '' },
                  })
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-[#8059E3] text-xs font-semibold rounded-xl hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((item) => (
                <div key={item.id} className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {item.photo_url || item.photoUrl ? (
                        <img src={item.photo_url || item.photoUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#8059E3]/20 border border-[#8059E3]/40 flex items-center justify-center font-bold text-lg text-[#8059E3]">
                          {item.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-base">{item.name}</h3>
                        <p className="text-xs text-[#8059E3] font-semibold">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.bio}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      {item.github && <span className="bg-white/5 px-2 py-0.5 rounded">GH</span>}
                      {item.linkedin && <span className="bg-white/5 px-2 py-0.5 rounded">LI</span>}
                      {item.twitter && <span className="bg-white/5 px-2 py-0.5 rounded">TW</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setEditingItem({ type: 'team', data: item })}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('team', item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Posts Tab */}
        {activeTab === 'posts' && (
          <div className="max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Articles / Journal ({posts.length})</h2>
                <p className="text-xs text-gray-400 mt-1">Create and publish engineering articles directly.</p>
              </div>
              <button
                onClick={() =>
                  setEditingItem({
                    type: 'posts',
                    data: { title: '', category: 'Architecture', excerpt: '', body: '', read_minutes: '5 min read' },
                  })
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-[#8059E3] text-xs font-semibold rounded-xl hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
            </div>

            <div className="space-y-3">
              {posts.map((item) => (
                <div key={item.id} className="bg-[#121217] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8059E3] uppercase font-bold tracking-wider">{item.category}</span>
                    <h3 className="font-semibold text-sm mt-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingItem({ type: 'posts', data: item })}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('posts', item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="max-w-5xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Contact Briefs ({submissions.length})</h2>
              <p className="text-xs text-gray-400 mt-1">Real-time incoming briefs from potential clients.</p>
            </div>

            <div className="space-y-3">
              {submissions.length === 0 ? (
                <div className="bg-[#121217] border border-white/10 rounded-2xl p-8 text-center text-gray-500 text-xs">
                  No inquiries received yet.
                </div>
              ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className="bg-[#121217] border border-white/10 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">{sub.name}</span>
                        <span className="text-xs text-purple-400 font-mono">{sub.email}</span>
                        {sub.phone && <span className="text-xs text-gray-500 font-mono">{sub.phone}</span>}
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(sub.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 bg-[#18181F] p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                      {sub.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Reusable Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-white/10 rounded-2xl w-full max-w-xl p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 capitalize">Edit {editingItem.type}</h3>
            <form onSubmit={saveModalItem} className="space-y-4">
              {/* Service Modal Fields */}
              {editingItem.type === 'services' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Index Number</label>
                      <input
                        type="text"
                        value={editingItem.data.number || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, number: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.title || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Service Icon / Graphic (Optional)</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="https://... or click Upload Icon"
                        value={editingItem.data.icon_url || editingItem.data.iconUrl || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, icon_url: e.target.value, iconUrl: e.target.value },
                          })
                        }
                        className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-[#6320EE] to-[#8059E3] hover:opacity-90 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
                        {isUploading ? 'Uploading...' : '📁 Upload Icon'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'icon_url')}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Service Capabilities / Bullets (Comma separated pills)</label>
                    <input
                      type="text"
                      placeholder="App Router, Server Actions, SQLite & Database, Design Tokens"
                      value={Array.isArray(editingItem.data.bullets) ? editingItem.data.bullets.join(', ') : (editingItem.data.bullets || '')}
                      onChange={(e) => {
                        const arr = e.target.value.split(',').map((b: string) => b.trim());
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, bullets: arr },
                        });
                      }}
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                    {Array.isArray(editingItem.data.bullets) && editingItem.data.bullets.filter(Boolean).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {editingItem.data.bullets.filter(Boolean).map((bullet: string, idx: number) => (
                          <span key={idx} className="text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-0.5 rounded-md">
                            {bullet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.data.description || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value },
                        })
                      }
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </>
              )}

              {/* Project Modal Fields */}
              {editingItem.type === 'projects' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.title || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Category</label>
                      <input
                        type="text"
                        value={editingItem.data.category || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Project Featured Image / Mockup</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="https://... or click Upload Image"
                        value={editingItem.data.image_url || editingItem.data.imageUrl || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image_url: e.target.value, imageUrl: e.target.value },
                          })
                        }
                        className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-[#6320EE] to-[#8059E3] hover:opacity-90 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
                        {isUploading ? 'Uploading...' : '📁 Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'image_url')}
                        />
                      </label>
                    </div>
                    {(editingItem.data.image_url || editingItem.data.imageUrl) && (
                      <div className="mb-3 flex items-center gap-3">
                        <img
                          src={editingItem.data.image_url || editingItem.data.imageUrl}
                          alt="Project Preview"
                          className="w-16 h-12 rounded-lg object-cover border border-white/20"
                        />
                        <span className="text-[11px] text-gray-400 truncate max-w-xs">
                          {editingItem.data.image_url || editingItem.data.imageUrl}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Year</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={editingItem.data.year || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, year: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Client Name</label>
                      <input
                        type="text"
                        placeholder="Enterprise Client"
                        value={editingItem.data.client || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, client: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Tech Stack Tags (Comma separated badges e.g. Next.js 15, Node.js, SQLite, Tailwind CSS)</label>
                    <input
                      type="text"
                      placeholder="Next.js 15, Node.js, SQLite, Tailwind CSS"
                      value={Array.isArray(editingItem.data.tags) ? editingItem.data.tags.join(', ') : (editingItem.data.tags || '')}
                      onChange={(e) => {
                        const tagsArr = e.target.value.split(',').map((t: string) => t.trim());
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, tags: tagsArr },
                        });
                      }}
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                    {Array.isArray(editingItem.data.tags) && editingItem.data.tags.filter(Boolean).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {editingItem.data.tags.filter(Boolean).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[11px] font-mono bg-[#8059E3]/20 border border-[#8059E3]/40 text-purple-300 px-2.5 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Summary</label>
                    <textarea
                      rows={3}
                      value={editingItem.data.summary || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, summary: e.target.value },
                        })
                      }
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </>
              )}

              {/* Team Modal Fields */}
              {editingItem.type === 'team' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.name || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, name: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Role / Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.role || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, role: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Member Photo / Avatar</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="text"
                        placeholder="https://... or click Upload Image"
                        value={editingItem.data.photo_url || editingItem.data.photoUrl || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, photo_url: e.target.value, photoUrl: e.target.value },
                          })
                        }
                        className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-[#6320EE] to-[#8059E3] hover:opacity-90 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
                        {isUploading ? 'Uploading...' : '📁 Upload Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'photo_url')}
                        />
                      </label>
                    </div>
                    {(editingItem.data.photo_url || editingItem.data.photoUrl) && (
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          src={editingItem.data.photo_url || editingItem.data.photoUrl}
                          alt="Preview"
                          className="w-10 h-10 rounded-lg object-cover border border-white/20"
                        />
                        <span className="text-[11px] text-gray-400 truncate max-w-xs">
                          {editingItem.data.photo_url || editingItem.data.photoUrl}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">GitHub Profile Link</label>
                      <input
                        type="text"
                        placeholder="https://github.com/username"
                        value={editingItem.data.github || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, github: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">LinkedIn Profile Link</label>
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/username"
                        value={editingItem.data.linkedin || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, linkedin: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Twitter / X Link</label>
                      <input
                        type="text"
                        placeholder="https://x.com/username"
                        value={editingItem.data.twitter || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, twitter: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Bio / Practitioner Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.data.bio || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, bio: e.target.value },
                        })
                      }
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </>
              )}

              {/* Posts Modal Fields */}
              {editingItem.type === 'posts' && (
                <>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Article Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.title || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, title: e.target.value },
                        })
                      }
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Article Cover / Banner Image</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="https://... or click Upload Image"
                        value={editingItem.data.cover_url || editingItem.data.coverUrl || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, cover_url: e.target.value, coverUrl: e.target.value },
                          })
                        }
                        className="flex-1 bg-[#18181F] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-[#6320EE] to-[#8059E3] hover:opacity-90 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
                        {isUploading ? 'Uploading...' : '📁 Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'cover_url')}
                        />
                      </label>
                    </div>
                    {(editingItem.data.cover_url || editingItem.data.coverUrl) && (
                      <div className="mb-3 flex items-center gap-3">
                        <img
                          src={editingItem.data.cover_url || editingItem.data.coverUrl}
                          alt="Cover Preview"
                          className="w-16 h-12 rounded-lg object-cover border border-white/20"
                        />
                        <span className="text-[11px] text-gray-400 truncate max-w-xs">
                          {editingItem.data.cover_url || editingItem.data.coverUrl}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Excerpt</label>
                    <textarea
                      rows={3}
                      value={editingItem.data.excerpt || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, excerpt: e.target.value },
                        })
                      }
                      className="w-full bg-[#18181F] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#8059E3] text-xs font-semibold rounded-xl hover:opacity-90 transition-all"
                >
                  Save to SQLite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
