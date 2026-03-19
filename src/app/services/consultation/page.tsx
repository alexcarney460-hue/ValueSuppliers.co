import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import ProcessingConsultationForm from '@/components/forms/ProcessingConsultationForm';

export const metadata: Metadata = {
  title: 'Processing Consultation — Book a Free Consultation',
  description:
    'Schedule a free processing consultation with our team. We help cannabis grows and processing facilities plan crew size, timeline, and compliance documentation.',
  keywords: ['cannabis processing consultation', 'trimming crew consultation', 'harvest planning', 'cannabis processing services'],
  openGraph: {
    title: 'Processing Consultation — Book a Free Consultation',
    description: 'Schedule a free processing consultation. We help plan crew size, timeline, and compliance documentation for your operation.',
    url: 'https://valuesuppliers.co/services/consultation',
  },
  alternates: { canonical: 'https://valuesuppliers.co/services/consultation' },
};

const BENEFITS = [
  'Custom crew sizing for your harvest volume',
  'Timeline and scheduling recommendations',
  'Compliance documentation walkthrough',
  'No commitment — just a conversation',
];

export default function ConsultationPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '5%', width: 480, height: 480, borderRadius: '50%', background: 'rgba(200,146,42,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-warm-gray)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: 24 }}>
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <span className="label-caps" style={{ color: 'var(--color-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
            Free Consultation
            <span style={{ width: 24, height: 1.5, backgroundColor: 'var(--color-amber)', display: 'inline-block', borderRadius: 99 }} />
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, color: 'var(--color-charcoal)', marginBottom: 20 }}>
            Let&apos;s Plan Your{' '}
            <span style={{ color: 'var(--color-forest)' }}>Processing.</span>
          </h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Tell us about your operation and we&apos;ll get back to you with a tailored plan — crew size, timeline, and everything you need to know.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Left — benefits */}
          <div>
            <AnimateIn>
              <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: 28, color: 'var(--color-charcoal)' }}>
                What You Get
              </h2>
            </AnimateIn>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {BENEFITS.map((item, i) => (
                <AnimateIn key={item} delay={i * 80}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <BadgeCheck size={20} color="var(--color-forest)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>{item}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn delay={400}>
              <div
                className="vs-dot-grid"
                style={{ backgroundColor: 'var(--color-forest)', borderRadius: 20, padding: '28px 24px', color: '#fff', position: 'relative', overflow: 'hidden' }}
              >
                <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 8 }}>Prefer Email?</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 16 }}>
                  Reach out directly and we&apos;ll get back to you within 1 business day.
                </p>
                <a
                  href="mailto:bee@valuesuppliersdirect.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: 'var(--color-amber)',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: 9999,
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-amber)',
                  }}
                >
                  bee@valuesuppliersdirect.com
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Right — form */}
          <AnimateIn delay={100}>
            <div style={{ backgroundColor: '#fff', borderRadius: 24, padding: '44px 40px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--color-charcoal)' }}>Request a Consultation</h2>
              <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.875rem', marginBottom: 28 }}>
                We&apos;ll respond within 1 business day.
              </p>

              <ProcessingConsultationForm />
            </div>
          </AnimateIn>

        </div>
      </div>
    </div>
  );
}
