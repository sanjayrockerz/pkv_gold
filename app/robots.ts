import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: 'https://www.pkvgold.com/sitemap.xml',
  };
}
