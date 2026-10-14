import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/services',
    '/industries',
    '/how-we-work',
    '/pricing',
    '/contact',
  ].map((path) => ({
    url: `${site.url}${path || '/'}`,
    changeFrequency: 'monthly',
    priority: path ? 0.8 : 1,
  }));
}
