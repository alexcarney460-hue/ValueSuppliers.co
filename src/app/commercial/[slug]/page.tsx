import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle, Package, Truck, ShieldCheck, Tag } from 'lucide-react';
import COMMERCIAL_PRODUCTS, { getCommercialProductBySlug, getRelatedCommercialProducts } from '@/lib/commercial-products';
import CommercialAddToCart from './CommercialAddToCart';

export function generateStaticParams() {
  return COMMERCIAL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getCommercialProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.shortName} — Commercial Gloves | Value Suppliers`,
    description: `${product.tagline} ${product.description.slice(0, 120)}`,
    openGraph: {
      title: `${product.shortName} — Bulk Pricing`,
      description: product.tagline,
      url: `https://valuesuppliers.co/commercial/${product.slug}`,
      images: [{ url: `https://valuesuppliers.co${product.img}`, width: 800, height: 800, alt: product.name }],
    },
    alternates: { canonical: `https://valuesuppliers.co/commercial/${product.slug}` },
  };
}

export default async function CommercialProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getCommercialProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedCommercialProducts(product.relatedSlugs);
  const casePrice = product.casePrice ?? product.price * (product.boxesPerCase || 10) * 0.85;
  const wholesaleCase = product.wholesalePrice ?? casePrice * 0.87;
  const distroCase = product.distributorPrice ?? casePrice * 0.75;

  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 768px) {
          .commercial-detail-main { padding: 24px 16px !important; }
          .commercial-tier-row { flex-direction: column !important; gap: 4px !important; align-items: flex-start !important; }
          .commercial-tier-row .font-mono { font-size: 1.15rem !important; }
          .commercial-trust-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .commercial-related-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .commercial-related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <Link href="/commercial" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Commercial</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <span style={{ color: 'var(--color-charcoal)', fontSize: '0.8rem', fontWeight: 600 }}>{product.shortName}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="commercial-detail-main" style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="vs-product-grid">

          {/* Left — Image */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 24px)' }} className="vs-product-image-col">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-10%', borderRadius: '50%', background: 'rgba(21,101,192,0.08)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: 24, overflow: 'hidden', aspectRatio: '1 / 1', position: 'relative', boxShadow: 'var(--shadow-xl)', zIndex: 1 }}>
                <Image src={product.img} alt={product.name} fill style={{ objectFit: 'contain', padding: 24 }} sizes="(max-width: 768px) 100vw, 50vw" priority />
                {product.badge && (
                  <span className="label-caps" style={{ position: 'absolute', top: 16, left: 16, backgroundColor: product.badge === 'Heavy Duty' ? '#E65100' : '#1565C0', color: '#fff', padding: '6px 14px', borderRadius: 9999, fontSize: '0.7rem' }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="commercial-trust-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                {[
                  { icon: Package, label: 'Case Pricing', sub: `${product.boxesPerCase} boxes/case` },
                  { icon: Truck, label: 'Fast Shipping', sub: '1-2 day processing' },
                  { icon: ShieldCheck, label: 'Certified', sub: 'ASTM & FDA' },
                  { icon: Tag, label: 'Volume Discounts', sub: 'Wholesale & distro tiers' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
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

          {/* Right — Buy panel */}
          <div>
            <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.68rem' }}>{product.category} · {product.thickness}</span>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-charcoal)', marginTop: 8, lineHeight: 1.1, marginBottom: 12 }}>
              {product.name}
            </h1>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>{product.tagline}</p>

            {/* Pricing tiers */}
            <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', marginBottom: 28 }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-bg)', flexWrap: 'wrap' as const }} className="commercial-tier-row">
                <div>
                  <div className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.65rem', marginBottom: 2 }}>Retail — Per Box</div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>{product.glovesPerBox} gloves/box</div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  ${product.price.toFixed(2)}<span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400 }}> / box</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const }} className="commercial-tier-row">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div className="label-caps" style={{ color: '#1565C0', fontSize: '0.65rem' }}>Case Price</div>
                    <span style={{ backgroundColor: '#E3F2FD', color: '#1565C0', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>BEST VALUE</span>
                  </div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>{product.boxesPerCase} boxes ({product.glovesPerBox * product.boxesPerCase} gloves)</div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1565C0' }}>
                  ${casePrice.toFixed(2)}<span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400 }}> / case</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const }} className="commercial-tier-row">
                <div>
                  <div className="label-caps" style={{ color: 'var(--color-muted-green)', fontSize: '0.65rem', marginBottom: 2 }}>Wholesale (30+ cases)</div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>Approved accounts · <Link href="/wholesale" style={{ color: 'var(--color-muted-green)', fontWeight: 600, textDecoration: 'none' }}>Apply</Link></div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                  ${wholesaleCase.toFixed(2)}<span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400 }}> / case</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const }} className="commercial-tier-row">
                <div>
                  <div className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem', marginBottom: 2 }}>Distribution (120+ cases)</div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>Dedicated rep · <Link href="/distribution" style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Apply</Link></div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-amber)' }}>
                  ${distroCase.toFixed(2)}<span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400 }}> / case</span>
                </div>
              </div>
            </div>

            {/* Add to Cart with subscription */}
            <CommercialAddToCart product={product} casePrice={casePrice} />

            {/* Specs */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 16, marginTop: 36 }}>Specifications</h2>
            <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
              {product.specs.map((spec, i) => (
                <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < product.specs.length - 1 ? '1px solid var(--color-border)' : 'none', backgroundColor: i % 2 === 0 ? '#fff' : 'var(--color-bg)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray)', fontWeight: 600 }}>{spec.label}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>{spec.value}</span>
                </div>
              ))}
            </div>

            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 12 }}>About This Product</h2>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28 }}>{product.description}</p>

            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>Key Features</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {product.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle size={16} color="#1565C0" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>Common Applications</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {product.useCases.map((u) => (
                <span key={u} style={{ backgroundColor: '#E3F2FD', color: '#1565C0', fontSize: '0.78rem', fontWeight: 600, padding: '6px 14px', borderRadius: 9999, border: '1px solid rgba(21,101,192,0.12)' }}>
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#FAFAFA', padding: '64px 24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-charcoal)', marginBottom: 32 }}>Related Products</h2>
            <div className="commercial-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {related.map((rp) => (
                <Link key={rp.slug} href={`/commercial/${rp.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="tilt-card" style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ height: 160, position: 'relative', backgroundColor: '#f5f5f5' }}>
                      <Image src={rp.img} alt={rp.name} fill style={{ objectFit: 'contain', padding: 12 }} sizes="20vw" />
                    </div>
                    <div style={{ padding: '14px 16px 18px' }}>
                      <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.6rem' }}>{rp.category} · {rp.thickness}</span>
                      <h3 className="font-heading" style={{ fontSize: '0.85rem', marginTop: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}>{rp.shortName}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <span className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                          ${rp.price.toFixed(2)}<span style={{ fontSize: '0.68rem', color: 'var(--color-warm-gray)', fontWeight: 400 }}> {rp.unit}</span>
                        </span>
                        <span style={{ color: '#1565C0', fontSize: '0.72rem', fontWeight: 600 }}>View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
