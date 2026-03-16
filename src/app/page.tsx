import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, BadgeCheck, ArrowRight, Package, ChevronRight } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'Professional Gloves & Cannabis Trimming Supplies — Buy by the Case',
  description:
    'ValueSuppliers.co: professional-grade nitrile, latex, and vinyl disposable gloves and cannabis trimming equipment. No minimums. Wholesale 20% off · Distribution 30% off. Serving cannabis, food service, medical, and industrial industries nationwide.',
  alternates: { canonical: 'https://valuesuppliers.co' },
  openGraph: {
    title: 'ValueSuppliers.co — Professional Gloves & Cannabis Trimming Supplies',
    description: 'Case pricing for retail, wholesale, and distribution. Nitrile, latex, vinyl gloves and cannabis trimming tools. No minimums to start.',
    url: 'https://valuesuppliers.co',
  },
};

const TIER_CARDS = [
  {
    tier: 'Retail',
    color: 'var(--color-warm-gray)',
    accentBg: '#F7F7F6',
    headline: 'Start Small, Stock Smart',
    description: 'No minimums to start. Order by the case at competitive retail pricing.',
    cta: 'Shop Now',
    href: '/catalog',
  },
  {
    tier: 'Wholesale',
    color: 'var(--color-muted-green)',
    accentBg: '#EDF7F0',
    headline: 'Case Pricing for the Trade',
    description: 'Hydro stores, dispensaries, and grows get volume discounts and fast restock.',
    cta: 'Get Wholesale Pricing',
    href: '/wholesale',
  },
  {
    tier: 'Distribution',
    color: 'var(--color-amber)',
    accentBg: '#FDF6E8',
    headline: 'Full Distribution Programs',
    description: 'NET terms, dedicated rep, and bulk pricing for commercial operations and resellers.',
    cta: 'Apply for Distribution',
    href: '/distribution',
  },
];

const FEATURE_ITEMS = [
  { icon: Package, label: 'Case Pricing Available', sub: 'Buy by the case, save by the pallet' },
  { icon: BadgeCheck, label: 'Professional Grade', sub: 'Industrial specs for serious operations' },
  { icon: Truck, label: 'Fast Restock', sub: 'Reliable fulfillment when you run low' },
];

const PRODUCT_TEASERS = [
  { slug: 'nitrile-5mil-box', category: 'Gloves', name: '5 mil Nitrile Gloves — Box', detail: '5 mil · S–XXL · 100 gloves', price: '$10.00', badge: null, img: '/products/product-5.avif' },
  { slug: 'nitrile-5mil-case', category: 'Gloves', name: '5 mil Nitrile Gloves — Case', detail: '10 boxes · 1,000 gloves', price: '$80.00', badge: 'Best Value', img: '/products/product-3.avif' },
];

const SERVICE_FEATURES = [
  { label: 'Licensed & Bonded', sub: 'Full compliance documentation' },
  { label: 'Experienced Crews', sub: 'Trained professionals only' },
  { label: 'Flexible Scheduling', sub: 'Book by day, week, or run' },
  { label: 'We Come to You', sub: 'Fully onsite — your facility' },
];

const FAQ_ITEMS = [
  {
    q: 'What types of gloves do you carry?',
    a: 'We stock nitrile, latex exam-grade, vinyl, and black nitrile gloves — all 5 mil thickness — in sizes XS through XXL. All gloves are powder-free, latex-free options available, and sold by the 100-count case. Wholesale and distribution pricing available.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'There is no minimum order for retail customers — order as few or as many cases as you need. Wholesale accounts require an approved application and typically reorder 5+ cases per month to maintain pricing. Distribution accounts are for commercial operations placing large recurring orders.',
  },
  {
    q: 'How much do wholesale accounts save?',
    a: 'Wholesale accounts save 20% off retail pricing on every product, every order. Distribution accounts save 30% off retail. Both tiers include priority fulfillment and dedicated account support. Apply online — approval typically within 1 business day.',
  },
  {
    q: 'Do you ship to all 50 states?',
    a: 'Yes, we ship to all 48 contiguous states. Orders are processed within 1–2 business days and ship via ground freight for case quantities. Wholesale and distribution accounts can arrange scheduled restock deliveries.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Our primary customers are cannabis cultivation, trimming, and processing operations. We also serve food service, medical and dental (non-sterile), janitorial, automotive, tattoo studios, laboratories, and general manufacturing. Our gloves meet ASTM industrial and exam-grade certifications.',
  },
  {
    q: 'Do you offer onsite cannabis trimming services?',
    a: 'Yes. In addition to supplying equipment, we provide fully licensed and bonded onsite trimming crews. Professional teams work at your facility on your schedule. Full compliance documentation — licensing, insurance, and chain-of-custody records — is included on every job.',
  },
  {
    q: 'Can I get a custom quote for a large order?',
    a: 'Absolutely. Contact us at orders@valuesuppliers.co with your product needs, quantity, and delivery frequency. We provide custom volume pricing for operations outside our standard retail/wholesale/distribution tiers.',
  },
];

const STATS = [
  { value: '500+', label: 'Operations Served' },
  { value: '15+', label: 'Products In Stock' },
  { value: '48',  label: 'States Served' },
  { value: '1-2d', label: 'Processing Time' },
];

export default function HomePage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff' }}>

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
                fontSize: '0.68rem',
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

      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: '#fff',
          padding: '72px 24px 88px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Logo watermark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '4%',
            opacity: 0.03,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <Image src="/logo.jpg" alt="" width={600} height={220} style={{ objectFit: 'contain', width: 'clamp(300px, 40vw, 580px)', height: 'auto' }} />
        </div>

        {/* Ambient glow blobs */}
        <div className="vs-glow-amber" style={{ width: 520, height: 520, top: '-20%', right: '6%', background: 'rgba(200,146,42,0.07)' }} />
        <div className="vs-glow-amber" style={{ width: 280, height: 280, bottom: '-5%', left: '4%', background: 'rgba(27,58,45,0.05)' }} />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
          className="vs-hero-grid"
        >
          {/* Left: Text */}
          <div>
            <span
              className="label-caps vs-fade-up"
              style={{ color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
            >
              <span style={{ width: 28, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
              Gloves · Trimmers · Supplies
            </span>

            <h1
              className="font-display vs-fade-up-1"
              style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)', lineHeight: 0.93, marginBottom: 26, letterSpacing: '-0.01em', color: 'var(--color-charcoal)' }}
            >
              Everything Your
              <br />
              Grow Needs.
              <br />
              <span className="vs-gradient-text">One Supplier.</span>
            </h1>

            <p
              className="vs-fade-up-2"
              style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', maxWidth: 420, lineHeight: 1.8, marginBottom: 40 }}
            >
              Professional-grade disposable gloves and cannabis trimming equipment.
              Case pricing for every operation size — no minimums to start.
            </p>

            <div className="vs-fade-up-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/catalog"
                className="vs-btn-amber"
                style={{
                  backgroundColor: 'var(--color-amber)',
                  color: '#fff',
                  padding: '14px 30px',
                  borderRadius: 9999,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: 'var(--shadow-amber)',
                }}
              >
                Order by the Case <ArrowRight size={14} />
              </Link>
              <Link
                href="/wholesale"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-charcoal)',
                  padding: '14px 30px',
                  borderRadius: 9999,
                  border: '1.5px solid var(--color-border)',
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'border-color 150ms ease, color 150ms ease',
                }}
              >
                Wholesale Pricing
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="vs-fade-up-4"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gap: '0 28px',
                marginTop: 48,
                paddingTop: 36,
                borderTop: '1px solid var(--color-border)',
                width: 'fit-content',
              }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className={`vs-stat vs-stat-${i + 1}`}>
                  <div
                    className="font-mono"
                    style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-charcoal)', lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', marginTop: 4, whiteSpace: 'nowrap' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product image card */}
          <div style={{ position: 'relative' }} className="vs-hero-image-col">
            {/* Amber glow halo */}
            <div
              style={{
                position: 'absolute',
                inset: '-18%',
                borderRadius: '50%',
                background: 'rgba(200,146,42,0.12)',
                filter: 'blur(72px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Floating product card — gentle bob */}
            <div className="vs-float" style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="tilt-card vs-img-shine"
                style={{
                  backgroundColor: 'var(--color-sage-light)',
                  borderRadius: 28,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  position: 'relative',
                  boxShadow: 'var(--shadow-xl)',
                }}
              >
                <Image
                  src="/products/product-5.avif"
                  alt="Professional Nitrile Gloves"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Floating info badge */}
              <div
                className="vs-float-badge vs-fade-up-2"
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: -24,
                  zIndex: 2,
                  minWidth: 210,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: 'var(--color-sage-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <BadgeCheck size={18} color="var(--color-muted-green)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>Best Seller</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--color-warm-gray)', marginTop: 1 }}>5 mil Nitrile — from $10.00/box</div>
                </div>
              </div>

              {/* Top chip */}
              <div
                className="vs-fade-up-1"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: -16,
                  zIndex: 2,
                  backgroundColor: 'var(--color-forest)',
                  color: '#fff',
                  borderRadius: 9999,
                  padding: '7px 16px',
                  fontSize: '0.72rem',
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: 'var(--shadow-forest)',
                }}
              >
                100 ct / case
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE BAR ── */}
      <section style={{ backgroundColor: '#F8FAF8', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '32px 24px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 56,
            flexWrap: 'wrap',
          }}
        >
          {FEATURE_ITEMS.map(({ icon: Icon, label, sub }, i) => (
            <AnimateIn key={label} delay={i * 90} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="vs-icon-circle">
                <Icon size={20} color="var(--color-amber)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>{label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginTop: 2 }}>{sub}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── TIER CARDS ── */}
      <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>
              Shop by Program
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--color-charcoal)' }}
            >
              Pricing Built for Your Scale
            </h2>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TIER_CARDS.map((card, i) => (
              <AnimateIn key={card.tier} delay={i * 110}>
                <div
                  className="tilt-card"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 20,
                    padding: '36px 28px 32px',
                    borderTop: `4px solid ${card.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    height: '100%',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: card.accentBg,
                      borderRadius: 9999,
                      padding: '4px 14px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <span className="label-caps" style={{ color: card.color, fontSize: '0.65rem' }}>
                      {card.tier}
                    </span>
                  </div>
                  <h3
                    className="font-heading"
                    style={{ color: 'var(--color-charcoal)', fontSize: '1.2rem', lineHeight: 1.3 }}
                  >
                    {card.headline}
                  </h3>
                  <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.88rem', lineHeight: 1.75, flex: 1 }}>
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: card.color === 'var(--color-amber)' ? 'var(--color-amber)' : 'transparent',
                      border: `1.5px solid ${card.color}`,
                      color: card.color === 'var(--color-amber)' ? '#fff' : card.color,
                      padding: '10px 22px',
                      borderRadius: 9999,
                      fontFamily: "'Barlow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      alignSelf: 'flex-start',
                      transition: 'background-color 150ms ease, color 150ms ease',
                    }}
                    className="vs-card-arrow"
                  >
                    {card.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-amber)' }}>
                Featured Products
              </span>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}
              >
                Stocked and Ready to Ship
              </h2>
            </div>
            <Link
              href="/catalog"
              style={{
                color: 'var(--color-forest)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'Barlow', Arial, sans-serif",
                padding: '8px 18px',
                borderRadius: 9999,
                border: '1.5px solid var(--color-border)',
                transition: 'border-color 150ms ease',
              }}
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {PRODUCT_TEASERS.map((product, i) => (
              <AnimateIn key={product.slug} delay={i * 90}>
                <Link href={`/catalog/${product.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    className="tilt-card"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 20,
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-xs)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className="vs-img-shine" style={{ height: 214, position: 'relative', backgroundColor: 'var(--color-sage-light)', flexShrink: 0 }}>
                      {/* Amber glow under image */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(200,146,42,0.10) 0%, transparent 70%)',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }}
                      />
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {product.badge && (
                        <span
                          className="label-caps vs-badge-pulse"
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: 'var(--color-amber)',
                            color: '#fff',
                            padding: '5px 12px',
                            borderRadius: 9999,
                            fontSize: '0.62rem',
                            zIndex: 2,
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.62rem' }}>
                        {product.category}
                      </span>
                      <h3 className="font-heading" style={{ fontSize: '1rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)' }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginBottom: 'auto', paddingBottom: 18 }}>
                        {product.detail}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
                        <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                          {product.price}
                        </span>
                        <span
                          className="vs-card-arrow label-caps"
                          style={{
                            color: 'var(--color-forest)',
                            fontSize: '0.68rem',
                          }}
                        >
                          View <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES CALLOUT ── */}
      <section style={{ backgroundColor: '#fff', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>
          <AnimateIn>
            <span className="label-caps" style={{ color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
              Onsite Services
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 14, marginBottom: 20, color: 'var(--color-charcoal)', lineHeight: 1.05 }}>
              We Also Bring the Crew.
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 12, fontSize: '0.95rem' }}>
              Beyond supplies, we offer fully licensed and bonded onsite trimming services. Professional crews, your facility, your schedule.
            </p>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 36, fontSize: '0.95rem' }}>
              Full compliance documentation included — licensing, insurance, and chain-of-custody records for every job.
            </p>
            <Link
              href="/services"
              className="vs-btn-forest"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--color-forest)',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Learn About Services <ArrowRight size={14} />
            </Link>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {SERVICE_FEATURES.map(({ label, sub }, i) => (
              <AnimateIn key={label} delay={i * 80}>
                <div
                  style={{
                    backgroundColor: '#FAFAFA',
                    borderRadius: 16,
                    padding: '22px 20px',
                    border: '1px solid var(--color-border)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      backgroundColor: 'var(--color-sage-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <BadgeCheck size={15} color="var(--color-muted-green)" />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', lineHeight: 1.5 }}>{sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ── */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.65rem', marginBottom: 36 }}>
            Trusted Partners
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
            {[
              { n: 1, alt: 'Cannabis industry supply partner' },
              { n: 2, alt: 'Professional glove distribution partner' },
              { n: 3, alt: 'Commercial grow operation partner' },
            ].map(({ n, alt }) => (
              <div
                key={n}
                className="vs-partner-logo"
                style={{
                  height: 72,
                  width: 160,
                  position: 'relative',
                  opacity: 0.5,
                  filter: 'grayscale(100%)',
                  transition: 'opacity 200ms ease, filter 200ms ease',
                }}
              >
                <Image
                  src={`/partners/partner-${n}.avif`}
                  alt={alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="160px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Common Questions</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ_ITEMS.map((item, i) => (
              <AnimateIn key={item.q} delay={i * 60}>
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 16,
                    padding: '24px 28px',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ChevronRight size={16} color="var(--color-amber)" style={{ marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <h3 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 8, lineHeight: 1.3 }}>
                        {item.q}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)', lineHeight: 1.75, margin: 0 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-warm-gray)' }}>
              Have a different question?{' '}
              <Link href="/contact" style={{ color: 'var(--color-forest)', fontWeight: 700, textDecoration: 'none' }}>
                Contact us →
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      {/* ── CTA BANNER ── */}
      <section
        className="vs-dot-grid"
        style={{
          backgroundColor: 'var(--color-forest)',
          padding: '100px 24px',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          className="vs-glow-amber"
          style={{ width: 640, height: 400, top: '-30%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(200,146,42,0.09)' }}
        />

        <AnimateIn style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="label-caps" style={{ color: 'rgba(200,146,42,0.85)', display: 'block', marginBottom: 20 }}>
            Get Started Today
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.25rem)', marginBottom: 20, lineHeight: 1.0 }}
          >
            Ready to Set Up Your Account?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 44, fontSize: '1.05rem', lineHeight: 1.75 }}>
            Apply for wholesale or distribution pricing. Get access to bulk discounts, NET terms, and a dedicated rep.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/wholesale"
              className="vs-btn-amber"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '15px 34px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: 'var(--shadow-amber)',
              }}
            >
              Get Wholesale Pricing <ArrowRight size={14} />
            </Link>
            <Link
              href="/distribution"
              className="vs-btn-ghost"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '15px 34px',
                borderRadius: 9999,
                border: '1.5px solid rgba(255,255,255,0.28)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Apply for Distribution
            </Link>
          </div>
        </AnimateIn>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vs-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .vs-hero-image-col {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .vs-stat-row {
            grid-template-columns: repeat(2, auto) !important;
          }
        }
      `}</style>
    </div>
  );
}
