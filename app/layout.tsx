import type { Metadata } from 'next';
import './globals.css';
import { contact } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'PKV GOLD | Cash for Gold in Kolathur, Chennai',
  description: `Clear gold valuation and cash-for-gold service from PKV GOLD in ${contact.locationLabel}.`,
  icons: {
    icon: '/images/PKV%20LOGO.png',
    apple: '/images/PKV%20LOGO.png',
  },
  openGraph: {
    title: 'PKV GOLD | Cash for Gold in Kolathur, Chennai',
    description: `Clear gold valuation and cash-for-gold service from PKV GOLD in ${contact.locationLabel}.`,
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
