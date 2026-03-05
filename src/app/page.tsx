import Link from 'next/link';
import Image from 'next/image';
import { Truck, BadgeCheck, ArrowRight, Package } from 'lucide-react';

const TIER_CARDS = [
  {
    tier: 'Retail',
    color: 'var(--color-warm-gray)',
    headline: 'Start Small, Stock Smart',
    description: 'No minimums to start. Order by the case at competitive retail pricing.',
    cta: 'Shop Now',
    href: '/catalog',
  },
  {
    tier: 'Wholesale',
    color: 'var(--color-muted-green)',
    headline: 'Case Pricing for the Trade',
    description: 'Hydro stores, dispensaries, and grows get volume discounts and fast restock.',
    cta: 'Get Wholesale Pricing',
    href: '/wholesale',
  },
  {
    tier: 'Distribution',
    color: 'var(--color-amber)',
    headline: 'Full Distribution Programs',
    description: 'NET terms, dedicated rep, and bulk pricing for commercial operations and resellers.',
    cta: 'Apply for Distribution',
    href: '/distribution',
  },
];

const FEATURE_ITEMS = [
  { icon: Package, label: 'Case Pricing Available', sub: 'Buy by the case, save by the pallet' },
  { icon: BadgeCheck, label: 'Professional Grade', sub: 'Industrial specs for serious operations' },
  { icon: Truck, label: 'Fast Restock', sub: 'Reliable fulfillment when your supply runs low' },
];

const PRODUCT_TEASERS = [
  { category: 'Gloves', name: 'Nitrile Disposable Gloves', detail: '4 mil | XS–XXL | 100 ct / case', price: '$18.99', badge: 'Best Seller', img: '/products/product-1.avif' },
  { category: 'Gloves', name: 'Latex Exam Gloves', detail: '3 mil | S–XL | 100 ct / case', price: '$14.99', badge: null, img: '/products/product-2.avif' },
  { category: 'Gloves', name: 'Black Nitrile Gloves', detail: '4 mil | S–XXL | 100 ct / case', price: '$21.99', badge: null, img: '/products/product-3.avif' },
  { category: 'Gloves', name: 'XL Nitrile Gloves — Box', detail: 'XL | 100 ct / box', price: '$22.99', badge: null, img: '/products/product-6.avif' },
];

export default function HomePage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#fff',
          padding: '96px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span
            className="label-caps"
            style={{ color: 'var(--color-amber)', display: 'block', marginBottom: 16 }}
          >
            Gloves · Trimmers · Supplies
          </span>

          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.0, marginBottom: 24 }}
          >
            Everything Your Grow Needs.
            <br />
            <span style={{ color: 'var(--color-amber)' }}>One Supplier.</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto 40px' }}>
            Professional-grade disposable gloves and cannabis trimming equipment. Case pricing for every operation size.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/catalog"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background-color 150ms ease',
              }}
            >
              Order by the Case <ArrowRight size={16} />
            </Link>
            <Link
              href="/wholesale"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                border: '2px solid rgba(255,255,255,0.4)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 150ms ease',
              }}
            >
              Get Wholesale Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE BAR ── */}
      <section style={{ backgroundColor: 'var(--color-forest-light)', padding: '32px 24px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
          }}
        >
          {FEATURE_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff' }}>
              <Icon size={22} color="var(--color-amber)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIER CARDS ── */}
      <section style={{ backgroundColor: 'var(--color-bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>
              Shop by Program
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 8, color: 'var(--color-charcoal)' }}
            >
              Pricing Built for Your Scale
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TIER_CARDS.map((card) => (
              <div
                key={card.tier}
                className="tilt-card"
                style={{
                  backgroundColor: 'var(--color-forest)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  borderTop: `4px solid ${card.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <span
                  className="label-caps"
                  style={{ color: card.color, fontSize: '0.7rem' }}
                >
                  {card.tier}
                </span>
                <h3
                  className="font-heading"
                  style={{ color: '#fff', fontSize: '1.25rem', lineHeight: 1.3 }}
                >
                  {card.headline}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: card.color === 'var(--color-amber)' ? 'var(--color-amber)' : 'transparent',
                    border: `2px solid ${card.color}`,
                    color: card.color === 'var(--color-amber)' ? 'var(--color-forest)' : card.color,
                    padding: '10px 20px',
                    borderRadius: 8,
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}
                >
                  {card.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ backgroundColor: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="label-caps" style={{ color: 'var(--color-amber)' }}>
                Featured Products
              </span>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}
              >
                Stocked and Ready to Ship
              </h2>
            </div>
            <Link
              href="/catalog"
              style={{
                color: 'var(--color-forest)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              See All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {PRODUCT_TEASERS.map((product) => (
              <div
                key={product.name}
                className="tilt-card"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: 200, position: 'relative', backgroundColor: 'var(--color-sage-light)' }}>
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {product.badge && (
                    <span
                      className="label-caps"
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'var(--color-amber)',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: 4,
                        fontSize: '0.65rem',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '20px 20px 24px' }}>
                  <span
                    className="label-caps"
                    style={{ color: 'var(--color-amber)', fontSize: '0.65rem' }}
                  >
                    {product.category}
                  </span>
                  <h3
                    className="font-heading"
                    style={{ fontSize: '1rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)' }}
                  >
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray)', marginBottom: 16 }}>
                    {product.detail}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-charcoal)' }}
                    >
                      {product.price}
                    </span>
                    <button
                      style={{
                        backgroundColor: 'var(--color-amber)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 16px',
                        fontFamily: "'Barlow', Arial, sans-serif",
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES CALLOUT ── */}
      <section style={{ backgroundColor: 'var(--color-sage-light)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Onsite Services</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, marginBottom: 16, color: 'var(--color-charcoal)', lineHeight: 1.1 }}>
              We Also Bring the Crew.
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: 12 }}>
              Beyond supplies, we offer fully licensed and bonded onsite trimming services. Professional crews, your facility, your schedule.
            </p>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: 28 }}>
              Full compliance documentation included — licensing, insurance, and chain-of-custody records for every job.
            </p>
            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--color-forest)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Learn About Our Services <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Licensed & Bonded', sub: 'Full compliance documentation' },
              { label: 'Experienced Crews', sub: 'Trained professionals only' },
              { label: 'Flexible Scheduling', sub: 'Book by day, week, or run' },
              { label: 'We Come to You', sub: 'Fully onsite — your facility' },
            ].map(({ label, sub }) => (
              <div key={label} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 18px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE TRUST BAR ── */}
      <div
        style={{ backgroundColor: 'var(--color-amber)', padding: '14px 0', overflow: 'hidden' }}
        className="vs-marquee"
      >
        <div className="vs-marquee__track">
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              className="label-caps"
              style={{
                color: 'var(--color-forest)',
                fontSize: '0.7rem',
                padding: '0 40px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              Professional Grade &nbsp;·&nbsp; Case Pricing &nbsp;·&nbsp; Fast Restock &nbsp;·&nbsp; Wholesale Available &nbsp;·&nbsp; No Minimums to Start &nbsp;·&nbsp; Supplied for the Grow
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          backgroundColor: 'var(--color-forest)',
          padding: '80px 24px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: 16 }}
          >
            Ready to Set Up Your Account?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 36, fontSize: '1.05rem' }}>
            Apply for wholesale or distribution pricing. Get access to bulk discounts, NET terms, and a dedicated rep.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/wholesale"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Get Wholesale Pricing
            </Link>
            <Link
              href="/distribution"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                border: '2px solid rgba(255,255,255,0.35)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Apply for Distribution
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
