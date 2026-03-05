import type { Metadata } from 'next';
import { BadgeCheck, Truck, DollarSign, User, FileText, Phone } from 'lucide-react';

export const metadata: Metadata = { title: 'Distribution Program' };

const BENEFITS = [
  { icon: DollarSign, title: '30% Off Retail', desc: 'Distribution accounts get the deepest discount — 30% below retail pricing on every SKU, every order.' },
  { icon: Truck, title: 'Priority Allocation', desc: 'Distribution partners are fulfilled first. You get inventory priority before wholesale and retail channels.' },
  { icon: FileText, title: 'NET 30 Terms', desc: 'Qualify for NET 30 billing after account approval. Invoice-based ordering for established operations.' },
  { icon: User, title: 'Dedicated Rep', desc: 'Direct line to your account manager for custom orders, volume quotes, and restock scheduling.' },
  { icon: BadgeCheck, title: 'Custom Pricing Tiers', desc: 'At 100+ case/month volume, we build a custom pricing agreement tailored to your operation.' },
  { icon: Phone, title: 'After-Hours Support', desc: 'Distribution accounts get priority support contact for urgent restock situations.' },
];

const COMPARISON = [
  { label: 'Discount off Retail',     retail: '—',         wholesale: '20% off',   distribution: '30% off' },
  { label: 'Minimum Order',           retail: '1 case',    wholesale: '5 cases',   distribution: '25 cases' },
  { label: 'Monthly Volume',          retail: 'Any',       wholesale: '5+ cases',  distribution: '25+ cases' },
  { label: 'NET Terms',               retail: 'No',        wholesale: 'No',        distribution: 'NET 30' },
  { label: 'Dedicated Account Rep',   retail: 'No',        wholesale: 'No',        distribution: 'Yes' },
  { label: 'Inventory Priority',      retail: 'No',        wholesale: 'No',        distribution: 'Yes' },
  { label: 'Custom Pricing Available',retail: 'No',        wholesale: 'No',        distribution: 'Yes (100+ cases)' },
];

export default function DistributionPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '72px 24px 64px', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Distribution Program</span>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginTop: 12, lineHeight: 1.05 }}
          >
            Built for Commercial Volume.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', marginTop: 20, maxWidth: 560, margin: '20px auto 0', lineHeight: 1.7 }}>
            Licensed grows, commercial operations, and resellers — apply for distribution access and get 30% off retail on every order.
          </p>

          {/* Tier badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 36, backgroundColor: 'rgba(200,146,42,0.15)', border: '1px solid var(--color-amber)', borderRadius: 12, padding: '16px 28px' }}>
            <span className="font-display" style={{ fontSize: '2rem', color: 'var(--color-amber)', lineHeight: 1 }}>30%</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--color-amber)', fontWeight: 700, fontSize: '0.9rem' }}>Off Retail — Distribution Tier</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>25+ cases / month minimum</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Comparison Table */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Pricing Tiers</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
              How the Tiers Compare
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}></th>
                  {['Retail', 'Wholesale', 'Distribution'].map((tier, i) => (
                    <th
                      key={tier}
                      style={{
                        padding: '14px 20px',
                        textAlign: 'center',
                        borderBottom: `2px solid ${i === 2 ? 'var(--color-amber)' : 'var(--color-border)'}`,
                        backgroundColor: i === 2 ? 'rgba(200,146,42,0.06)' : 'transparent',
                      }}
                    >
                      <span
                        className="label-caps"
                        style={{
                          color: i === 2 ? 'var(--color-amber)' : i === 1 ? 'var(--color-muted-green)' : 'var(--color-warm-gray)',
                          fontSize: '0.72rem',
                        }}
                      >
                        {tier}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, ri) => (
                  <tr key={row.label} style={{ backgroundColor: ri % 2 === 0 ? 'var(--color-bg)' : '#fff' }}>
                    <td style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-warm-gray)' }}>
                      {row.retail}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-muted-green)', fontWeight: 500 }}>
                      {row.wholesale}
                    </td>
                    <td style={{
                      padding: '14px 20px',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      color: 'var(--color-amber)',
                      fontWeight: 600,
                      backgroundColor: 'rgba(200,146,42,0.06)',
                    }}>
                      {row.distribution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: 'var(--color-bg)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What You Get</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
              Distribution Partner Benefits
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: '28px 24px',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-amber)',
                }}
              >
                <Icon size={24} color="var(--color-amber)" style={{ marginBottom: 14 }} />
                <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 8, color: 'var(--color-charcoal)' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Apply Now</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
              Distribution Application
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', marginTop: 12 }}>
              Applications are reviewed within 1 business day. You'll receive account credentials and NET 30 terms upon approval.
            </p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Business Name', type: 'text', placeholder: 'Legal business name' },
              { label: 'Business Email', type: 'email', placeholder: 'orders@yourbusiness.com' },
              { label: 'Phone Number', type: 'tel', placeholder: '(555) 000-0000' },
              { label: 'Website (optional)', type: 'url', placeholder: 'https://yourbusiness.com' },
            ].map(({ label, type, placeholder }) => (
              <div key={label}>
                <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                />
              </div>
            ))}

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>
                Operation Type
              </label>
              <select style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '0.95rem', backgroundColor: '#fff', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <option value="">Select your operation type</option>
                <option>Licensed Cannabis Grow</option>
                <option>Commercial Greenhouse</option>
                <option>Product Reseller / Distributor</option>
                <option>Hydro Store Chain (3+ locations)</option>
                <option>Dispensary Group</option>
                <option>Other Commercial Operation</option>
              </select>
            </div>

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>
                Estimated Monthly Volume
              </label>
              <select style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '0.95rem', backgroundColor: '#fff', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <option value="">Select volume range</option>
                <option>25–50 cases / month</option>
                <option>51–100 cases / month</option>
                <option>101–250 cases / month</option>
                <option>250+ cases / month</option>
              </select>
            </div>

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>
                Tell Us About Your Operation
              </label>
              <textarea
                rows={4}
                placeholder="Brief description of your operation and how you'd use our products..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '15px 28px',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Submit Distribution Application
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-warm-gray)' }}>
              By submitting you agree to our{' '}
              <a href="/terms" style={{ color: 'var(--color-forest)' }}>Terms of Service</a>.
              We review all applications within 1 business day.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
