import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontFamily: 'system-ui, sans-serif',
            background: '#0a0a0a',
            color: '#f5f0e8',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <p style={{ fontSize: '5rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#c9a84c' }}>
            404
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
            Page not found
          </h1>
          <p style={{ color: '#a89060', maxWidth: '30ch' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.75rem 2rem',
              background: '#c9a84c',
              color: '#0a0a0a',
              borderRadius: '0.375rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            Back to PKV Gold →
          </Link>
        </main>
      </body>
    </html>
  );
}
