import type { Metadata } from 'next';
import './globals.css';
import { contact } from '@/lib/constants';

const BASE_URL = 'https://www.pkvgold.com';
const OG_IMAGE = `${BASE_URL}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'PKV GOLD | Cash for Gold in Kolathur, Chennai',
    template: '%s | PKV GOLD',
  },
  description: `Get a clear, transparent gold valuation and instant cash for your old gold at PKV GOLD in ${contact.locationLabel}. Trusted local gold buyers in Chennai.`,
  keywords: [
    'cash for gold Chennai',
    'sell gold Kolathur',
    'gold buyers Chennai',
    'gold valuation Chennai',
    'sell old gold jewellery Chennai',
    'gold buyers near me',
    'release pledged gold Chennai',
    'sell old gold coins Chennai',
    'PKV Gold Kolathur',
    'PKV Gold',
  ],
  authors: [{ name: 'PKV GOLD', url: BASE_URL }],
  creator: 'PKV GOLD',
  publisher: 'PKV GOLD',
  category: 'Jewelry & Financial Services',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'PKV GOLD | Cash for Gold in Kolathur, Chennai',
    description: `Get a clear, transparent gold valuation and instant cash for your old gold at PKV GOLD in ${contact.locationLabel}. Trusted local gold buyers in Chennai.`,
    url: BASE_URL,
    siteName: 'PKV GOLD',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: OG_IMAGE,
        width: 1254,
        height: 1254,
        alt: 'PKV GOLD — Cash for Gold in Kolathur, Chennai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKV GOLD | Cash for Gold in Kolathur, Chennai',
    description: `Get a clear, transparent gold valuation and instant cash for your old gold at PKV GOLD in ${contact.locationLabel}.`,
    images: [OG_IMAGE],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.pkvgold.com/#organization',
  name: contact.businessName,
  url: 'https://www.pkvgold.com',
  logo: 'https://www.pkvgold.com/images/PKV%20LOGO.png',
  image: 'https://www.pkvgold.com/images/PKV%20LOGO.png',
  description: `Trusted cash-for-gold and gold valuation service in ${contact.locationLabel}. Clear, transparent process from assessment to payment.`,
  telephone: contact.phone,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.9/7, Balagi Nagar Main Rd, Velavan Nagar',
    addressLocality: 'Kolathur',
    addressRegion: 'Tamil Nadu',
    postalCode: '600099',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: contact.latitude,
    longitude: contact.longitude,
  },
  hasMap: contact.mapsUrl,
  sameAs: ['https://www.instagram.com/pkvgold/'],
  priceRange: '₹₹',
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.pkvgold.com/#website',
  url: 'https://www.pkvgold.com',
  name: 'PKV GOLD',
  description: 'Cash for Gold in Kolathur, Chennai',
  publisher: { '@id': 'https://www.pkvgold.com/#organization' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </body>
    </html>
  );
}
