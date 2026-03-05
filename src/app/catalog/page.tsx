import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PRODUCTS from '@/lib/products';
import { formatPrice } from '@/lib/pricing';

export const metadata: Metadata = { title: 'Catalog' };

const CATEGORIES = ['All', 'Gloves', 'Trimmers', 'Accessories'] as const;

export default function CatalogPage() {
  const grouped = {
    Gloves: PRODUCTS.filter((p) => p.category === 'Gloves'),
    Trimmers: PRODUCTS.filter((p) => p.category === 'Trimmers'),
    Accessories: PRODUCTS.filter((p) => p.category === 'Accessories'),
  };

  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Products</span>
          <h1
            className="font-display"
            style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: 8 }}
          >
            Full Product Catalog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: 12, maxWidth: 480 }}>
            Stocked and ready to ship. All products available by the case at retail, wholesale, and distribution pricing.
          </p>
        </div>
      </div>

      {/* Category filter bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '16px 24px', position: 'sticky', top: 'var(--nav-height)', zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase()}`}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                border: '1px solid var(--color-border)',
                backgroundColor: 'transparent',
                color: 'var(--color-charcoal)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
            >
              {cat}
            </a>
          ))}
          <div style={{ flex: 1 }} />
          <Link
            href="/wholesale"
            style={{
              padding: '8px 20px',
              borderRadius: 9999,
              backgroundColor: 'var(--color-sage-light)',
              color: 'var(--color-forest)',
              fontFamily: "'Barlow', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Get Wholesale Pricing <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>

        {/* Gloves */}
        <section id="gloves" style={{ marginBottom: 64 }}>
          <div style={{ marginBottom: 28 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>Disposable Gloves</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 6, color: 'var(--color-charcoal)' }}>
              Gloves
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {grouped.Gloves.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Trimmers */}
        <section id="trimmers" style={{ marginBottom: 64 }}>
          <div style={{ marginBottom: 28 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>Trimming Tools</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 6, color: 'var(--color-charcoal)' }}>
              Trimmers & Scissors
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {grouped.Trimmers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Accessories */}
        <section id="accessories" style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 28 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem' }}>Harvest Accessories</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 6, color: 'var(--color-charcoal)' }}>
              Accessories
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {grouped.Accessories.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Wholesale CTA */}
        <div
          style={{
            backgroundColor: 'var(--color-forest)',
            borderRadius: 20,
            padding: '40px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.68rem', marginBottom: 8 }}>Volume Pricing</div>
            <h3 className="font-display" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#fff', marginBottom: 8 }}>
              Wholesale accounts save 20%. Distribution saves 30%.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Apply online — approval within 1 business day.
            </p>
          </div>
          <div className="vs-btn-group">
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
                whiteSpace: 'nowrap',
              }}
            >
              Apply for Wholesale
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
                whiteSpace: 'nowrap',
              }}
            >
              Distribution Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <Link href={`/catalog/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className="tilt-card"
        style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 180, position: 'relative', backgroundColor: 'var(--color-sage-light)', flexShrink: 0 }}>
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
                position: 'absolute', top: 10, right: 10,
                backgroundColor: 'var(--color-amber)', color: '#fff',
                padding: '4px 10px', borderRadius: 4, fontSize: '0.65rem',
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div style={{ padding: '18px 18px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem' }}>
            {product.category}
          </span>
          <h3
            className="font-heading"
            style={{ fontSize: '0.95rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}
          >
            {product.name}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginBottom: 16, flex: 1, lineHeight: 1.5 }}>
            {product.specs.find((s) => s.label === 'Count' || s.label === 'Size' || s.label === 'Sizes' || s.label === 'Dimensions')?.value ?? ''}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                {formatPrice(product.price)}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', marginLeft: 4 }}>{product.unit}</span>
            </div>
            <span
              style={{
                color: 'var(--color-forest)',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              View <ArrowRight size={12} />
            </span>
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-green)', fontWeight: 600 }}>
              Wholesale pricing available →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
