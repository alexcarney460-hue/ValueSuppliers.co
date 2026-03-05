import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, Truck, BadgeCheck, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us' };

const VALUES = [
  {
    icon: Package,
    title: 'Professional Grade, Every Time',
    desc: 'We source products built for commercial operations — not hobby kits. If it doesn\'t hold up under real workload conditions, it doesn\'t make our catalog.',
  },
  {
    icon: BadgeCheck,
    title: 'Value Without Compromise',
    desc: 'Professional grade shouldn\'t mean unaffordable. We negotiate volume pricing so you don\'t have to — and pass those savings straight through.',
  },
  {
    icon: Truck,
    title: 'Reliable Restock',
    desc: 'Running out of gloves mid-harvest is not an option. We keep deep inventory and fulfill fast so your operation never stops for supplies.',
  },
  {
    icon: Users,
    title: 'Built for Every Scale',
    desc: 'Whether you\'re a home grower ordering your first case or a licensed commercial operation running through 10,000 pairs a month — you get the same quality and service.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)' }}>

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '80px 24px 72px', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Our Story</span>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginTop: 12, lineHeight: 1.05 }}
          >
            The Supply Chain for Serious Growers.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginTop: 20, lineHeight: 1.7, maxWidth: 600, margin: '20px auto 0' }}>
            ValueSuppliers.co started with a simple observation: the grow industry was underserved on supplies.
            Quality gloves and trimming equipment existed — but not at prices that made sense for operations of every size.
          </p>
        </div>
      </section>

      {/* Mission block */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What We Do</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, marginBottom: 20, color: 'var(--color-charcoal)' }}>
              One Supplier.<br />Every Scale.
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: 16 }}>
              We supply disposable gloves and cannabis trimming equipment to retail customers, hydro stores, dispensaries, licensed grows, and commercial distributors across the country.
            </p>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: 32 }}>
              Our pricing is tiered by volume — the more you buy, the better your rate. And we make it easy to move up tiers as your operation grows.
            </p>
            <Link
              href="/catalog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--color-amber)',
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
              See All Products <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { stat: '3', label: 'Customer Tiers' },
              { stat: '100+', label: 'SKUs Available' },
              { stat: '48hr', label: 'Average Fulfillment' },
              { stat: 'NET 30', label: 'Terms Available' },
            ].map(({ stat, label }) => (
              <div
                key={label}
                style={{
                  backgroundColor: 'var(--color-sage-light)',
                  borderRadius: 16,
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: '2.5rem', color: 'var(--color-forest)', lineHeight: 1 }}
                >
                  {stat}
                </div>
                <div
                  className="label-caps"
                  style={{ color: 'var(--color-warm-gray)', marginTop: 8, fontSize: '0.7rem' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: 'var(--color-bg)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What We Stand For</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              How We Operate
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: '32px 28px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'var(--color-sage-light)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Icon size={24} color="var(--color-forest)" />
                </div>
                <h3 className="font-heading" style={{ fontSize: '1.05rem', marginBottom: 12, color: 'var(--color-charcoal)' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '72px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: 16 }}>
            Ready to Get Supplied?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 36, fontSize: '1.05rem' }}>
            Browse the catalog or apply for wholesale and distribution pricing.
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
              }}
            >
              Shop the Catalog
            </Link>
            <Link
              href="/wholesale"
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
              Wholesale Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
