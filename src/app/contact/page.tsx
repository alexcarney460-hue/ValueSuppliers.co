'use client';

import type { Metadata } from 'next';
import { Mail, Phone, Clock, MessageSquare } from 'lucide-react';

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'orders@valuesuppliers.co',
    sub: 'We respond within 1 business day',
    href: 'mailto:orders@valuesuppliers.co',
  },
  {
    icon: Phone,
    label: 'Call or Text',
    value: '(800) 000-0000',
    sub: 'Mon–Fri, 9am–5pm EST',
    href: 'tel:+18000000000',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri 9am–5pm EST',
    sub: 'Orders placed after hours ship next day',
    href: null,
  },
];

const INQUIRY_TYPES = [
  'General Question',
  'Order Support',
  'Wholesale Inquiry',
  'Distribution Inquiry',
  'Returns & Exchanges',
  'Product Availability',
  'Other',
];

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Get in Touch</span>
          <h1
            className="font-display"
            style={{ color: '#fff', fontSize: 'clamp(2rem, 6vw, 3.25rem)', marginTop: 10, lineHeight: 1.05 }}
          >
            We're Here to Help.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: 16, fontSize: '1.05rem', maxWidth: 500, margin: '16px auto 0' }}>
            Questions about an order, product availability, or setting up a wholesale account — reach out and we'll get back to you fast.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Left — contact info */}
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: 28, color: 'var(--color-charcoal)' }}>
              Contact Info
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
              {CONTACT_OPTIONS.map(({ icon: Icon, label, value, sub, href }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: '20px 20px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: 'var(--color-sage-light)',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color="var(--color-forest)" />
                  </div>
                  <div>
                    <div className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.68rem', marginBottom: 4 }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{ color: 'var(--color-charcoal)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--color-charcoal)', fontWeight: 600, fontSize: '0.95rem' }}>{value}</div>
                    )}
                    <div style={{ color: 'var(--color-warm-gray)', fontSize: '0.8rem', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Wholesale callout */}
            <div
              style={{
                backgroundColor: 'var(--color-forest)',
                borderRadius: 16,
                padding: '28px 24px',
                color: '#fff',
              }}
            >
              <MessageSquare size={24} color="var(--color-amber)" style={{ marginBottom: 12 }} />
              <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 8 }}>
                Applying for Wholesale?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 16 }}>
                Use our dedicated wholesale application for faster processing and access to volume pricing.
              </p>
              <a
                href="/wholesale"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-amber)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Wholesale Application →
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '40px 36px', border: '1px solid var(--color-border)' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--color-charcoal)' }}>
              Send a Message
            </h2>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.875rem', marginBottom: 28 }}>
              We'll get back to you within 1 business day.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {['First Name', 'Last Name'].map((label) => (
                  <div key={label}>
                    <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={label}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}
              </div>

              {[
                { label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                { label: 'Phone Number (optional)', type: 'tel', placeholder: '(555) 000-0000' },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 8,
                      border: '1px solid var(--color-border)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  />
                </div>
              ))}

              <div>
                <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>
                  Inquiry Type
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    backgroundColor: '#fff',
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  <option value="">Select a topic</option>
                  {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    resize: 'vertical',
                  }}
                />
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
                  width: '100%',
                }}
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
