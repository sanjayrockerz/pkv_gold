import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PKV Gold - Cash for Gold in Kolathur, Chennai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '72px 84px',
          background: 'linear-gradient(120deg, #fffdf8 0%, #f3e4bd 55%, #164a37 100%)',
          color: '#164a37',
          fontFamily: 'Arial',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: 48,
              background: '#164a37',
              color: '#f3cf78',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            PKV
          </div>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, letterSpacing: 5 }}>
            PKV GOLD
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            Cash for Gold in Kolathur, Chennai
          </div>
          <div style={{ display: 'flex', color: '#315b49', fontSize: 30 }}>
            Clear valuation. Transparent process. Trusted local service.
          </div>
        </div>
        <div style={{ display: 'flex', color: '#f3cf78', fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
          PKVGOLD.COM
        </div>
      </div>
    ),
    { ...size },
  );
}
