'use client';

import { useState } from 'react';
import { ShoppingCart, RefreshCw, Check, Minus, Plus } from 'lucide-react';
import { useCart, type PurchasePlan } from '@/context/CartContext';
import type { CommercialProduct } from '@/lib/commercial-products';

const AUTOSHIP_DISCOUNT = 0.10;
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;

type Props = {
  product: CommercialProduct;
  casePrice: number;
};

export default function CommercialAddToCart({ product, casePrice }: Props) {
  const { addItem, openCart } = useCart();
  const [plan, setPlan] = useState<PurchasePlan>('one-time');
  const [purchaseUnit, setPurchaseUnit] = useState<'box' | 'case'>('case');
  const [size, setSize] = useState('L');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const basePrice = purchaseUnit === 'box' ? product.price : casePrice;
  const autoshipPrice = Math.round(basePrice * (1 - AUTOSHIP_DISCOUNT) * 100) / 100;
  const displayPrice = plan === 'autoship' ? autoshipPrice : basePrice;
  const savings = plan === 'autoship' ? Math.round((basePrice - autoshipPrice) * qty * 100) / 100 : 0;

  const handleAdd = () => {
    const unitLabel = purchaseUnit === 'box' ? '/ box' : '/ case';
    addItem({
      id: `commercial-${product.slug}-${purchaseUnit}-${size}`,
      name: `${product.shortName} (${size}, ${purchaseUnit})`,
      price: displayPrice,
      plan,
      img: product.img,
      unit: unitLabel,
      purchaseUnit,
      size,
    }, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="commercial-add-to-cart">
      <style>{`
        @media (max-width: 480px) {
          .commercial-add-to-cart .plan-toggle { flex-direction: column !important; }
          .commercial-add-to-cart .size-row { flex-wrap: wrap !important; }
          .commercial-add-to-cart .add-row { flex-direction: column !important; }
          .commercial-add-to-cart .add-row .qty-wrap { width: 100% !important; justify-content: center !important; }
          .commercial-add-to-cart .add-row .add-btn { width: 100% !important; }
        }
      `}</style>

      {/* Size selector */}
      <div style={{ marginBottom: 20 }}>
        <div className="label-caps" style={{ fontSize: '0.65rem', color: 'var(--color-warm-gray)', marginBottom: 8 }}>Size</div>
        <div className="size-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: size === s ? '2px solid #1565C0' : '1px solid var(--color-border)',
                backgroundColor: size === s ? '#E3F2FD' : '#fff',
                color: size === s ? '#1565C0' : 'var(--color-charcoal)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minWidth: 44,
                minHeight: 44,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Box / Case toggle */}
      <div style={{ marginBottom: 20 }}>
        <div className="label-caps" style={{ fontSize: '0.65rem', color: 'var(--color-warm-gray)', marginBottom: 8 }}>Purchase Unit</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['box', 'case'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setPurchaseUnit(u)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 10,
                border: purchaseUnit === u ? '2px solid #1565C0' : '1px solid var(--color-border)',
                backgroundColor: purchaseUnit === u ? '#E3F2FD' : '#fff',
                color: purchaseUnit === u ? '#1565C0' : 'var(--color-charcoal)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
                minHeight: 44,
              }}
            >
              <div>{u === 'box' ? 'Single Box' : 'Full Case'}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 400, color: purchaseUnit === u ? '#1565C0' : 'var(--color-warm-gray)', marginTop: 2 }}>
                {u === 'box' ? `${product.glovesPerBox} gloves` : `${product.boxesPerCase}× · ${product.glovesPerBox * product.boxesPerCase} gloves`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* One-time / Autoship toggle */}
      <div style={{ marginBottom: 20 }}>
        <div className="label-caps" style={{ fontSize: '0.65rem', color: 'var(--color-warm-gray)', marginBottom: 8 }}>Purchase Plan</div>
        <div className="plan-toggle" style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setPlan('one-time')}
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: 10,
              border: plan === 'one-time' ? '2px solid #1565C0' : '1px solid var(--color-border)',
              backgroundColor: plan === 'one-time' ? '#E3F2FD' : '#fff',
              color: plan === 'one-time' ? '#1565C0' : 'var(--color-charcoal)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
              minHeight: 44,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShoppingCart size={16} />
              One-Time Purchase
            </div>
            <div className="font-mono" style={{ fontSize: '1.1rem', marginTop: 6 }}>
              ${basePrice.toFixed(2)}<span style={{ fontSize: '0.7rem', fontWeight: 400 }}> / {purchaseUnit}</span>
            </div>
          </button>

          <button
            onClick={() => setPlan('autoship')}
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: 10,
              border: plan === 'autoship' ? '2px solid #2E7D32' : '1px solid var(--color-border)',
              backgroundColor: plan === 'autoship' ? '#E8F5E9' : '#fff',
              color: plan === 'autoship' ? '#2E7D32' : 'var(--color-charcoal)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
              minHeight: 44,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <RefreshCw size={16} />
              Subscribe &amp; Save 10%
            </div>
            <div className="font-mono" style={{ fontSize: '1.1rem', marginTop: 6 }}>
              ${autoshipPrice.toFixed(2)}<span style={{ fontSize: '0.7rem', fontWeight: 400 }}> / {purchaseUnit}</span>
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 400, marginTop: 2, opacity: 0.8 }}>
              Ships monthly · Cancel anytime
            </div>
          </button>
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="add-row" style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        {/* Qty selector */}
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            style={{ width: 40, height: '100%', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Minus size={16} />
          </button>
          <span className="font-mono" style={{ padding: '0 16px', fontSize: '1rem', fontWeight: 600, minWidth: 40, textAlign: 'center' }}>{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            style={{ width: 40, height: '100%', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '16px 24px',
            backgroundColor: added ? '#2E7D32' : '#1565C0',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: '0.88rem',
            fontWeight: 700,
            fontFamily: "'Barlow', Arial, sans-serif",
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? 'Added to Cart' : `Add ${qty} ${purchaseUnit}${qty > 1 ? (purchaseUnit === 'box' ? 'es' : 's') : ''} — $${(displayPrice * qty).toFixed(2)}`}
        </button>
      </div>

      {/* Savings callout */}
      {savings > 0 && (
        <div style={{ marginTop: 12, padding: '10px 16px', backgroundColor: '#E8F5E9', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RefreshCw size={14} color="#2E7D32" />
          <span style={{ fontSize: '0.82rem', color: '#2E7D32', fontWeight: 600 }}>
            You save ${savings.toFixed(2)} with Subscribe &amp; Save
          </span>
        </div>
      )}

      <p style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', marginTop: 12, lineHeight: 1.5 }}>
        Ships within 1-2 business days. Free shipping on orders over $200.
      </p>
    </div>
  );
}
