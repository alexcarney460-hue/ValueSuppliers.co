import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

export default function CTASection() {
  return (
    <section
      className="vs-dot-grid"
      style={{
        backgroundColor: 'var(--color-forest)',
        padding: '100px 24px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        className="vs-glow-amber"
        style={{ width: 640, height: 400, top: '-30%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(200,146,42,0.09)' }}
      />

      <AnimateIn style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span className="label-caps" style={{ color: 'rgba(200,146,42,0.85)', display: 'block', marginBottom: 20 }}>
          Get Started Today
        </span>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.25rem)', marginBottom: 20, lineHeight: 1.0 }}
        >
          Ready to Set Up Your Account?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 44, fontSize: '1.05rem', lineHeight: 1.75 }}>
          Apply for wholesale or distribution pricing. Get access to bulk discounts, priority allocation, and a dedicated rep.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/wholesale"
            className="vs-btn-amber"
            style={{
              backgroundColor: 'var(--color-amber)',
              color: '#fff',
              padding: '15px 34px',
              borderRadius: 9999,
              fontFamily: "'Barlow', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: 'var(--shadow-amber)',
            }}
          >
            Get Wholesale Pricing <ArrowRight size={14} />
          </Link>
          <Link
            href="/distribution"
            className="vs-btn-ghost"
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '15px 34px',
              borderRadius: 9999,
              border: '1.5px solid rgba(255,255,255,0.28)',
              fontFamily: "'Barlow', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Apply for Distribution
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}
