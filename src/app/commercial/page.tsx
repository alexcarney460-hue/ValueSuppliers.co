import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, BadgeCheck, ArrowRight, Package, ChevronRight, Shield, Building2, Utensils, Stethoscope, Wrench, Beaker, Leaf } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import COMMERCIAL_PRODUCTS, { type CommercialProduct } from '@/lib/commercial-products';
import CommercialProductCard from './CommercialProductCard';

export const metadata: Metadata = {
  title: 'Commercial Disposable Gloves — Nitrile, Latex & Vinyl | Bulk Pricing',
  description:
    'Full catalog of nitrile, latex, and vinyl disposable gloves for food service, medical, janitorial, automotive, cannabis, and industrial use. 19 SKUs from 3mil to 8mil. Case pricing with fast nationwide shipping.',
  keywords: ['commercial disposable gloves', 'bulk nitrile gloves', 'food service gloves', 'medical exam gloves', 'industrial gloves bulk', 'vinyl gloves', 'latex gloves', 'diamond grip gloves', '8mil nitrile'],
  alternates: { canonical: 'https://valuesuppliers.co/commercial' },
  openGraph: {
    title: 'Commercial Disposable Gloves — Nitrile, Latex & Vinyl',
    description: '19 SKUs from 3mil to 8mil. Nitrile, latex, and vinyl gloves for every industry. Bulk case pricing with volume discounts.',
    url: 'https://valuesuppliers.co/commercial',
    type: 'website',
    siteName: 'Value Suppliers',
    images: [
      {
        url: 'https://valuesuppliers.co/og-commercial.jpg',
        width: 1200,
        height: 630,
        alt: 'Value Suppliers commercial disposable gloves — nitrile, latex, and vinyl in bulk cases',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Disposable Gloves — Nitrile, Latex & Vinyl | Value Suppliers',
    description: '19 SKUs from 3mil to 8mil. Bulk case pricing with volume discounts for every industry.',
    images: ['https://valuesuppliers.co/og-commercial.jpg'],
  },
};

const INDUSTRIES = [
  { icon: Utensils, name: 'Food Service', desc: 'Restaurants, catering, delis, and food processing', color: '#E65100' },
  { icon: Stethoscope, name: 'Medical & Dental', desc: 'Clinics, offices, and exam-grade applications', color: '#1565C0' },
  { icon: Building2, name: 'Janitorial & Facilities', desc: 'Commercial cleaning, maintenance, and sanitation', color: '#2E7D32' },
  { icon: Wrench, name: 'Automotive & Trades', desc: 'Mechanics, body shops, painting, and detailing', color: '#37474F' },
  { icon: Beaker, name: 'Laboratory & Research', desc: 'Scientific, quality control, and testing environments', color: '#6A1B9A' },
  { icon: Shield, name: 'Safety & Compliance', desc: 'Hazmat handling, industrial safety, and PPE programs', color: '#C62828' },
  { icon: Leaf, name: 'Cannabis & Cultivation', desc: 'Trimming, processing, and grow operations', color: '#388E3C' },
];

const PRICING_CHART = [
  { sku: 'GP30/31/32/33', desc: '3.5mil Nitrile (Colors)', perBox: '$49.99', perCase: '$399.99', wholesale: '$349.99', distributor: '$299.99', glovesBox: '100', color: '#7B1FA2' },
  { sku: 'Dental Mates', desc: '4mil Nitrile Exam', perBox: '$35.00', perCase: '$299.00', wholesale: '$259.00', distributor: '$219.00', glovesBox: '100', color: '#1565C0' },
  { sku: 'GP40', desc: '4mil Nitrile Blue', perBox: '$54.99', perCase: '$449.99', wholesale: '$389.99', distributor: '$339.99', glovesBox: '100', color: '#1565C0' },
  { sku: 'Super Thin', desc: '4mil Surgeon Grade', perBox: '$39.99', perCase: '$319.00', wholesale: '$279.00', distributor: '$239.00', glovesBox: '100', color: '#0277BD' },
  { sku: 'GP50', desc: '5mil Nitrile Black', perBox: '$59.99', perCase: '$479.99', wholesale: '$419.99', distributor: '$359.99', glovesBox: '100', color: '#212121' },
  { sku: 'GP51', desc: '5.5mil Nitrile Black', perBox: '$63.99', perCase: '$489.99', wholesale: '$429.99', distributor: '$369.99', glovesBox: '100', color: '#212121' },
  { sku: 'GP63', desc: '6mil Nitrile Black', perBox: '$69.99', perCase: '$529.99', wholesale: '$459.99', distributor: '$399.99', glovesBox: '100', color: '#212121' },
  { sku: 'GP66/67/68', desc: '8mil Diamond Grip (3 Colors)', perBox: '$119.99', perCase: '$939.99', wholesale: '$819.99', distributor: '$699.99', glovesBox: '50', color: '#E65100' },
  { sku: '3mil Purple', desc: '3mil Nitrile 200ct', perBox: '$79.00', perCase: '$699.00', wholesale: '$599.00', distributor: '$499.00', glovesBox: '200', color: '#7B1FA2' },
  { sku: 'GP35', desc: '3.5mil Blue 250ct', perBox: '$119.99', perCase: '$969.00', wholesale: '$849.00', distributor: '$749.00', glovesBox: '250', color: '#1565C0' },
  { sku: 'Latex Exam', desc: '5.6mil Polymer Coated', perBox: '$52.22', perCase: '$489.00', wholesale: '$429.00', distributor: '$369.00', glovesBox: '100', color: '#F9A825' },
  { sku: 'GP36/37/38', desc: 'Vinyl (Blue/Black/Clear)', perBox: '$54.99', perCase: '$409.99', wholesale: '$359.99', distributor: '$309.99', glovesBox: '100', color: '#546E7A' },
];

const TIER_CARDS = [
  {
    tier: 'Retail',
    color: 'var(--color-warm-gray)',
    accentBg: '#F7F7F6',
    headline: 'Order What You Need',
    description: 'Per-box and per-case pricing for 1–29 cases. No application needed — perfect for small businesses and offices.',
    cta: 'Shop Now',
    href: '#products',
  },
  {
    tier: 'Wholesale',
    color: 'var(--color-muted-green)',
    accentBg: '#EDF7F0',
    headline: 'Volume Discounts',
    description: 'Save 10–15% per case on 30+ case orders. Priority fulfillment and fast restock.',
    cta: 'Get Wholesale Pricing',
    href: '/wholesale',
  },
  {
    tier: 'Distribution',
    color: 'var(--color-amber)',
    accentBg: '#FDF6E8',
    headline: 'Enterprise Programs',
    description: 'Save 20–25% per case on 120+ case orders. Dedicated rep, priority allocation, and bulk freight pricing.',
    cta: 'Apply for Distribution',
    href: '/distribution',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What types of gloves do you carry?',
    a: 'We carry 19 SKUs across nitrile (3mil to 8mil in purple, blue, pink, rose red, black, green, and orange), latex exam-grade (5.6mil polymer-coated), and vinyl (blue, black, clear). All gloves are powder-free and available in sizes XS through XXL.',
  },
  {
    q: 'What certifications do your gloves have?',
    a: 'Our nitrile and latex gloves are ASTM-certified for industrial and exam-grade use (ASTM D6319 and ASTM D3578). The GP51 is approved for chemo and fentanyl protection. Vinyl gloves meet FDA food-contact requirements. All products carry an AQL rating of 1.5–2.5.',
  },
  {
    q: 'Is there a minimum order?',
    a: 'No minimum — buy a single box or a full case. Retail pricing applies to 1–29 cases. Wholesale accounts (30+ cases) and distribution accounts (120+ cases) unlock deeper volume discounts.',
  },
  {
    q: 'What are your shipping rates?',
    a: 'Free shipping on all orders over $200. Under $200, shipping is calculated by weight starting at $7.99. We automatically select the cheapest carrier rate and ship to all 48 contiguous states with 1–2 day processing.',
  },
  {
    q: 'Do you offer custom quotes for businesses?',
    a: 'Distribution accounts get custom case-based quotes with a dedicated rep. Contact us at admin@valuesuppliersdirect.com for pricing on large or recurring orders.',
  },
  {
    q: 'What is the difference between 3.5mil and 8mil gloves?',
    a: 'Thinner gloves (3–4mil) offer better tactile sensitivity and are ideal for food handling, medical exams, and light tasks. Thicker gloves (5–8mil) provide superior puncture, chemical, and grease resistance for heavy industrial, automotive, and hazmat applications. The 8mil diamond grip adds raised texture for maximum grip.',
  },
];

const STATS = [
  { value: '19', label: 'Product SKUs' },
  { value: '3–8', label: 'Mil Range' },
  { value: '48',  label: 'States Shipped' },
  { value: '1-2d', label: 'Processing Time' },
];

const FEATURE_ITEMS = [
  { icon: Package, label: 'Bulk Case Pricing', sub: 'Volume discounts that scale with your business' },
  { icon: BadgeCheck, label: 'ASTM & FDA Certified', sub: 'Industrial, exam, and food-grade certifications' },
  { icon: Truck, label: 'Fast Shipping', sub: 'Best-rate carriers to all 48 states' },
];

const nitrileProducts = COMMERCIAL_PRODUCTS.filter(p => p.category === 'Nitrile');
const latexProducts = COMMERCIAL_PRODUCTS.filter(p => p.category === 'Latex');
const vinylProducts = COMMERCIAL_PRODUCTS.filter(p => p.category === 'Vinyl');

export default function CommercialPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff' }}>

      {/* MARQUEE TRUST BAR */}
      <div
        role="marquee"
        aria-label="Product highlights: 19 SKUs in stock, 3mil to 8mil thickness, ASTM and FDA certified, bulk case pricing, fast 48-state shipping"
        style={{ backgroundColor: '#1C1C1C', padding: '14px 0', overflow: 'hidden' }}
        className="vs-marquee"
      >
        <div className="vs-marquee__track">
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              className="label-caps"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.68rem',
                padding: '0 40px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              19 SKUs In Stock &nbsp;·&nbsp; 3mil to 8mil Thickness &nbsp;·&nbsp; Nitrile · Latex · Vinyl &nbsp;·&nbsp; ASTM & FDA Certified &nbsp;·&nbsp; Bulk Case Pricing &nbsp;·&nbsp; Fast 48-State Shipping &nbsp;·&nbsp; Volume Discounts Available
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section
        style={{
          backgroundColor: '#fff',
          padding: '72px 24px 88px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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

        <div className="vs-glow-amber" style={{ width: 520, height: 520, top: '-20%', right: '6%', background: 'rgba(28,28,28,0.05)' }} />
        <div className="vs-glow-amber" style={{ width: 280, height: 280, bottom: '-5%', left: '4%', background: 'rgba(28,28,28,0.04)' }} />

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
          <div>
            <span
              className="label-caps vs-fade-up"
              style={{ color: '#1565C0', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
            >
              <span style={{ width: 28, height: 1.5, backgroundColor: '#1565C0', display: 'inline-block', borderRadius: 99 }} />
              Commercial &amp; Industrial Supply
            </span>

            <h1
              className="font-display vs-fade-up-1"
              style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)', lineHeight: 0.93, marginBottom: 26, letterSpacing: '-0.01em', color: 'var(--color-charcoal)' }}
            >
              19 SKUs.
              <br />
              Every Thickness.
              <br />
              <span style={{ color: '#1565C0' }}>Every Industry.</span>
            </h1>

            <p
              className="vs-fade-up-2"
              style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', maxWidth: 440, lineHeight: 1.8, marginBottom: 40 }}
            >
              Nitrile, latex, and vinyl disposable gloves from 3mil to 8mil.
              FDA and ASTM certified. Bulk case pricing for food service, medical,
              automotive, cannabis, and industrial operations.
            </p>

            <div className="vs-fade-up-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href="#products"
                className="vs-btn-amber"
                style={{
                  backgroundColor: '#1565C0',
                  color: '#fff',
                  padding: '14px 30px',
                  borderRadius: 9999,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(21,101,192,0.25)',
                }}
              >
                View Full Catalog <ArrowRight size={14} />
              </a>
              <a
                href="#pricing"
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
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Pricing Chart
              </a>
            </div>

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

          <div style={{ position: 'relative' }} className="vs-hero-image-col">
            <div
              style={{
                position: 'absolute',
                inset: '-18%',
                borderRadius: '50%',
                background: 'rgba(21,101,192,0.08)',
                filter: 'blur(72px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

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
                  src="/products/gp/gp66-black-8mil.jpg"
                  alt="GP66 Heavy Duty 8mil Diamond Grip Nitrile Gloves"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

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
                    backgroundColor: '#E3F2FD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Shield size={18} color="#1565C0" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>ASTM & FDA Certified</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--color-warm-gray)', marginTop: 1 }}>Industrial, Exam &amp; Food Grade</div>
                </div>
              </div>

              <div
                className="vs-fade-up-1"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: -16,
                  zIndex: 2,
                  backgroundColor: '#1565C0',
                  color: '#fff',
                  borderRadius: 9999,
                  padding: '7px 16px',
                  fontSize: '0.72rem',
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  boxShadow: '0 4px 16px rgba(21,101,192,0.3)',
                }}
              >
                19 Products In Stock
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BAR */}
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
                <Icon size={20} color="#1565C0" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>{label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginTop: 2 }}>{sub}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── PRICING CHART ─────────────────────────────────────────────── */}
      <section id="pricing" aria-label="Pricing chart for all disposable glove products" style={{ backgroundColor: '#fff', padding: '96px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label-caps" style={{ color: '#1565C0' }}>
              Transparent Pricing
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--color-charcoal)' }}
            >
              Complete Pricing Chart
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem', marginTop: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              All prices shown per box (retail) and per case (10 boxes). Volume discounts unlock automatically at 30+ and 120+ cases.
            </p>
          </AnimateIn>

          <AnimateIn>
            <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800, fontSize: '0.85rem' }}>
                <caption style={{ captionSide: 'top', textAlign: 'left', padding: '0 0 12px', fontSize: '0.78rem', color: 'var(--color-warm-gray)', fontStyle: 'italic' }}>
                  Pricing for all 19 disposable glove SKUs across retail, wholesale, and distributor tiers
                </caption>
                <thead>
                  <tr style={{ backgroundColor: '#1C1C1C' }}>
                    <th scope="col" style={{ ...thStyle, borderTopLeftRadius: 15 }}>Product</th>
                    <th scope="col" style={thStyle}>Description</th>
                    <th scope="col" style={thStyle}>Ct/Box</th>
                    <th scope="col" style={thStyle}>Per Box</th>
                    <th scope="col" style={{ ...thStyle, backgroundColor: 'rgba(21,101,192,0.15)' }}>Per Case (10)</th>
                    <th scope="col" style={{ ...thStyle, backgroundColor: 'rgba(46,125,50,0.15)' }}>Wholesale (30+)</th>
                    <th scope="col" style={{ ...thStyle, borderTopRightRadius: 15, backgroundColor: 'rgba(200,146,42,0.15)' }}>Distributor (120+)</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_CHART.map((row, i) => (
                    <tr
                      key={row.sku}
                      style={{
                        backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <th scope="row" style={{ ...tdStyle, fontWeight: 700 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: row.color, marginRight: 8, flexShrink: 0 }} aria-hidden="true" />
                        {row.sku}
                      </th>
                      <td style={{ ...tdStyle, color: 'var(--color-warm-gray)' }}>{row.desc}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{row.glovesBox}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace" }}>{row.perBox}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, backgroundColor: i % 2 === 0 ? 'rgba(21,101,192,0.04)' : 'rgba(21,101,192,0.07)' }}>{row.perCase}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: '#2E7D32', backgroundColor: i % 2 === 0 ? 'rgba(46,125,50,0.04)' : 'rgba(46,125,50,0.07)' }}>{row.wholesale}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#8B6914', backgroundColor: i % 2 === 0 ? 'rgba(200,146,42,0.04)' : 'rgba(200,146,42,0.07)' }}>{row.distributor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateIn>

          <AnimateIn style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--color-warm-gray)', padding: '6px 14px', backgroundColor: '#FAFAFA', borderRadius: 9999, border: '1px solid var(--color-border)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1565C0' }} aria-hidden="true" /> Per Case = 10 boxes
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#2E7D32', padding: '6px 14px', backgroundColor: 'rgba(46,125,50,0.06)', borderRadius: 9999, border: '1px solid rgba(46,125,50,0.15)' }}>
              Wholesale = 30+ cases (save 10–15%)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#8B6914', padding: '6px 14px', backgroundColor: 'rgba(200,146,42,0.06)', borderRadius: 9999, border: '1px solid rgba(200,146,42,0.15)' }}>
              Distributor = 120+ cases (save 20–25%)
            </span>
          </AnimateIn>
        </div>
      </section>

      {/* ─── FULL PRODUCT CATALOG ─────────────────────────────────────── */}
      <section id="products" style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Nitrile */}
          <AnimateIn style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span className="label-caps" style={{ color: '#1565C0' }}>Nitrile Gloves</span>
                <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
                  15 Nitrile SKUs — 3mil to 8mil
                </h2>
              </div>
              <a
                href="#products"
                style={{
                  color: '#1565C0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  padding: '6px 14px',
                  borderRadius: 9999,
                  border: '1.5px solid var(--color-border)',
                }}
              >
                View All <ArrowRight size={13} />
              </a>
            </div>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 64 }}>
            {nitrileProducts.map((p, i) => (
              <CommercialProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {/* Latex */}
          <AnimateIn style={{ marginBottom: 32 }}>
            <div>
              <span className="label-caps" style={{ color: '#F9A825' }}>Latex Gloves</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
                Exam-Grade Latex — Polymer Coated
              </h2>
            </div>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 64 }}>
            {latexProducts.map((p, i) => (
              <CommercialProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {/* Vinyl */}
          <AnimateIn style={{ marginBottom: 32 }}>
            <div>
              <span className="label-caps" style={{ color: '#546E7A' }}>Vinyl Gloves</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
                Vinyl — Blue, Black &amp; Clear
              </h2>
            </div>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {vinylProducts.map((p, i) => (
              <CommercialProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: '#1565C0' }}>
              Industries We Serve
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--color-charcoal)' }}
            >
              The Right Glove for Every Job
            </h2>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <AnimateIn key={ind.name} delay={i * 60}>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 18,
                      padding: '28px 24px',
                      boxShadow: 'var(--shadow-xs)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: `${ind.color}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={ind.color} />
                    </div>
                    <h3 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                      {ind.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-gray)', lineHeight: 1.6, margin: 0 }}>
                      {ind.desc}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: '#1565C0' }}>
              Pricing Programs
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
                      textTransform: 'uppercase' as const,
                      textDecoration: 'none',
                      alignSelf: 'flex-start',
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

      {/* WHY VALUE SUPPLIERS */}
      <section style={{ backgroundColor: '#fff', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>
          <AnimateIn>
            <span className="label-caps" style={{ color: '#1565C0', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1.5, backgroundColor: '#1565C0', display: 'inline-block', borderRadius: 99 }} />
              Why Value Suppliers
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 14, marginBottom: 20, color: 'var(--color-charcoal)', lineHeight: 1.05 }}>
              Built for Businesses That Go Through Gloves.
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 12, fontSize: '0.95rem' }}>
              We supply the gloves your team burns through every week — at prices that make sense for operations buying by the case, not the box.
            </p>
            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.85, marginBottom: 36, fontSize: '0.95rem' }}>
              19 products across nitrile, latex, and vinyl. From thin 3mil food-handling gloves to 8mil diamond-grip industrial gloves. Volume pricing that rewards bigger orders.
            </p>
            <a
              href="#products"
              className="vs-btn-forest"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#1565C0',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              View Products <ArrowRight size={14} />
            </a>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { label: '19 Products In Stock', sub: 'Nitrile, latex, and vinyl — 3mil to 8mil' },
              { label: 'Fast Processing', sub: '1–2 business day turnaround on all orders' },
              { label: 'Volume Discounts', sub: 'Save 10–25% at wholesale and distributor tiers' },
              { label: 'Dedicated Support', sub: 'Real people, not chatbots, for account help' },
            ].map(({ label, sub }, i) => (
              <AnimateIn key={label} delay={i * 80}>
                <div
                  style={{
                    backgroundColor: '#fff',
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
                      backgroundColor: '#E3F2FD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <BadgeCheck size={15} color="#1565C0" />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', lineHeight: 1.5 }}>{sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: '#1565C0' }}>Common Questions</span>
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
                    <ChevronRight size={16} color="#1565C0" style={{ marginTop: 3, flexShrink: 0 }} />
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
              <Link href="/contact" style={{ color: '#1565C0', fontWeight: 700, textDecoration: 'none' }}>
                Contact us →
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ JSON-LD */}
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

      {/* CTA BANNER */}
      <section
        className="vs-dot-grid"
        style={{
          backgroundColor: '#1C1C1C',
          padding: '100px 24px',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="vs-glow-amber"
          style={{ width: 640, height: 400, top: '-30%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(21,101,192,0.12)' }}
        />

        <AnimateIn style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="label-caps" style={{ color: 'rgba(21,101,192,0.85)', display: 'block', marginBottom: 20 }}>
            Get Started Today
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.25rem)', marginBottom: 20, lineHeight: 1.0 }}
          >
            Ready to Stock Up?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 44, fontSize: '1.05rem', lineHeight: 1.75 }}>
            19 products in stock. Order online today or apply for wholesale and distribution pricing.
            Volume discounts, priority allocation, and a dedicated rep for qualifying accounts.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#products"
              className="vs-btn-amber"
              style={{
                backgroundColor: '#1565C0',
                color: '#fff',
                padding: '15px 34px',
                borderRadius: 9999,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 20px rgba(21,101,192,0.3)',
              }}
            >
              Shop Now <ArrowRight size={14} />
            </a>
            <Link
              href="/wholesale"
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
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Apply for Wholesale
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
      `}</style>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '14px 16px',
  textAlign: 'left',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontFamily: "'Barlow', Arial, sans-serif",
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  color: 'var(--color-charcoal)',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
