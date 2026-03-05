'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart, type PurchasePlan } from '@/context/CartContext';
import { AUTOSHIP_DISCOUNT } from '@/lib/stripe';
import { formatPrice, roundMoney } from '@/lib/pricing';

type Props = {
  id: string;
  name: string;
  price: number;       // retail price
  img: string;
  unit: string;
};

export default function AddToCartPanel({ id, name, price, img, unit }: Props) {
  const { addItem } = useCart();
  const [plan, setPlan] = useState<PurchasePlan>('one-time');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const autoshipPrice = roundMoney(price * (1 - AUTOSHIP_DISCOUNT));
  const displayPrice = plan === 'autoship' ? autoshipPrice : price;
  const savings = plan === 'autoship' ? roundMoney(price * qty - autoshipPrice * qty) : 0;

  function handleAdd() {
    addItem({ id, name, price: displayPrice, plan, img, unit });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      {/* Plan selector */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* One-time option */}
          <button
            onClick={() => setPlan('one-time')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 18px',
              background: plan === 'one-time' ? 'var(--color-bg)' : '#fff',
              border: 'none',
              borderBottom: '1px solid var(--color-border)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 150ms ease',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${plan === 'one-time' ? 'var(--color-forest)' : 'var(--color-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 150ms ease',
              }}
            >
              {plan === 'one-time' && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-forest)' }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
                One-Time Purchase
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', marginTop: 2 }}>
                Order as needed, no commitment
              </div>
            </div>
            <span className="font-mono" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
              {formatPrice(price)}
            </span>
          </button>

          {/* Subscribe & Save option */}
          <button
            onClick={() => setPlan('autoship')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 18px',
              background: plan === 'autoship' ? '#EDF7F0' : '#fff',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background-color 150ms ease',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${plan === 'autoship' ? 'var(--color-muted-green)' : 'var(--color-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 150ms ease',
              }}
            >
              {plan === 'autoship' && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-muted-green)' }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
                  Subscribe & Save
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--color-muted-green)',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: 4,
                    letterSpacing: '0.06em',
                  }}
                >
                  10% OFF
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-green)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                <RefreshCw size={10} />
                Monthly delivery · Cancel anytime
              </div>
            </div>
            <span className="font-mono" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-muted-green)' }}>
              {formatPrice(autoshipPrice)}
            </span>
          </button>
        </div>

        {plan === 'autoship' && (
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-green)', marginTop: 8, fontWeight: 600 }}>
            ✓ You save {formatPrice(roundMoney(price - autoshipPrice))} per case vs. one-time pricing
          </p>
        )}
      </div>

      {/* Quantity + price row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid var(--color-border)', borderRadius: 9 }}>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 14px',
              color: 'var(--color-charcoal)',
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            −
          </button>
          <span
            className="font-mono"
            style={{
              minWidth: 32,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--color-charcoal)',
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 14px',
              color: 'var(--color-charcoal)',
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            +
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-charcoal)', lineHeight: 1 }}>
            {formatPrice(roundMoney(displayPrice * qty))}
          </div>
          {qty > 1 && (
            <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray)', marginTop: 3 }}>
              {formatPrice(displayPrice)} × {qty} cases
            </div>
          )}
          {savings > 0 && (
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', fontWeight: 600, marginTop: 2 }}>
              Saving {formatPrice(savings)} vs. one-time
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button
          onClick={handleAdd}
          className="vs-btn-forest"
          style={{
            flex: 1,
            backgroundColor: added ? 'var(--color-muted-green)' : 'var(--color-forest)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '15px 20px',
            fontFamily: "'Barlow', Arial, sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background-color 250ms ease, transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {added ? (
            <><CheckCircle size={15} /> Added!</>
          ) : (
            <><ShoppingCart size={15} /> Add to Cart</>
          )}
        </button>
        <Link
          href="/contact"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-charcoal)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 10,
            padding: '15px 18px',
            fontFamily: "'Barlow', Arial, sans-serif",
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            transition: 'border-color 150ms ease',
          }}
        >
          Quote
        </Link>
      </div>

      {/* Wholesale upgrade prompt */}
      <div
        style={{
          backgroundColor: 'var(--color-sage-light)',
          borderRadius: 10,
          padding: '13px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: 2 }}>
            Buying 5+ cases / month?
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>
            Wholesale accounts save 20% on every order
          </div>
        </div>
        <Link
          href="/wholesale"
          style={{
            color: 'var(--color-forest)',
            fontFamily: "'Barlow', Arial, sans-serif",
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            whiteSpace: 'nowrap',
          }}
        >
          Apply <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
