'use client';

import { useEffect, useState, useCallback } from 'react';
import { Package, Truck, Printer, ExternalLink, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface Order {
  id: string;
  email: string;
  status: string;
  total: number;
  shipping_name: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  label_url: string | null;
  shipping_carrier: string | null;
  shipping_service: string | null;
  shipped_at: string | null;
  created_at: string;
}

interface Rate {
  objectId: string;
  provider: string;
  servicelevel: string;
  amount: string;
  currency: string;
  estimatedDays: number | null;
  durationTerms: string;
}

const token = process.env.NEXT_PUBLIC_ADMIN_ANALYTICS_TOKEN ?? '';
const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, {
    ...opts,
    headers: { ...authHeaders, ...opts?.headers },
  });
  return res.json();
}

function fmtDate(iso: string) {
  if (!iso) return '--';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  paid: { bg: '#fef3c7', color: '#92400e' },
  processing: { bg: '#dbeafe', color: '#1e40af' },
  shipped: { bg: '#ede9fe', color: '#6d28d9' },
  delivered: { bg: '#dcfce7', color: '#166534' },
  cancelled: { bg: '#f3f4f6', color: '#6b7280' },
};

export default function ShippingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'needs_shipping' | 'shipped' | 'all'>('needs_shipping');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, Rate[]>>({});
  const [shipmentIds, setShipmentIds] = useState<Record<string, string>>({});
  const [loadingRates, setLoadingRates] = useState<Record<string, boolean>>({});
  const [buyingLabel, setBuyingLabel] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const statusFilter = filter === 'needs_shipping' ? 'paid' : filter === 'shipped' ? 'shipped' : '';
    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    params.set('limit', '50');
    const json = await apiFetch(`/api/admin/accounting/orders?${params}`);
    if (json.ok) {
      setOrders(json.data ?? []);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function getRates(order: Order) {
    if (!order.shipping_address_line1 || !order.shipping_city) {
      setErrors((prev) => ({ ...prev, [order.id]: 'Order has no shipping address' }));
      return;
    }

    setLoadingRates((prev) => ({ ...prev, [order.id]: true }));
    setErrors((prev) => ({ ...prev, [order.id]: '' }));

    try {
      const res = await apiFetch('/api/shipping/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addressTo: {
            name: order.shipping_name || 'Customer',
            street1: order.shipping_address_line1,
            street2: order.shipping_address_line2 || '',
            city: order.shipping_city,
            state: order.shipping_state || '',
            zip: order.shipping_zip || '',
            country: order.shipping_country || 'US',
            email: order.email,
          },
          // Estimate weight from order total (rough: $1 ≈ 0.5 lbs for gloves)
          weightLbs: Math.max(5, Math.round(order.total * 0.5)),
        }),
      });

      if (res.ok) {
        setRates((prev) => ({ ...prev, [order.id]: res.rates }));
        setShipmentIds((prev) => ({ ...prev, [order.id]: res.shipmentId }));
      } else {
        setErrors((prev) => ({ ...prev, [order.id]: res.error || 'Failed to get rates' }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [order.id]: 'Network error getting rates' }));
    } finally {
      setLoadingRates((prev) => ({ ...prev, [order.id]: false }));
    }
  }

  async function buyLabel(orderId: string, rate: Rate) {
    setBuyingLabel((prev) => ({ ...prev, [orderId]: true }));
    setErrors((prev) => ({ ...prev, [orderId]: '' }));

    try {
      const res = await apiFetch('/api/shipping/label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          rateId: rate.objectId,
          shipmentId: shipmentIds[orderId] || '',
          carrier: rate.provider,
          servicelevel: rate.servicelevel,
        }),
      });

      if (res.ok) {
        // Refresh the order list
        await load();
        // Open label in new tab
        if (res.labelUrl) {
          window.open(res.labelUrl, '_blank');
        }
      } else {
        setErrors((prev) => ({ ...prev, [orderId]: res.error || 'Failed to buy label' }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [orderId]: 'Network error purchasing label' }));
    } finally {
      setBuyingLabel((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid var(--color-border, #e4e1db)',
    borderRadius: 16,
    padding: 24,
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-charcoal, #1c1c1c)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Truck size={24} /> Shipping
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9a9590)', margin: '4px 0 0' }}>
          Get rates, buy labels, and track shipments via Shippo
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {([
          { key: 'needs_shipping', label: 'Needs Shipping' },
          { key: 'shipped', label: 'Shipped' },
          { key: 'all', label: 'All Orders' },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              border: '1px solid var(--color-border, #e4e1db)',
              fontSize: '0.82rem',
              fontWeight: filter === tab.key ? 700 : 500,
              cursor: 'pointer',
              backgroundColor: filter === tab.key ? 'var(--color-forest, #1b3a2d)' : '#fff',
              color: filter === tab.key ? '#fff' : 'var(--color-charcoal, #1c1c1c)',
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={load}
          style={{
            marginLeft: 'auto', padding: '8px 14px', borderRadius: 8,
            border: '1px solid var(--color-border)', fontSize: '0.82rem',
            cursor: 'pointer', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Orders list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: 60, color: 'var(--color-warm-gray)' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: 60, color: 'var(--color-warm-gray)' }}>
            <Package size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p>No orders to show.</p>
          </div>
        ) : (
          orders.map((order) => {
            const sc = STATUS_COLORS[order.status] ?? STATUS_COLORS.paid;
            const isExpanded = expandedOrder === order.id;
            const orderRates = rates[order.id] ?? [];
            const isLoadingRates = loadingRates[order.id] ?? false;
            const isBuyingLabel = buyingLabel[order.id] ?? false;
            const error = errors[order.id] ?? '';

            return (
              <div key={order.id} style={cardStyle}>
                {/* Order header row */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>
                        #{String(order.id).slice(-8)}
                      </span>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 9999,
                        background: sc.bg, color: sc.color, textTransform: 'uppercase',
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray)' }}>
                      {order.email} &middot; ${order.total?.toFixed(2)} &middot; {fmtDate(order.created_at)}
                    </div>
                  </div>

                  {/* Shipping address preview */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)', textAlign: 'right', maxWidth: 240 }}>
                    {order.shipping_name && <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{order.shipping_name}</div>}
                    {order.shipping_city && <div>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</div>}
                  </div>

                  {/* Tracking info if shipped */}
                  {order.tracking_number && (
                    <div style={{ fontSize: '0.78rem', textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{order.shipping_carrier}</div>
                      <div style={{ color: '#6d28d9' }}>{order.tracking_number}</div>
                    </div>
                  )}

                  {isExpanded ? <ChevronUp size={18} color="var(--color-warm-gray)" /> : <ChevronDown size={18} color="var(--color-warm-gray)" />}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border, #e4e1db)' }}>
                    {/* Full address */}
                    <div style={{ display: 'flex', gap: 32, marginBottom: 16, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-warm-gray)', marginBottom: 4 }}>Ship To</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
                          {order.shipping_name || 'N/A'}<br />
                          {order.shipping_address_line1 || 'N/A'}<br />
                          {order.shipping_address_line2 && <>{order.shipping_address_line2}<br /></>}
                          {order.shipping_city}, {order.shipping_state} {order.shipping_zip}<br />
                          {order.shipping_country || 'US'}
                        </div>
                      </div>

                      {order.tracking_number && (
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-warm-gray)', marginBottom: 4 }}>Tracking</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                            {order.shipping_carrier} — {order.shipping_service}<br />
                            <span style={{ fontFamily: 'monospace' }}>{order.tracking_number}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            {order.tracking_url && (
                              <a href={order.tracking_url} target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: '0.78rem', color: '#6d28d9', display: 'flex', alignItems: 'center', gap: 4 }}>
                                Track Package <ExternalLink size={12} />
                              </a>
                            )}
                            {order.label_url && (
                              <a href={order.label_url} target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: '0.78rem', color: 'var(--color-forest, #1b3a2d)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Printer size={12} /> Print Label
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions for unshipped orders */}
                    {!order.tracking_number && order.status === 'paid' && (
                      <div>
                        {orderRates.length === 0 && !isLoadingRates && (
                          <button
                            onClick={(e) => { e.stopPropagation(); getRates(order); }}
                            style={{
                              padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                              backgroundColor: 'var(--color-forest, #1b3a2d)', color: '#fff',
                              fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6,
                            }}
                          >
                            <Truck size={14} /> Get Shipping Rates
                          </button>
                        )}

                        {isLoadingRates && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-warm-gray)', fontSize: '0.85rem' }}>
                            <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Fetching carrier rates...
                          </div>
                        )}

                        {/* Rates table */}
                        {orderRates.length > 0 && (
                          <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-warm-gray)', marginBottom: 8 }}>
                              Available Rates
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                              <thead>
                                <tr>
                                  {['Carrier', 'Service', 'Est. Days', 'Price', ''].map((h) => (
                                    <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-warm-gray)', borderBottom: '1px solid var(--color-border)' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {orderRates.map((rate, i) => (
                                  <tr key={rate.objectId} style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: i === 0 ? '#f0fdf4' : 'transparent' }}>
                                    <td style={{ padding: '10px', fontWeight: 600 }}>{rate.provider}</td>
                                    <td style={{ padding: '10px' }}>{rate.servicelevel}</td>
                                    <td style={{ padding: '10px' }}>{rate.estimatedDays ?? '--'} days</td>
                                    <td style={{ padding: '10px', fontWeight: 700, fontFamily: 'monospace' }}>${rate.amount}</td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); buyLabel(order.id, rate); }}
                                        disabled={isBuyingLabel}
                                        style={{
                                          padding: '6px 14px', borderRadius: 6, border: 'none', cursor: isBuyingLabel ? 'not-allowed' : 'pointer',
                                          backgroundColor: i === 0 ? 'var(--color-forest, #1b3a2d)' : '#e5e7eb',
                                          color: i === 0 ? '#fff' : 'var(--color-charcoal)',
                                          fontWeight: 700, fontSize: '0.75rem',
                                        }}
                                      >
                                        {isBuyingLabel ? 'Buying...' : 'Buy Label'}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {error && (
                      <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 6, backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '0.82rem' }}>
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
