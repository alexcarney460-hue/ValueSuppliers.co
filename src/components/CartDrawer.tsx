'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, RefreshCw, ShoppingBag, ArrowRight, AlertCircle, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, closeCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const hasAutoship = items.some((i) => i.plan === 'autoship');
  const hasOneTime  = items.some((i) => i.plan === 'one-time');
  const mixedPlans  = hasAutoship && hasOneTime;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCart]);

  async function handleCheckout() {
    if (mixedPlans) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 300,
            animation: 'fadeIn 200ms ease',
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 460,
          backgroundColor: '#fff',
          zIndex: 400,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 340ms cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isOpen ? '-8px 0 48px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={18} color="var(--color-forest)" />
            <span className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)' }}>
              Your Cart
            </span>
            {count > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-amber)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-warm-gray)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 6,
              transition: 'background-color 150ms ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <ShoppingBag size={40} color="var(--color-border)" style={{ margin: '0 auto 16px' }} />
              <p className="font-heading" style={{ color: 'var(--color-charcoal)', marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.875rem', marginBottom: 24 }}>
                Add products from the catalog to get started.
              </p>
              <Link
                href="/catalog"
                onClick={closeCart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'var(--color-forest)',
                  color: '#fff',
                  padding: '11px 24px',
                  borderRadius: 8,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Browse Catalog <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.plan}`}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--color-border)',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 10,
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-sage-light)',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="68px" />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: 4, lineHeight: 1.3 }}>
                      {item.name}
                    </div>

                    {/* Plan badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      {item.plan === 'autoship' ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            backgroundColor: '#EDF7F0',
                            color: 'var(--color-muted-green)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 4,
                            letterSpacing: '0.05em',
                          }}
                        >
                          <RefreshCw size={9} /> Subscribe & Save
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: 'var(--color-sage-light)',
                            color: 'var(--color-warm-gray)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: 4,
                            letterSpacing: '0.05em',
                          }}
                        >
                          One-Time
                        </span>
                      )}
                    </div>

                    {/* Qty + price row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--color-border)', borderRadius: 7, overflow: 'hidden' }}>
                        <button
                          onClick={() => updateQty(item.id, item.plan, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-charcoal)', minWidth: 24, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.plan, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id, item.plan)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-warm-gray)', display: 'flex', padding: 4 }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '20px 24px',
              flexShrink: 0,
              backgroundColor: '#fff',
            }}
          >
            {/* Mixed plan warning */}
            {mixedPlans && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  backgroundColor: '#FFF8EC',
                  border: '1px solid rgba(200,146,42,0.3)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  marginBottom: 16,
                }}
              >
                <AlertCircle size={15} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: '0.78rem', color: 'var(--color-charcoal)', lineHeight: 1.5, margin: 0 }}>
                  One-time and subscription items must be purchased separately. Please remove one type to continue.
                </p>
              </div>
            )}

            {/* Autoship notice */}
            {hasAutoship && !mixedPlans && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  backgroundColor: '#EDF7F0',
                  borderRadius: 8,
                  padding: '9px 12px',
                  marginBottom: 14,
                }}
              >
                <RefreshCw size={13} color="var(--color-muted-green)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-green)', fontWeight: 600 }}>
                  Monthly delivery · Cancel anytime in your account
                </span>
              </div>
            )}

            {/* Shipping estimate */}
            {(() => {
              const shipping = calculateShipping(
                items.map((i) => ({ slug: i.id, quantity: i.quantity, price: i.price }))
              );
              const orderTotal = total + shipping.shippingCost;
              const amountToFree = FREE_SHIPPING_THRESHOLD - total;

              return (
                <>
                  {/* Subtotal */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ color: 'var(--color-warm-gray)', fontSize: '0.82rem' }}>
                      {hasAutoship ? 'Monthly subtotal' : 'Subtotal'}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping line */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ color: 'var(--color-warm-gray)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Truck size={13} /> Shipping
                    </span>
                    <span className="font-mono" style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: shipping.isFreeShipping ? '#16A34A' : 'var(--color-charcoal)',
                    }}>
                      {shipping.isFreeShipping ? 'FREE' : `$${shipping.shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Free shipping progress hint */}
                  {!shipping.isFreeShipping && amountToFree > 0 && (
                    <div style={{
                      fontSize: '0.72rem',
                      color: '#16A34A',
                      marginBottom: 10,
                      textAlign: 'right',
                    }}>
                      Add ${amountToFree.toFixed(2)} more for free shipping
                    </div>
                  )}

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--color-border)', marginBottom: 10 }} />

                  {/* Order total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem', fontWeight: 700 }}>
                      Estimated Total
                    </span>
                    <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </>
              );
            })()}

            {error && (
              <p style={{ color: 'var(--color-alert-red)', fontSize: '0.78rem', marginBottom: 10 }}>{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading || mixedPlans}
              className="vs-btn-forest"
              style={{
                width: '100%',
                backgroundColor: mixedPlans ? 'var(--color-border)' : 'var(--color-forest)',
                color: mixedPlans ? 'var(--color-warm-gray)' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '15px 24px',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: mixedPlans ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              {!loading && <ArrowRight size={16} />}
            </button>

            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-warm-gray)',
                fontSize: '0.75rem',
                marginTop: 10,
                display: 'block',
                width: '100%',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}
