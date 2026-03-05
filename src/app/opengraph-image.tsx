import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ValueSuppliers.co — Gloves for Every Industry';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1B3A2D',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Amber glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,146,42,0.22) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom-left glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Amber top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #C8922A, #E5B84A, #C8922A)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 72px',
            flex: 1,
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Top: Domain badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(200,146,42,0.18)',
                border: '1px solid rgba(200,146,42,0.4)',
                borderRadius: 8,
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#C8922A',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  color: '#C8922A',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                valuesuppliers.co
              </span>
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Eyebrow */}
            <div
              style={{
                color: '#C8922A',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'flex',
              }}
            >
              Wholesale &amp; Distribution Supplier
            </div>

            {/* Headline */}
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 76,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                marginBottom: 24,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Gloves for</span>
              <span style={{ color: '#C8922A' }}>Every Industry.</span>
            </div>

            {/* Sub */}
            <div
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 22,
                lineHeight: 1.5,
                maxWidth: 560,
                display: 'flex',
              }}
            >
              Professional-grade disposable gloves and trimming supplies.
              Case pricing for retail, wholesale, and distribution.
            </div>
          </div>

          {/* Bottom: Tier pills */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Retail', sub: 'Standard pricing' },
              { label: 'Wholesale', sub: '20% off' },
              { label: 'Distribution', sub: '30% off' },
            ].map(({ label, sub }) => (
              <div
                key={label}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '14px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{label}</span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{sub}</span>
              </div>
            ))}

            {/* Divider */}
            <div style={{ flex: 1, display: 'flex' }} />

            {/* CTA chip */}
            <div
              style={{
                backgroundColor: '#C8922A',
                borderRadius: 12,
                padding: '14px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 800, letterSpacing: '0.05em' }}>
                Shop Now →
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
