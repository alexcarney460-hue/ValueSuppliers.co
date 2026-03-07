import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Truck, DollarSign, User, FileText, Phone, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'Distribution Program — 30% Off + NET 30 Terms',
  description:
    'Distribution partners save 30% off retail on all gloves and cannabis trimming supplies. NET 30 billing, priority inventory allocation, dedicated account rep, and custom volume pricing for commercial resellers and large operations.',
  keywords: ['glove distributor', 'wholesale glove distributor', 'disposable gloves distributor', 'cannabis supplies distributor', 'net 30 gloves'],
  openGraph: {
    title: 'Distribution Program — 30% Off + NET 30 | ValueSuppliers.co',
    description: 'Distribution accounts get 30% off retail, NET 30 billing, and a dedicated rep. Apply online for priority allocation.',
    url: 'https://valuesuppliers.co/distribution',
  },
  alternates: { canonical: 'https://valuesuppliers.co/distribution' },
};

const BENEFITS = [
  { icon: DollarSign, title: '30% Off Retail', desc: 'Distribution accounts get the deepest discount — 30% below retail pricing on every SKU, every order.' },
  { icon: Truck, title: 'Priority Allocation', desc: 'Distribution partners are fulfilled first. You get inventory priority before wholesale and retail channels.' },
  { icon: FileText, title: 'NET 30 Terms', desc: 'Qualify for NET 30 billing after account approval. Invoice-based ordering for established operations.' },
  { icon: User, title: 'Dedicated Rep', desc: 'Direct line to your account manager for custom orders, volume quotes, and restock scheduling.' },
  { icon: BadgeCheck, title: 'Custom Pricing Tiers', desc: 'At 100+ case/month volume, we build a custom pricing agreement tailored to your operation.' },
  { icon: Phone, title: 'After-Hours Support', desc: 'Distribution accounts get priority support contact for urgent restock situations.' },
];

const COMPARISON = [
  { label: 'Discount off Retail',      retail: '—',         wholesale: '20% off',   distribution: '30% off' },
  { label: 'Minimum Order',            retail: '1 case',    wholesale: '5 cases',   distribution: '25 cases' },
  { label: 'Monthly Volume',           retail: 'Any',       wholesale: '5+ cases',  distribution: '25+ cases' },
  { label: 'NET Terms',                retail: 'No',        wholesale: 'No',        distribution: 'NET 30' },
  { label: 'Dedicated Account Rep',    retail: 'No',        wholesale: 'No',        distribution: 'Yes' },
  { label: 'Inventory Priority',       retail: 'No',        wholesale: 'No',        distribution: 'Yes' },
  { label: 'Custom Pricing Available', retail: 'No',        wholesale: 'No',        distribution: 'Yes (100+ cases)' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid var(--color-border)',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: "'Inter', system-ui, sans-serif",
  backgroundColor: '#fff',
  boxSizing: 'border-box',
};

export default function DistributionPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,146,42,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '3%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(27,58,45,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
            Distribution Program
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, color: 'var(--color-charcoal)', marginBottom: 20 }}>
            Built for Commercial Volume.
          </h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Licensed grows, commercial operations, and resellers — apply for distribution access and get 30% off retail on every order.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: 16, padding: '18px 32px' }}>
            <span className="font-display" style={{ fontSize: '2.25rem', color: 'var(--color-amber)', lineHeight: 1 }}>30%</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--color-charcoal)', fontWeight: 700, fontSize: '0.9rem' }}>Off Retail — Distribution Tier</div>
              <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem' }}>25+ cases / month · NET 30 available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Comparison Table */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '80px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Pricing Tiers</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              How the Tiers Compare
            </h2>
          </AnimateIn>
          <AnimateIn>
            <div style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '16px 24px', textAlign: 'left' }}></th>
                      {['Retail', 'Wholesale', 'Distribution'].map((tier, i) => (
                        <th
                          key={tier}
                          style={{
                            padding: '16px 24px',
                            textAlign: 'center',
                            borderLeft: '1px solid var(--color-border)',
                            backgroundColor: i === 2 ? 'rgba(200,146,42,0.05)' : 'transparent',
                          }}
                        >
                          <span className="label-caps" style={{ color: i === 2 ? 'var(--color-amber)' : i === 1 ? 'var(--color-muted-green)' : 'var(--color-warm-gray)', fontSize: '0.72rem' }}>
                            {tier}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, ri) => (
                      <tr key={row.label} style={{ borderBottom: ri < COMPARISON.length - 1 ? '1px solid var(--color-border)' : 'none', backgroundColor: ri % 2 === 0 ? '#FAFAFA' : '#fff' }}>
                        <td style={{ padding: '14px 24px', fontSize: '0.88rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>{row.label}</td>
                        <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-warm-gray)', borderLeft: '1px solid var(--color-border)' }}>{row.retail}</td>
                        <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-muted-green)', fontWeight: 500, borderLeft: '1px solid var(--color-border)' }}>{row.wholesale}</td>
                        <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, backgroundColor: 'rgba(200,146,42,0.05)', borderLeft: '1px solid rgba(200,146,42,0.15)' }}>{row.distribution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: '#fff', padding: '80px 24px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What You Get</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              Distribution Partner Benefits
            </h2>
          </AnimateIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <AnimateIn key={title} delay={i * 75}>
                <div
                  className="tilt-card"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: '28px 24px',
                    border: '1px solid var(--color-border)',
                    borderTop: '3px solid var(--color-amber)',
                    height: '100%',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ width: 48, height: 48, backgroundColor: 'var(--color-sage-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <Icon size={22} color="var(--color-amber)" />
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 8, color: 'var(--color-charcoal)' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section style={{ backgroundColor: '#FAFAFA', padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <AnimateIn style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Apply Now</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
              Distribution Application
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', marginTop: 12 }}>
              Applications reviewed within 1 business day. You&apos;ll receive account credentials and NET 30 terms upon approval.
            </p>
          </AnimateIn>

          <AnimateIn>
            <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: 24, padding: '44px 40px', boxShadow: 'var(--shadow-sm)' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Business Name', type: 'text', placeholder: 'Legal business name' },
                  { label: 'Business Email', type: 'email', placeholder: 'orders@yourbusiness.com' },
                  { label: 'Phone Number', type: 'tel', placeholder: '(555) 000-0000' },
                  { label: 'Website (optional)', type: 'url', placeholder: 'https://yourbusiness.com' },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={inputStyle} />
                  </div>
                ))}

                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>Operation Type</label>
                  <select style={inputStyle}>
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
                  <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>Estimated Monthly Volume</label>
                  <select style={inputStyle}>
                    <option value="">Select volume range</option>
                    <option>25–50 cases / month</option>
                    <option>51–100 cases / month</option>
                    <option>101–250 cases / month</option>
                    <option>250+ cases / month</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps" style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', color: 'var(--color-charcoal)' }}>Tell Us About Your Operation</label>
                  <textarea
                    rows={4}
                    placeholder="Brief description of your operation and how you'd use our products..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-amber)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 9999,
                    padding: '15px 28px',
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: 'var(--shadow-amber)',
                  }}
                >
                  Submit Distribution Application <ArrowRight size={14} />
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-warm-gray)' }}>
                  By submitting you agree to our{' '}
                  <a href="/terms" style={{ color: 'var(--color-forest)' }}>Terms of Service</a>.
                  We review all applications within 1 business day.
                </p>
              </form>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section
        className="vs-dot-grid"
        style={{ backgroundColor: 'var(--color-forest)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: 'rgba(200,146,42,0.09)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <AnimateIn style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="font-display" style={{ color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 16, lineHeight: 1.05 }}>
            Questions Before You Apply?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 36, lineHeight: 1.75 }}>
            Reach out and we&apos;ll walk you through the distribution program and what to expect.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--color-amber)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 9999,
              fontFamily: "'Barlow', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-amber)',
            }}
          >
            Contact Us <ArrowRight size={14} />
          </Link>
        </AnimateIn>
      </section>

    </div>
  );
}
