import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, Truck, BadgeCheck, Users } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'About Triple OG Gloves — Cannabis-Grade Black Nitrile Gloves',
  description:
    'Triple OG Gloves by ValueSuppliers.co — 5mil black nitrile exam gloves purpose-built for cannabis trimmers, growers, and commercial operations. OG energy meets professional supply.',
  openGraph: {
    title: 'About Triple OG Gloves',
    description: '5mil black nitrile gloves built for the cannabis industry. Supplied for the Grow.',
    url: 'https://valuesuppliers.co/about',
  },
  alternates: { canonical: 'https://valuesuppliers.co/about' },
};

const VALUES = [
  {
    icon: Package,
    title: 'Built for Cannabis, Not Borrowed',
    desc: "Most gloves on the market are designed for medical or food service — then slapped with a cannabis label. Triple OG is different. We built this brand from the ground up for trimmers, growers, and extraction techs.",
  },
  {
    icon: BadgeCheck,
    title: '5mil Heavy-Duty Construction',
    desc: "Trim work destroys thin gloves. Our 5mil black nitrile is thick enough to resist tears and resin buildup, with textured fingertips for precision grip — glove after glove, box after box.",
  },
  {
    icon: Truck,
    title: 'Reliable Supply, Fast Restock',
    desc: "Running out of gloves mid-harvest is not an option. We keep deep inventory and ship within 48 hours so your operation never stops waiting on supplies.",
  },
  {
    icon: Users,
    title: 'Volume Pricing for Every Operation',
    desc: "Whether you're a home grower grabbing a single box or a licensed commercial facility running through cases every week — we have a pricing tier that fits. The more you buy, the better your rate.",
  },
];

const STATS = [
  { stat: '5mil', label: 'Thickness' },
  { stat: '1,000', label: 'Gloves Per Case' },
  { stat: '48hr', label: 'Ships In' },
  { stat: '3', label: 'Pricing Tiers' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,146,42,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '3%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(27,58,45,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
            Our Story
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, color: 'var(--color-charcoal)', marginBottom: 24 }}>
            Built for the Grow. Worn by the OGs.
          </h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Triple OG Gloves exist because the cannabis industry deserved its own glove brand — not hand-me-downs from medical supply catalogs.
            Purpose-built 5mil black nitrile for trimmers, growers, and commercial operations. Supplied for the Grow.
          </p>
        </div>
      </section>

      {/* Mission block */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '80px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <AnimateIn>
            <span className="label-caps" style={{ color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
              What We Do
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 14, marginBottom: 20, color: 'var(--color-charcoal)', lineHeight: 1.05 }}>
              The Cannabis Industry&apos;s<br />Glove Brand.
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 16, fontSize: '0.95rem' }}>
              Triple OG Gloves is the premium black nitrile glove brand built specifically for cannabis operations. Our 5mil exam gloves are powder-free, latex-free, and feature textured fingertips — engineered for the precision and durability that trim work demands.
            </p>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 36, fontSize: '0.95rem' }}>
              Sold by the box (100 pcs) or by the case (1,000 pcs), with volume pricing that scales as your operation grows. From home grows to licensed facilities — Triple OG has you covered.
            </p>
            <Link
              href="/catalog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-amber)',
              }}
            >
              See All Products <ArrowRight size={14} />
            </Link>
          </AnimateIn>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {STATS.map(({ stat, label }, i) => (
              <AnimateIn key={label} delay={i * 80}>
                <div
                  className="tilt-card"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: '32px 24px',
                    textAlign: 'center',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div className="font-display" style={{ fontSize: '2.25rem', color: 'var(--color-forest)', lineHeight: 1 }}>{stat}</div>
                  <div className="label-caps" style={{ color: 'var(--color-warm-gray)', marginTop: 8, fontSize: '0.68rem' }}>{label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: '#fff', padding: '80px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What We Stand For</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              The Triple OG Standard
            </h2>
          </AnimateIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <AnimateIn key={title} delay={i * 90}>
                <div
                  className="tilt-card"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: '32px 28px',
                    border: '1px solid var(--color-border)',
                    height: '100%',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ width: 48, height: 48, backgroundColor: 'var(--color-sage-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={24} color="var(--color-forest)" />
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1.05rem', marginBottom: 12, color: 'var(--color-charcoal)' }}>{title}</h3>
                  <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="vs-dot-grid"
        style={{ backgroundColor: 'var(--color-forest)', padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: 'rgba(200,146,42,0.09)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <AnimateIn style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: 16 }}>
            Ready to Gear Up?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 40, fontSize: '1.05rem', lineHeight: 1.75 }}>
            Browse the Triple OG catalog or apply for wholesale and distribution pricing on cases.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/catalog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-amber)',
              }}
            >
              Shop Triple OG <ArrowRight size={14} />
            </Link>
            <Link
              href="/wholesale"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 9999,
                border: '1.5px solid rgba(255,255,255,0.28)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Wholesale Pricing
            </Link>
          </div>
        </AnimateIn>
      </section>

    </div>
  );
}
