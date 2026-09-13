import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PKV Gold — Know Your Gold. Know Your Value.',
  description: 'Private gold valuation with precision, clarity, and dignity in Kolathur, Chennai.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
