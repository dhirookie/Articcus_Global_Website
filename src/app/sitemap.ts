import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { SERVICE_DETAILS } from '@/data/service-details';
import { SOLUTION_EXAMPLES } from '@/data/solution-examples';
import { GUIDES } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/services',
    '/industries',
    '/how-we-work',
    '/pricing',
    '/contact',
    '/about',
    '/solutions',
    '/guides',
    '/privacy',
    ...SERVICE_DETAILS.map((service) => `/services/${service.id}`),
    ...SOLUTION_EXAMPLES.map((example) => `/solutions/${example.slug}`),
    ...GUIDES.map((guide) => `/guides/${guide.slug}`),
  ].map((path) => ({
    url: `${site.url}${path || '/'}`,
    changeFrequency: 'monthly',
    priority: path ? 0.8 : 1,
  }));
}
