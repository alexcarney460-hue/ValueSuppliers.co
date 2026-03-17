import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/admin/'],
      },
    ],
    sitemap: 'https://valuesuppliers.co/sitemap.xml',
    host: 'https://valuesuppliers.co',
  };
}
