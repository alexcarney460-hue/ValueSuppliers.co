import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, CheckCircle, Package, Truck, ShieldCheck, Tag } from 'lucide-react';
import PRODUCTS, { getProductBySlug, getRelatedProducts } from '@/lib/products';
import AddToCartPanel from '@/components/AddToCartPanel';
import { priceForAccount, formatPrice } from '@/lib/pricing';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedSlugs);

  const wholesalePrice = priceForAccount(product.price, 'wholesale');
  const distroPrice = priceForAccount(product.price, 'distribution');

  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <Link href="/catalog" style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>Catalog</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <Link href={`/catalog?category=${product.category}`} style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>{product.category}</Link>
          <ChevronRight size={12} color="var(--color-warm-gray)" />
          <span style={{ color: 'var(--color-charcoal)', fontSize: '0.8rem', fontWeight: 600 }}>{product.shortName}</span>
        </div>
      </div>

      {/* Main product section */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="vs-product-grid">

          {/* Left — Image */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 24px)' }} className="vs-product-image-col">
            <div
              style={{
                backgroundColor: 'var(--color-sage-light)',
                borderRadius: 20,
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                position: 'relative',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Image
                src={product.img}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
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
                    backgroundColor: 'var(--color-amber)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Trust badges under image */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
              {[
                { icon: Package, label: 'Case Pricing', sub: 'Buy by the case' },
                { icon: Truck, label: 'Fast Restock', sub: 'Reliable fulfillment' },
                { icon: ShieldCheck, label: 'Pro Grade', sub: 'Industrial specs' },
                { icon: Tag, label: 'Wholesale Avail.', sub: '20–30% off' },
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
                  <Icon size={16} color="var(--color-forest)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>{label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-warm-gray)' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Buy panel */}
          <div>
            <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>
              {product.category}
            </span>

            <h1
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-charcoal)', marginTop: 8, lineHeight: 1.1, marginBottom: 12 }}
            >
              {product.name}
            </h1>

            <p style={{ color: 'var(--color-warm-gray)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
              {product.tagline}
            </p>

            {/* Pricing tiers */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 28,
              }}
            >
              {/* Retail */}
              <div
                style={{
                  padding: '18px 20px',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <div>
                  <div className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.65rem', marginBottom: 2 }}>Retail Price</div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>No minimum — order any quantity</div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  {formatPrice(product.price)}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400, fontFamily: 'inherit' }}>
                    {' '}{product.unit}
                  </span>
                </div>
              </div>

              {/* Wholesale */}
              <div
                style={{
                  padding: '18px 20px',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div className="label-caps" style={{ color: 'var(--color-muted-green)', fontSize: '0.65rem' }}>Wholesale</div>
                    <span style={{ backgroundColor: 'var(--color-sage-light)', color: 'var(--color-forest)', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>20% OFF</span>
                  </div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>5+ cases/month · Approved accounts only</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    {formatPrice(wholesalePrice)}
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400, fontFamily: 'inherit' }}>
                      {' '}{product.unit}
                    </span>
                  </div>
                  <Link href="/wholesale" style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', textDecoration: 'none', fontWeight: 600 }}>
                    Apply →
                  </Link>
                </div>
              </div>

              {/* Distribution */}
              <div
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem' }}>Distribution</div>
                    <span style={{ backgroundColor: '#FEF3DC', color: 'var(--color-amber)', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>30% OFF</span>
                  </div>
                  <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.78rem' }}>25+ cases/month · NET 30 terms available</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-amber)' }}>
                    {formatPrice(distroPrice)}
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', fontWeight: 400, fontFamily: 'inherit' }}>
                      {' '}{product.unit}
                    </span>
                  </div>
                  <Link href="/distribution" style={{ fontSize: '0.72rem', color: 'var(--color-amber)', textDecoration: 'none', fontWeight: 600 }}>
                    Apply →
                  </Link>
                </div>
              </div>
            </div>

            {/* Subscribe & Save + Add to Cart */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, color: 'var(--color-muted-green)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-muted-green)' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>In Stock — Ships within 1–2 business days</span>
              </div>
              <AddToCartPanel
                id={product.slug}
                name={product.name}
                price={product.price}
                img={product.img}
                unit={product.unit}
              />
            </div>

            {/* Specs */}
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

            {/* Description */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 12 }}>
              About This Product
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28 }}>
              {product.description}
            </p>

            {/* Features */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>
              Key Features
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {product.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle size={16} color="var(--color-muted-green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Use cases */}
            <h2 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 14 }}>
              Common Applications
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {product.useCases.map((u) => (
                <span
                  key={u}
                  style={{
                    backgroundColor: 'var(--color-sage-light)',
                    color: 'var(--color-forest)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 9999,
                    border: '1px solid rgba(27,58,45,0.12)',
                  }}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#fff', padding: '64px 24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>You Might Also Need</span>
                <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 6, color: 'var(--color-charcoal)' }}>
                  Related Products
                </h2>
              </div>
              <Link
                href="/catalog"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--color-forest)',
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
                  href={`/catalog/${rp.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="tilt-card"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ height: 180, position: 'relative', backgroundColor: 'var(--color-sage-light)' }}>
                      <Image
                        src={rp.img}
                        alt={rp.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {rp.badge && (
                        <span
                          className="label-caps"
                          style={{
                            position: 'absolute', top: 10, right: 10,
                            backgroundColor: 'var(--color-amber)', color: '#fff',
                            padding: '4px 10px', borderRadius: 4, fontSize: '0.65rem',
                          }}
                        >
                          {rp.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px 18px 20px' }}>
                      <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem' }}>{rp.category}</span>
                      <h3 className="font-heading" style={{ fontSize: '0.92rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}>
                        {rp.name}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                          {formatPrice(rp.price)}
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', fontWeight: 400, fontFamily: 'inherit' }}> {rp.unit}</span>
                        </span>
                        <span style={{ color: 'var(--color-forest)', fontSize: '0.78rem', fontWeight: 600 }}>View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Wholesale CTA banner */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>Save More</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginTop: 8, marginBottom: 12 }}>
            Buying in Volume?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 28 }}>
            Wholesale accounts get 20% off. Distribution accounts get 30% off with NET 30 terms. Apply in minutes.
          </p>
          <div className="vs-btn-group" style={{ maxWidth: 380, margin: '0 auto' }}>
            <Link
              href="/wholesale"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Get Wholesale Access
            </Link>
            <Link
              href="/distribution"
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
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Distribution Program
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
