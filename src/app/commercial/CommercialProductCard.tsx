'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { CommercialProduct } from '@/lib/commercial-products';
import AnimateIn from '@/components/AnimateIn';

export default function CommercialProductCard({ product, index }: { product: CommercialProduct; index: number }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: `commercial-${product.slug}`,
      name: product.shortName,
      price: product.price,
      plan: 'one-time',
      img: product.img,
      unit: product.unit,
      purchaseUnit: 'box',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddCase = () => {
    const casePrice = product.casePrice ?? product.price * (product.boxesPerCase || 10) * 0.85;
    addItem({
      id: `commercial-${product.slug}-case`,
      name: `${product.shortName} (Case)`,
      price: casePrice,
      plan: 'one-time',
      img: product.img,
      unit: '/ case',
      purchaseUnit: 'case',
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimateIn delay={index * 60}>
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
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
      >
        <div className="vs-img-shine" style={{ height: 200, position: 'relative', backgroundColor: '#f5f5f5', flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(21,101,192,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <Image
            src={product.img}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 12 }}
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          {product.badge && (
            <span
              className="label-caps"
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: product.badge === 'Heavy Duty' ? '#E65100' : '#1565C0',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 9999,
                fontSize: '0.58rem',
                zIndex: 2,
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div style={{ padding: '16px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span className="label-caps" style={{ color: '#1565C0', fontSize: '0.58rem' }}>
            {product.category} · {product.thickness}
          </span>
          <h3 className="font-heading" style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 4, color: 'var(--color-charcoal)', lineHeight: 1.3 }}>
            {product.shortName}
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', marginBottom: 'auto', paddingBottom: 12, lineHeight: 1.5 }}>
            {product.color} · {product.glovesPerBox}ct/box · {product.boxesPerCase} boxes/case
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 12, marginBottom: 12 }}>
            <div>
              <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                ${product.price.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-warm-gray)', marginLeft: 4 }}>
                {product.unit}
              </span>
            </div>
            {product.sku && (
              <span className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.58rem' }}>
                {product.sku}
              </span>
            )}
          </div>

          {/* Add to Cart buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 12px',
                backgroundColor: added ? '#2E7D32' : '#1565C0',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: "'Barlow', Arial, sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              {added ? <Check size={14} /> : <ShoppingCart size={14} />}
              {added ? 'Added' : 'Add Box'}
            </button>
            <button
              onClick={handleAddCase}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 12px',
                backgroundColor: 'transparent',
                color: '#1565C0',
                border: '1.5px solid #1565C0',
                borderRadius: 10,
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: "'Barlow', Arial, sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
            >
              Add Case
            </button>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
