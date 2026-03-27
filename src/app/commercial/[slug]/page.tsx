import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle, Package, Truck, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import COMMERCIAL_PRODUCTS, {
  getCommercialProductBySlug,
  getRelatedCommercialProducts,
} from '@/lib/commercial-products';

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return COMMERCIAL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getCommercialProductBySlug(slug);
  if (!product) return {};

  const url = `https://valuesuppliers.co/commercial/${product.slug}`;
  const imgUrl = `https://valuesuppliers.co${product.img}`;

  return {
    title: `${product.name} — Commercial Bulk Pricing | Value Suppliers`,
    description: `${product.tagline} ${product.description.slice(0, 100)}. Box, case, wholesale, and distribution pricing available.`,
    keywords: [
      product.shortName,
      `${product.category} gloves bulk`,
      `${product.thickness} gloves`,
      ...product.useCases.slice(0, 3),
      'commercial gloves',
      'ValueSuppliers',
    ],
    openGraph: {
      title: `${product.name} — Commercial Pricing`,
      description: `${product.tagline} Available in box, case, wholesale, and distribution tiers.`,
      url,
      type: 'website',
      images: [{ url: imgUrl, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.shortName} — Commercial Pricing`,
      description: product.tagline,
      images: [imgUrl],
    },
    alternates: { canonical: url },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CommercialProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getCommercialProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedCommercialProducts(product.relatedSlugs);

  const productUrl = `https://valuesuppliers.co/commercial/${product.slug}`;

  /* ---------- Structured data ---------- */

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `https://valuesuppliers.co${img}`),
    sku: product.sku ?? product.slug,
    brand: { '@type': 'Brand', name: 'ValueSuppliers.co' },
    category: product.category,
    url: productUrl,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: (product.distributorPrice ?? product.price).toFixed(2),
      highPrice: product.price.toFixed(2),
      offerCount: 4,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://valuesuppliers.co' },
      { '@type': 'ListItem', position: 2, name: 'Commercial', item: 'https://valuesuppliers.co/commercial' },
      { '@type': 'ListItem', position: 3, name: product.category, item: `https://valuesuppliers.co/commercial#${product.category.toLowerCase()}` },
      { '@type': 'ListItem', position: 4, name: product.shortName, item: productUrl },
    ],
  };

  /* ---------- Pricing tiers ---------- */

  const tiers = [
    {
      label: 'Per Box',
      price: product.boxPrice ?? product.price,
      note: `${product.glovesPerBox} gloves`,
      color: 'var(--color-charcoal)',
      bg: 'var(--color-bg)',
    },
    {
      label: 'Per Case',
      price: product.casePrice ?? product.price * product.boxesPerCase,
      note: `${product.boxesPerCase} boxes (${product.caseGloveCount ?? product.glovesPerBox * product.boxesPerCase} gloves)`,
      color: 'var(--color-charcoal)',
      bg: '#fff',
    },
    {
      label: 'Wholesale',
      price: product.wholesalePrice ?? product.price * product.boxesPerCase * 0.875,
      note: '30+ cases · Approved accounts',
      color: '#2E7D32',
      bg: '#fff',
      savingsLabel: product.casePrice && product.wholesalePrice
        ? `SAVE ${formatPrice(product.casePrice - product.wholesalePrice)}/CASE`
        : undefined,
      savingsColor: '#2E7D32',
    },
    {
      label: 'Distribution',
      price: product.distributorPrice ?? product.price * product.boxesPerCase * 0.75,
      note: '120+ cases · NET 30 terms',
      color: '#1565C0',
      bg: '#fff',
      savingsLabel: product.casePrice && product.distributorPrice
        ? `SAVE ${formatPrice(product.casePrice - product.distributorPrice)}/CASE`
        : undefined,
      savingsColor: '#1565C0',
    },
  ];

  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <Link href="/commercial" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Commercial</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <Link
            href={`/commercial#${product.category.toLowerCase()}`}
            style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            {product.category}
          </Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <span style={{ color: 'var(--color-charcoal)', fontSize: '0.8rem', fontWeight: 600 }}>
            {product.shortName}
          </span>
        </div>
      </div>

      {/* ── Main product section ───────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
          className="vs-product-grid"
        >
          {/* ── Left: Image ──────────────────────────────────── */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 24px)' }} className="vs-product-image-col">
            <div style={{ position: 'relative' }}>
              {/* Blue ambient glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  borderRadius: '50%',
                  background: 'rgba(21,101,192,0.08)',
                  filter: 'blur(70px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 24,
                  overflow: 'hidden',
                  aspectRatio: '1 / 1',
                  position: 'relative',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                  zIndex: 1,
                }}
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain', padding: 24 }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <span
                    className="label-caps"
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      backgroundColor: product.badge === 'Heavy Duty' ? '#E65100' : '#1565C0',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: 9999,
                      fontSize: '0.7rem',
                      boxShadow: '0 2px 8px rgba(21,101,192,0.25)',
                    }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                {[
                  { icon: Package, label: 'Case Pricing', sub: `${product.boxesPerCase} boxes per case` },
                  { icon: Truck, label: 'Fast Shipping', sub: '1-2 day processing' },
                  { icon: ShieldCheck, label: 'Certified', sub: 'ASTM & FDA compliant' },
                  { icon: Tag, label: 'Volume Discounts', sub: 'Wholesale & distribution' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 10,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Icon size={16} color="#1565C0" />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>{label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-warm-gray)' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Details ───────────────────────────────── */}
          <div>
            <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.68rem' }}>
              {product.category} &middot; {product.thickness}
            </span>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-charcoal)',
                marginTop: 8,
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {product.name}
            </h1>

            <p style={{ color: 'var(--color-warm-gray)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
              {product.tagline}
            </p>

            {/* ── Pricing tiers ──────────────────────────── */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 28,
              }}
            >
              {tiers.map((tier, i) => (
                <div
                  key={tier.label}
                  style={{
                    padding: '18px 20px',
                    borderBottom: i < tiers.length - 1 ? '1px solid var(--color-border)' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: tier.bg,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <div
                        className="label-caps"
                        style={{ color: tier.color, fontSize: '0.65rem' }}
                      >
                        {tier.label}
                      </div>
                      {tier.savingsLabel && (
                        <span
                          style={{
                            backgroundColor: tier.savingsColor === '#2E7D32' ? '#EDF7F0' : '#E3F2FD',
                            color: tier.savingsColor,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          {tier.savingsLabel}
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>{tier.note}</div>
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: '1.4rem', fontWeight: 600, color: tier.color }}
                  >
                    {formatPrice(tier.price)}
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTA ────────────────────────────────────── */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: '#1565C0',
                  color: '#fff',
                  padding: '14px 32px',
                  borderRadius: 10,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'background-color 0.2s ease',
                }}
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
              <Link
                href="/wholesale"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-charcoal)',
                  padding: '14px 32px',
                  borderRadius: 10,
                  border: '2px solid var(--color-border)',
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Wholesale Access
              </Link>
            </div>

            {/* ── Specifications ──────────────────────────── */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 16 }}>
              Specifications
            </h2>
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 36,
              }}
            >
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: i < product.specs.length - 1 ? '1px solid var(--color-border)' : 'none',
                    backgroundColor: i % 2 === 0 ? '#fff' : 'var(--color-bg)',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray)', fontWeight: 600 }}>{spec.label}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>{spec.value}</span>
                </div>
              ))}
            </div>

            {/* ── Description ─────────────────────────────── */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 12 }}>
              About This Product
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28 }}>
              {product.description}
            </p>

            {/* ── Features ────────────────────────────────── */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>
              Key Features
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {product.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle size={16} color="#2E7D32" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* ── Use Cases ───────────────────────────────── */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>
              Common Applications
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {product.useCases.map((u) => (
                <span
                  key={u}
                  style={{
                    backgroundColor: '#E3F2FD',
                    color: '#1565C0',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 9999,
                    border: '1px solid rgba(21,101,192,0.12)',
                  }}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ───────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#fff', padding: '64px 24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.68rem' }}>You Might Also Need</span>
                <h2
                  className="font-display"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 6, color: 'var(--color-charcoal)' }}
                >
                  Related Products
                </h2>
              </div>
              <Link
                href="/commercial"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#1565C0',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/commercial/${rp.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="tilt-card"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 16,
                      overflow: 'hidden',
                      transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                    }}
                  >
                    <div style={{ height: 180, position: 'relative', backgroundColor: '#f5f5f5' }}>
                      <Image
                        src={rp.img}
                        alt={rp.name}
                        fill
                        style={{ objectFit: 'contain', padding: 12 }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {rp.badge && (
                        <span
                          className="label-caps"
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: rp.badge === 'Heavy Duty' ? '#E65100' : '#1565C0',
                            color: '#fff',
                            padding: '4px 10px',
                            borderRadius: 4,
                            fontSize: '0.65rem',
                          }}
                        >
                          {rp.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px 18px 20px' }}>
                      <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.65rem' }}>
                        {rp.category} &middot; {rp.thickness}
                      </span>
                      <h3
                        className="font-heading"
                        style={{ fontSize: '0.92rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}
                      >
                        {rp.shortName}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                          {formatPrice(rp.price)}
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', fontWeight: 400, fontFamily: 'inherit' }}>
                            {' '}{rp.unit}
                          </span>
                        </span>
                        <span style={{ color: '#1565C0', fontSize: '0.78rem', fontWeight: 600 }}>View &rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA banner ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#1C1C1C', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.68rem' }}>Commercial Accounts</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginTop: 8, marginBottom: 12 }}>
            Need Custom Pricing?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 28 }}>
            Wholesale accounts save 10-15% per case. Distribution accounts save 20-25% with NET 30 terms.
            Contact us for volume quotes on {product.shortName}.
          </p>
          <div className="vs-btn-group" style={{ maxWidth: 380, margin: '0 auto' }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: '#1565C0',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              Contact for Pricing
            </Link>
            <Link
              href="/wholesale"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 8,
                border: '2px solid rgba(255,255,255,0.3)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              Wholesale Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
