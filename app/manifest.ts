import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PKV GOLD - Cash for Gold in Kolathur, Chennai',
    short_name: 'PKV GOLD',
    description: 'Get clear gold valuation and instant cash for old gold at PKV GOLD in Kolathur, Chennai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c9a84c',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
