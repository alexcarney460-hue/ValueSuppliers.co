'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface OrderItem {
  id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  contact_id: string | null;
  email: string;
  phone: string | null;
  status: string;
  total: number;
  currency: string;
  shipping_name: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  shipping_carrier: string | null;
  shipping_service: string | null;
  shipped_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  order_items: OrderItem[];
}

interface Contact {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#fef3c7', color: '#92400e' },
  processing: { bg: '#dbeafe', color: '#1e40af' },
  shipped:    { bg: '#ede9fe', color: '#6d28d9' },
  delivered:  { bg: '#dcfce7', color: '#166534' },
  cancelled:  { bg: '#f3f4f6', color: '#6b7280' },
  refunded:   { bg: '#fef2f2', color: '#dc2626' },
};

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

const token = process.env.NEXT_PUBLIC_ADMIN_ANALYTICS_TOKEN ?? '';

async function apiFetch(path: string, options?: RequestInit) {
  const headers: Record<string, string> = { ...(options?.headers as Record<string, string> ?? {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (options?.body) headers['Content-Type'] = 'application/json';
  try {
    const res = await fetch(path, { ...options, headers });
    return await res.json();
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

function fmtCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso: string) {
  if (!iso) return '--';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function fmtDateTime(iso: string) {
  if (!iso) return '--';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--color-border, #e4e1db)',
  borderRadius: 16,
  padding: 24,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--color-warm-gray, #9a9590)',
  borderBottom: '1px solid var(--color-border, #e4e1db)',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  fontSize: '0.85rem',
  color: 'var(--color-charcoal, #1c1c1c)',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--color-warm-gray, #9a9590)',
  marginBottom: 4,
};

const valueStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--color-charcoal, #1c1c1c)',
  fontWeight: 500,
};

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid var(--color-border, #e4e1db)',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  background: '#fff',
};

const btnDestructive: React.CSSProperties = {
  ...btnStyle,
  background: '#fef2f2',
  color: '#dc2626',
  border: '1px solid #fecaca',
};

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--color-border, #e4e1db)',
  borderRadius: 10,
  padding: '9px 14px',
  fontSize: '0.85rem',
  outline: 'none',
  backgroundColor: '#fafaf9',
  width: '100%',
  boxSizing: 'border-box',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit mode
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    status: '',
    tracking_number: '',
    tracking_url: '',
    shipping_carrier: '',
    shipping_service: '',
    notes: '',
  });
  const [saving, setSaving] = useState(false);

  // Action states
  const [actionMsg, setActionMsg] = useState('');
  const [notifying, setNotifying] = useState(false);

  // Invoice / Receipt overlay
  const [overlay, setOverlay] = useState<'invoice' | 'receipt' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const json = await apiFetch(`/api/admin/accounting/orders/${orderId}`);
    if (json.ok) {
      setOrder(json.order);
      setContact(json.contact ?? null);
    } else {
      setError(json.error || 'Failed to load order');
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => { load(); }, [load]);

  /* -- Edit helpers -- */

  function startEdit() {
    if (!order) return;
    setEditFields({
      status: order.status,
      tracking_number: order.tracking_number ?? '',
      tracking_url: order.tracking_url ?? '',
      shipping_carrier: order.shipping_carrier ?? '',
      shipping_service: order.shipping_service ?? '',
      notes: order.notes ?? '',
    });
    setEditing(true);
    setActionMsg('');
  }

  function cancelEdit() {
    setEditing(false);
  }

  async function saveEdit() {
    setSaving(true);
    setActionMsg('');
    const json = await apiFetch(`/api/admin/accounting/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify(editFields),
    });
    if (json.ok) {
      setOrder(json.order);
      setEditing(false);
      setActionMsg('Order updated successfully.');
    } else {
      setActionMsg(`Error: ${json.error || 'Update failed'}`);
    }
    setSaving(false);
  }

  /* -- Action handlers -- */

  async function sendShippingNotification() {
    setNotifying(true);
    setActionMsg('');
    const json = await apiFetch(`/api/admin/accounting/orders/${orderId}/notify`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    if (json.ok) {
      setActionMsg('Shipping confirmation email sent.');
      load(); // refresh order
    } else {
      setActionMsg(`Error: ${json.error || 'Failed to send notification'}`);
    }
    setNotifying(false);
  }

  const [refunding, setRefunding] = useState(false);

  async function refundOrder() {
    if (!confirm('Are you sure you want to mark this order as refunded?')) return;
    setRefunding(true);
    setActionMsg('');
    const json = await apiFetch(`/api/admin/accounting/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'refunded' }),
    });
    if (json.ok) {
      setOrder(json.order);
      setActionMsg('Order marked as refunded.');
    } else {
      setActionMsg(`Error: ${json.error || 'Refund failed'}`);
    }
    setRefunding(false);
  }

  function handlePrint() {
    window.print();
  }

  /* -- Render helpers -- */

  const sc = STATUS_COLORS[order?.status ?? 'pending'] ?? STATUS_COLORS.pending;
  const shortId = order ? `#${String(order.id).slice(-8)}` : '';

  const customerName = contact
    ? [contact.first_name, contact.last_name].filter(Boolean).join(' ') || order?.shipping_name || '--'
    : order?.shipping_name || '--';

  const customerEmail = contact?.email || order?.email || '--';
  const customerPhone = contact?.phone || order?.phone || '--';
  const customerCompany = contact?.company || '--';

  function addressLines(): string[] {
    if (!order) return [];
    const parts: string[] = [];
    if (order.shipping_address_line1) parts.push(order.shipping_address_line1);
    if (order.shipping_address_line2) parts.push(order.shipping_address_line2);
    const cityLine = [order.shipping_city, order.shipping_state, order.shipping_zip].filter(Boolean).join(', ');
    if (cityLine) parts.push(cityLine);
    if (order.shipping_country && order.shipping_country !== 'US') parts.push(order.shipping_country);
    return parts;
  }

  /* ---------------------------------------------------------------- */
  /* Invoice / Receipt Overlay                                         */
  /* ---------------------------------------------------------------- */

  function renderDocumentOverlay(type: 'invoice' | 'receipt') {
    if (!order) return null;
    const items = order.order_items ?? [];
    const title = type === 'invoice' ? 'INVOICE' : 'RECEIPT';
    const dateLabel = type === 'invoice' ? 'Invoice Date' : 'Receipt Date';

    return (
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}
        onClick={() => setOverlay(null)}
      >
        <div
          style={{
            background: '#fff', borderRadius: 12, maxWidth: 700, width: '100%',
            maxHeight: '90vh', overflow: 'auto', padding: 40,
          }}
          onClick={(e) => e.stopPropagation()}
          className="print-document"
        >
          {/* Close + Print buttons (hidden on print) */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 20 }}>
            <button style={btnStyle} onClick={() => window.print()}>Print</button>
            <button style={btnStyle} onClick={() => setOverlay(null)}>Close</button>
          </div>

          {/* Company Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1c1c', margin: 0 }}>Value Suppliers</h1>
            <p style={{ fontSize: '0.82rem', color: '#9a9590', margin: '4px 0 0' }}>
              1401 N Clovis Ave STE #103, Clovis, CA 93727
            </p>
            <p style={{ fontSize: '0.82rem', color: '#9a9590', margin: '2px 0 0' }}>
              admin@valuesuppliersdirect.com | valuesuppliers.co
            </p>
          </div>

          {/* Document Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1c1c1c', margin: 0, letterSpacing: '0.1em' }}>{title}</h2>
          </div>

          {/* Order Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <div style={labelStyle}>Bill To</div>
              <div style={valueStyle}>{customerName}</div>
              <div style={{ fontSize: '0.82rem', color: '#9a9590' }}>{customerEmail}</div>
              {customerPhone !== '--' && <div style={{ fontSize: '0.82rem', color: '#9a9590' }}>{customerPhone}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={labelStyle}>Order ID</div>
              <div style={valueStyle}>{shortId}</div>
              <div style={{ ...labelStyle, marginTop: 12 }}>{dateLabel}</div>
              <div style={valueStyle}>{fmtDate(order.created_at)}</div>
            </div>
          </div>

          {/* Ship To */}
          {addressLines().length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={labelStyle}>Ship To</div>
              {order.shipping_name && <div style={valueStyle}>{order.shipping_name}</div>}
              {addressLines().map((line, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: '#9a9590' }}>{line}</div>
              ))}
            </div>
          )}

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
              <tr>
                {['Product', 'Qty', 'Unit Price', 'Total'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border, #e4e1db)' }}>
                  <td style={tdStyle}>{item.product_name}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtCurrency(item.unit_price ?? 0)}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmtCurrency(item.total_price ?? 0)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, fontSize: '0.9rem' }}>Total</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-forest, #1b3a2d)' }}>
                  {fmtCurrency(order.total ?? 0)}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Notes */}
          {order.notes && (
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>Notes</div>
              <div style={{ fontSize: '0.82rem', color: '#9a9590' }}>{order.notes}</div>
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: 'center', paddingTop: 20, borderTop: '1px solid #e4e1db' }}>
            <p style={{ fontSize: '0.75rem', color: '#9a9590', margin: 0 }}>
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Main Render                                                       */
  /* ---------------------------------------------------------------- */

  if (loading) {
    return (
      <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-warm-gray, #9a9590)' }}>Loading order...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <a
          href="/admin/accounting/orders"
          style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9a9590)', textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}
        >
          &larr; Back to Orders
        </a>
        <div style={{ ...cardStyle, textAlign: 'center', padding: 60, color: 'var(--color-warm-gray, #9a9590)' }}>
          {error || 'Order not found.'}
        </div>
      </div>
    );
  }

  const items = order.order_items ?? [];

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body > *:not(.print-document) { display: none !important; }
          .no-print { display: none !important; }
          .print-document {
            position: static !important;
            box-shadow: none !important;
            max-height: none !important;
          }
        }
      `}</style>

      <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <a
            href="/admin/accounting/orders"
            style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9a9590)', textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}
          >
            &larr; Back to Orders
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-charcoal, #1c1c1c)', margin: 0 }}>
              Order {shortId}
            </h1>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px',
              borderRadius: 9999, background: sc.bg, color: sc.color,
            }}>
              {order.status}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9a9590)', marginLeft: 'auto' }}>
              {fmtDateTime(order.created_at)}
            </span>
          </div>
        </div>

        {/* Action message */}
        {actionMsg && (
          <div style={{
            padding: '10px 16px', marginBottom: 16, borderRadius: 10,
            fontSize: '0.82rem', fontWeight: 600,
            background: actionMsg.startsWith('Error') ? '#fef2f2' : '#dcfce7',
            color: actionMsg.startsWith('Error') ? '#dc2626' : '#166534',
            border: `1px solid ${actionMsg.startsWith('Error') ? '#fecaca' : '#bbf7d0'}`,
          }}>
            {actionMsg}
          </div>
        )}

        {/* Two-column info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Customer Info */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={labelStyle}>Name</div>
                <div style={valueStyle}>{customerName}</div>
              </div>
              <div>
                <div style={labelStyle}>Email</div>
                <div style={valueStyle}>{customerEmail}</div>
              </div>
              <div>
                <div style={labelStyle}>Phone</div>
                <div style={valueStyle}>{customerPhone}</div>
              </div>
              <div>
                <div style={labelStyle}>Company</div>
                <div style={valueStyle}>{customerCompany}</div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Shipping Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={labelStyle}>Address</div>
                {addressLines().length > 0 ? (
                  addressLines().map((line, i) => (
                    <div key={i} style={valueStyle}>{line}</div>
                  ))
                ) : (
                  <div style={valueStyle}>--</div>
                )}
              </div>
              <div>
                <div style={labelStyle}>Tracking Number</div>
                <div style={valueStyle}>{order.tracking_number || '--'}</div>
              </div>
              <div>
                <div style={labelStyle}>Tracking URL</div>
                {order.tracking_url ? (
                  <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" style={{ ...valueStyle, color: '#1a56db', textDecoration: 'underline' }}>
                    {order.tracking_url}
                  </a>
                ) : (
                  <div style={valueStyle}>--</div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={labelStyle}>Carrier</div>
                  <div style={valueStyle}>{order.shipping_carrier || '--'}</div>
                </div>
                <div>
                  <div style={labelStyle}>Service</div>
                  <div style={valueStyle}>{order.shipping_service || '--'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Order Items
          </h3>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-warm-gray, #9a9590)' }}>No items.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Product', 'Quantity', 'Unit Price', 'Line Total'].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border, #e4e1db)' }}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{item.product_name}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{fmtCurrency(item.unit_price ?? 0)}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmtCurrency(item.total_price ?? 0)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, fontSize: '0.95rem' }}>Order Total</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest, #1b3a2d)' }}>
                    {fmtCurrency(order.total ?? 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Notes */}
        {order.notes && !editing && (
          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Notes
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal, #1c1c1c)', margin: 0, whiteSpace: 'pre-wrap' }}>{order.notes}</p>
          </div>
        )}

        {/* Edit Mode */}
        {editing && (
          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Edit Order
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={labelStyle}>Status</div>
                <select
                  value={editFields.status}
                  onChange={(e) => setEditFields({ ...editFields, status: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <div style={labelStyle}>Tracking Number</div>
                <input
                  value={editFields.tracking_number}
                  onChange={(e) => setEditFields({ ...editFields, tracking_number: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. 1Z999AA10123456784"
                />
              </div>
              <div>
                <div style={labelStyle}>Tracking URL</div>
                <input
                  value={editFields.tracking_url}
                  onChange={(e) => setEditFields({ ...editFields, tracking_url: e.target.value })}
                  style={inputStyle}
                  placeholder="https://..."
                />
              </div>
              <div>
                <div style={labelStyle}>Shipping Carrier</div>
                <input
                  value={editFields.shipping_carrier}
                  onChange={(e) => setEditFields({ ...editFields, shipping_carrier: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. UPS, USPS, FedEx"
                />
              </div>
              <div>
                <div style={labelStyle}>Shipping Service</div>
                <input
                  value={editFields.shipping_service}
                  onChange={(e) => setEditFields({ ...editFields, shipping_service: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Ground, Priority"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={labelStyle}>Notes</div>
                <textarea
                  value={editFields.notes}
                  onChange={(e) => setEditFields({ ...editFields, notes: e.target.value })}
                  style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                  placeholder="Internal notes..."
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button
                style={{ ...btnStyle, background: 'var(--color-charcoal, #1c1c1c)', color: '#fff', border: 'none' }}
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button style={btnStyle} onClick={cancelEdit} disabled={saving}>Cancel</button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-charcoal, #1c1c1c)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Actions
          </h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {!editing && (
              <button style={btnStyle} onClick={startEdit}>Edit Order</button>
            )}
            <button
              style={btnStyle}
              onClick={sendShippingNotification}
              disabled={notifying}
            >
              {notifying ? 'Sending...' : 'Send Shipping Confirmation'}
            </button>
            <button style={btnStyle} onClick={handlePrint}>Print Order</button>
            <button style={btnStyle} onClick={() => setOverlay('invoice')}>Create Invoice</button>
            <button style={btnStyle} onClick={() => setOverlay('receipt')}>Create Receipt</button>
            <button style={btnDestructive} onClick={refundOrder} disabled={refunding}>{refunding ? 'Processing...' : 'Refund Order'}</button>
          </div>
        </div>
      </div>

      {/* Invoice/Receipt Overlay */}
      {overlay && renderDocumentOverlay(overlay)}
    </>
  );
}
