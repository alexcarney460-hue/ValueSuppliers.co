import type { Metadata } from 'next';
import { BadgeCheck, Truck, DollarSign, User } from 'lucide-react';

export const metadata: Metadata = { title: 'Wholesale Pricing' };

const BENEFITS = [
  { icon: DollarSign, title: 'Volume Discounts', desc: 'Case pricing drops further at 10, 25, and 50 case orders.' },
  { icon: Truck, title: 'Priority Fulfillment', desc: 'Wholesale accounts get restocked before retail.' },
  { icon: BadgeCheck, title: 'Dedicated Support', desc: 'Direct line to your account rep for reorders and custom requests.' },
  { icon: User, title: 'Net 30 Available', desc: 'Qualify for NET terms after your first three orders.' },
];

export default function WholesalePage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Wholesale Program</span>
          <h1
            className="font-display"
            style={{ color: '#fff', fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginTop: 8, lineHeight: 1.05 }}
          >
            Case Pricing for the Trade.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: 16, fontSize: '1.1rem', maxWidth: 560, margin: '16px auto 0' }}>
            Hydro stores, dispensaries, and commercial grows — apply once and get access to wholesale pricing on every order.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 64 }}>
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: '28px 24px',
              }}
            >
              <Icon size={28} color="var(--color-amber)" style={{ marginBottom: 14 }} />
              <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Application form */}
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: 8 }}>Apply for Wholesale Access</h2>
          <p style={{ color: 'var(--color-warm-gray)', marginBottom: 36 }}>
            Fill out the form below. We review applications within 1 business day.
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Business Name', type: 'text', placeholder: 'Your business name' },
              { label: 'Business Email', type: 'email', placeholder: 'orders@yourbusiness.com' },
              { label: 'Phone Number', type: 'tel', placeholder: '(555) 000-0000' },
            ].map(({ label, type, placeholder }) => (
              <div key={label}>
                <label
                  className="label-caps"
                  style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.7rem' }}
                >
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
              <label
                className="label-caps"
                style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.7rem' }}
              >
                Business Type
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                  fontSize: '0.95rem',
                  backgroundColor: '#fff',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                <option value="">Select your business type</option>
                <option>Hydro Store / Garden Center</option>
                <option>Licensed Cannabis Grow</option>
                <option>Dispensary</option>
                <option>Reseller / Distributor</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                className="label-caps"
                style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.7rem' }}
              >
                Estimated Monthly Volume
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                  fontSize: '0.95rem',
                  backgroundColor: '#fff',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                <option value="">Select volume range</option>
                <option>1–5 cases / month</option>
                <option>6–25 cases / month</option>
                <option>26–100 cases / month</option>
                <option>100+ cases / month</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--color-forest)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '14px 28px',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginTop: 8,
              }}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
