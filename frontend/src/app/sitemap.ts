import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codexplus.site';
  const now = new Date();

  const routes = [
    '',
    '/services',
    '/portfolio',
    '/team',
    '/about',
    '/articles',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/portfolio' || route === '/contact' ? 0.8 : 0.6,
  }));
}
