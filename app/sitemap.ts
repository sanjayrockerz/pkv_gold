import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.pkvgold.com';

  // This site is a single-page application — all sections are hash-anchors on /.
  // Only the root URL gets a sitemap entry; /admin is private and excluded.
  return [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
