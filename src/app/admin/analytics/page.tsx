'use client';

import { useEffect, useState } from 'react';

interface Totals {
  totalContacts: number;
  newContactsThisMonth: number;
  totalCompanies: number;
  newCompaniesThisMonth: number;
  totalOrders: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
}
interface SourceRow   { source: string;   count: number }
interface IndustryRow { industry: string; count: number }
interface StatusRow   { status: string;   count: number }
interface TrendRow    { month: string;    orders: number; revenue: number }
interface RecentContact { id: number; firstname: string; lastname: string; email: string; source: string; created_at: string }
interface RecentOrder   { id: number; total: number; status: string; created_at: string }

interface AnalyticsData {
  totals: Totals;
  sources: SourceRow[];
  industries: IndustryRow[];
  order_statuses: StatusRow[];
  monthly_trend: TrendRow[];
  recent_contacts: RecentContact[];
  recent_orders: RecentOrder[];
}

const CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  border: '1px solid var(--color-border, #E4E1DB)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  padding: 24,
};

const LABEL: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--color-warm-gray, #9A9590)',
};

const BIG_NUM: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 900,
  color: 'var(--color-charcoal, #1C1C1C)',
  lineHeight: 1.1,
  marginTop: 4,
};

const SUB_STYLE: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--color-warm-gray, #9A9590)',
  marginTop: 2,
};

const TH_STYLE: React.CSSProperties = {
  padding: '6px 8px',
  fontWeight: 700,
  color: 'var(--color-warm-gray, #9A9590)',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const TD_STYLE: React.CSSProperties = { padding: '8px 8px' };
const ROW_BORDER = '1px solid var(--color-border, #E4E1DB)';

const STATUS_COLORS: Record<string, string> = {
  completed: '#2d8a4e', paid: '#2d8a4e', pending: '#C8922A',
  processing: '#3b82f6', shipped: '#6366f1', cancelled: '#dc2626',
  refunded: '#9333ea', unknown: '#9A9590',
};

function statusColor(s: string): string {
  return STATUS_COLORS[s.toLowerCase()] ?? '#9A9590';
}

function fmtCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtMonth(key: string): string {
  const parts = key.split('-');
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1);
  return date.toLocaleString('en-US', { month: 'short' });
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs / 24);
  return days + 'd ago';
}

function SummaryCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={CARD}>
      <div style={LABEL}>{label}</div>
      <div style={BIG_NUM}>{value}</div>
      {sub && <div style={SUB_STYLE}>{sub}</div>}
    </div>
  );
}

function HorizontalBars({ items, color = 'var(--color-forest, #1B3A2D)' }: { items: { label: string; count: number }[]; color?: string }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  if (items.length === 0) {
    return <div style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9A9590)', padding: '12px 0' }}>No data yet</div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item) => (
        <div key={item.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-charcoal, #1C1C1C)' }}>{item.label}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-warm-gray, #9A9590)' }}>{fmtNum(item.count)}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'var(--color-border, #E4E1DB)' }}>
            <div style={{ height: '100%', borderRadius: 4, width: (item.count / max) * 100 + '%', background: color, transition: 'width 600ms ease' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function RevenueTrend({ data }: { data: TrendRow[] }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, paddingTop: 20 }}>
      {data.map((d) => {
        const pct = (d.revenue / max) * 100;
        return (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-charcoal, #1C1C1C)', whiteSpace: 'nowrap' }}>
              {d.revenue > 0 ? fmtCurrency(d.revenue) : '--'}
            </div>
            <div style={{ width: '100%', maxWidth: 48, borderRadius: '6px 6px 2px 2px', background: pct > 0 ? 'var(--color-forest, #1B3A2D)' : 'var(--color-border, #E4E1DB)', height: Math.max(pct, 4) + '%', transition: 'height 600ms ease', minHeight: 6 }} />
            <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray, #9A9590)', fontWeight: 600 }}>{fmtMonth(d.month)}</div>
          </div>
        );
      })}
    </div>
  );
}

function OrderStatusBar({ data }: { data: StatusRow[] }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  if (data.length === 0) {
    return <div style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9A9590)', padding: '12px 0' }}>No orders yet</div>;
  }
  return (
    <div>
      <div style={{ display: 'flex', height: 24, borderRadius: 12, overflow: 'hidden', background: 'var(--color-border, #E4E1DB)' }}>
        {data.map((d) => (
          <div key={d.status} style={{ width: (d.count / total) * 100 + '%', background: statusColor(d.status), transition: 'width 600ms ease' }} title={d.status + ': ' + d.count} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
        {data.map((d) => (
          <div key={d.status} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: statusColor(d.status) }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-charcoal, #1C1C1C)' }}>{d.status}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray, #9A9590)' }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = process.env.NEXT_PUBLIC_ADMIN_ANALYTICS_TOKEN;
        const res = await fetch('/api/admin/analytics', {
          headers: { Authorization: 'Bearer ' + (token ?? '') },
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'Failed to load analytics');
        setData(json.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 80, minHeight: '60vh' }}>
        <div style={{ color: 'var(--color-warm-gray, #9A9590)', fontWeight: 600 }}>Loading analytics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 80, minHeight: '60vh' }}>
        <div style={{ color: '#dc2626', fontWeight: 600 }}>{error || 'Failed to load data'}</div>
      </div>
    );
  }

  const { totals, sources, industries, order_statuses, monthly_trend, recent_contacts, recent_orders } = data;

  return (
    <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f6 100%)', minHeight: '100vh' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-charcoal, #1C1C1C)', margin: 0 }}>Analytics</h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9A9590)', margin: '4px 0 0' }}>CRM and revenue overview</p>
        </div>

        {/* 1. Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <SummaryCard label="Total Contacts" value={fmtNum(totals.totalContacts)} sub={'+' + fmtNum(totals.newContactsThisMonth) + ' this month'} />
          <SummaryCard label="Total Companies" value={fmtNum(totals.totalCompanies)} sub={'+' + fmtNum(totals.newCompaniesThisMonth) + ' this month'} />
          <SummaryCard label="Total Orders" value={fmtNum(totals.totalOrders)} sub={fmtNum(totals.ordersThisMonth) + ' this month'} />
          <SummaryCard label="Revenue This Month" value={fmtCurrency(totals.revenueThisMonth)} />
        </div>

        {/* 2. Monthly Trend */}
        <div style={{ ...CARD, marginBottom: 28 }}>
          <div style={{ ...LABEL, marginBottom: 16 }}>Revenue &mdash; Last 6 Months</div>
          <RevenueTrend data={monthly_trend} />
        </div>

        {/* 3 & 4. Sources + Industries */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 14 }}>Top Lead Sources</div>
            <HorizontalBars items={sources.map((s) => ({ label: s.source, count: s.count }))} />
          </div>
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 14 }}>Top Industries</div>
            <HorizontalBars items={industries.map((i) => ({ label: i.industry, count: i.count }))} color="var(--color-amber, #C8922A)" />
          </div>
        </div>

        {/* 5. Order Status Breakdown */}
        <div style={{ ...CARD, marginBottom: 28 }}>
          <div style={{ ...LABEL, marginBottom: 14 }}>Order Status Breakdown</div>
          <OrderStatusBar data={order_statuses} />
        </div>

        {/* 6. Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {/* Recent Contacts */}
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 14 }}>Recent Contacts</div>
            {recent_contacts.length === 0 ? (
              <div style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9A9590)' }}>No contacts yet</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: ROW_BORDER }}>
                      <th style={{ ...TH_STYLE, textAlign: 'left' }}>Name</th>
                      <th style={{ ...TH_STYLE, textAlign: 'left' }}>Source</th>
                      <th style={{ ...TH_STYLE, textAlign: 'right' }}>When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_contacts.map((c) => (
                      <tr key={c.id} style={{ borderBottom: ROW_BORDER }}>
                        <td style={TD_STYLE}>
                          <div style={{ fontWeight: 700, color: 'var(--color-charcoal, #1C1C1C)' }}>
                            {[c.firstname, c.lastname].filter(Boolean).join(' ') || '(unnamed)'}
                          </div>
                          {c.email && <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray, #9A9590)', marginTop: 1 }}>{c.email}</div>}
                        </td>
                        <td style={{ ...TD_STYLE, color: 'var(--color-warm-gray, #9A9590)' }}>{c.source || '--'}</td>
                        <td style={{ ...TD_STYLE, textAlign: 'right', color: 'var(--color-warm-gray, #9A9590)', whiteSpace: 'nowrap' }}>
                          {c.created_at ? relativeTime(c.created_at) : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 14 }}>Recent Orders</div>
            {recent_orders.length === 0 ? (
              <div style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray, #9A9590)' }}>No orders yet</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: ROW_BORDER }}>
                      <th style={{ ...TH_STYLE, textAlign: 'left' }}>Order</th>
                      <th style={{ ...TH_STYLE, textAlign: 'left' }}>Status</th>
                      <th style={{ ...TH_STYLE, textAlign: 'right' }}>Total</th>
                      <th style={{ ...TH_STYLE, textAlign: 'right' }}>When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_orders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: ROW_BORDER }}>
                        <td style={{ ...TD_STYLE, fontWeight: 700, color: 'var(--color-charcoal, #1C1C1C)' }}>#{o.id}</td>
                        <td style={TD_STYLE}>
                          <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 700, background: statusColor(o.status) + '18', color: statusColor(o.status) }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ ...TD_STYLE, textAlign: 'right', fontWeight: 600, color: 'var(--color-charcoal, #1C1C1C)' }}>{fmtCurrency(o.total)}</td>
                        <td style={{ ...TD_STYLE, textAlign: 'right', color: 'var(--color-warm-gray, #9A9590)', whiteSpace: 'nowrap' }}>
                          {o.created_at ? relativeTime(o.created_at) : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
