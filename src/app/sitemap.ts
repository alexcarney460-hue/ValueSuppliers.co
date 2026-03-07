import type { MetadataRoute } from 'next';
import PRODUCTS from '@/lib/products';

const BASE = 'https://valuesuppliers.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/catalog`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/wholesale`,           lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/distribution`,        lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/services`,            lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/affiliate`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/catalog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  return [...staticRoutes, ...productRoutes];
}
