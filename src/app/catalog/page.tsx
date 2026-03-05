import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Catalog' };

const CATEGORIES = ['All', 'Gloves', 'Trimmers', 'Accessories'];

const PRODUCTS = [
  { id: 1, category: 'Gloves', name: 'Nitrile Disposable Gloves — 4 mil', detail: 'XS–XXL | 100 ct / case', price: '$18.99', badge: 'Best Seller', img: '/products/product-1.avif' },
  { id: 2, category: 'Gloves', name: 'Nitrile Disposable Gloves — 6 mil', detail: 'S–XL | 100 ct / case', price: '$24.99', badge: null, img: '/products/product-2.avif' },
  { id: 3, category: 'Gloves', name: 'Latex Exam Gloves — 3 mil', detail: 'S–XL | 100 ct / case', price: '$14.99', badge: null, img: '/products/product-3.avif' },
  { id: 4, category: 'Gloves', name: 'Vinyl Disposable Gloves', detail: 'S–XL | 100 ct / case', price: '$11.99', badge: 'Value', img: '/products/product-4.avif' },
  { id: 5, category: 'Gloves', name: 'Black Nitrile Gloves — 4 mil', detail: 'S–XXL | 100 ct / case', price: '$21.99', badge: null, img: '/products/product-5.avif' },
  { id: 6, category: 'Gloves', name: 'XL Nitrile Gloves — Box', detail: 'XL | 100 ct / box', price: '$22.99', badge: null, img: '/products/product-6.avif' },
  { id: 7, category: 'Trimmers', name: 'Curved Trimming Scissors', detail: 'Titanium coated | Spring-loaded', price: '$12.50', badge: 'New', img: '/products/product-1.avif' },
  { id: 8, category: 'Trimmers', name: 'Bonsai Precision Snips', detail: 'Stainless steel | Non-stick coating', price: '$9.99', badge: null, img: '/products/product-2.avif' },
  { id: 9, category: 'Accessories', name: 'Trimming Tray — Large', detail: '19" x 13" | Screen included', price: '$34.99', badge: null, img: '/products/product-3.avif' },
];

export default function CatalogPage() {
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

      {/* Category filter */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                border: cat === 'All' ? 'none' : '1px solid var(--color-border)',
                backgroundColor: cat === 'All' ? 'var(--color-forest)' : 'transparent',
                color: cat === 'All' ? '#fff' : 'var(--color-charcoal)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
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
                      top: 10,
                      right: 10,
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

              <div style={{ padding: '18px 18px 22px' }}>
                <span className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem' }}>
                  {product.category}
                </span>
                <h3
                  className="font-heading"
                  style={{ fontSize: '0.95rem', marginTop: 6, marginBottom: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}
                >
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginBottom: 16 }}>
                  {product.detail}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--color-charcoal)' }}>
                      {product.price}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray)', marginLeft: 4 }}>/case</span>
                  </div>
                  <button
                    style={{
                      backgroundColor: 'var(--color-amber)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 14px',
                      fontFamily: "'Barlow', Arial, sans-serif",
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--color-border)' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-muted-green)',
                      fontWeight: 600,
                    }}
                  >
                    Log in for wholesale pricing →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
