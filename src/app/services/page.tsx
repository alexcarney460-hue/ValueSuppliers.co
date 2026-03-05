import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Shield, Users, Calendar, MapPin, ClipboardList } from 'lucide-react';

export const metadata: Metadata = { title: 'Trimming Services' };

const FEATURES = [
  {
    icon: Shield,
    title: 'Licensed & Bonded',
    desc: 'Every member of our trimming crew is fully licensed and bonded. We carry liability insurance and operate in full compliance with state regulations.',
  },
  {
    icon: Users,
    title: 'Experienced Crews',
    desc: 'Our trimmers are trained professionals — not day labor. Consistent technique, consistent output, every harvest.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Guaranteed',
    desc: 'We stand behind our work. Every job is supervised by a crew lead. We don\'t leave until the work meets standard.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    desc: 'Book by the day, week, or full harvest run. We work around your harvest timeline, not the other way around.',
  },
  {
    icon: MapPin,
    title: 'We Come to You',
    desc: 'Fully onsite service — we bring the team, the tools, and the supplies. Your facility, your rules.',
  },
  {
    icon: ClipboardList,
    title: 'Full Compliance Documentation',
    desc: 'We provide crew licensing documentation, insurance certificates, and chain-of-custody records for your compliance files.',
  },
];

const PROCESS = [
  { step: '01', title: 'Request a Quote', desc: 'Tell us your harvest size, timeline, and location. We\'ll respond within 1 business day with a rate and availability.' },
  { step: '02', title: 'Confirm & Schedule', desc: 'We lock in your dates, confirm crew size, and send all compliance documentation for your records.' },
  { step: '03', title: 'We Show Up Ready', desc: 'Crew arrives on time with all equipment and supplies. Your facility, your protocols — we follow your lead.' },
  { step: '04', title: 'Work Gets Done', desc: 'We trim to spec, maintain a clean workspace, and brief you at the end of each day on progress and yield.' },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '72px 24px 64px', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Onsite Trimming Services</span>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginTop: 12, lineHeight: 1.05 }}
          >
            Professional Trim Crews.<br />
            <span style={{ color: 'var(--color-amber)' }}>Licensed & Bonded.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', marginTop: 20, maxWidth: 560, margin: '20px auto 0', lineHeight: 1.7 }}>
            We bring a trained, licensed, and bonded trimming crew directly to your facility.
            Professional output, full compliance documentation, and zero headache.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: 'var(--color-amber)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+18000000000"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 8,
                border: '2px solid rgba(255,255,255,0.35)',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Call to Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ backgroundColor: 'var(--color-amber)', padding: '18px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {['Licensed & Bonded', 'Fully Insured', 'State Compliant', 'Onsite — We Come to You'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BadgeCheck size={16} color="var(--color-forest)" />
              <span className="label-caps" style={{ color: 'var(--color-forest)', fontSize: '0.7rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>What We Provide</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
              Everything Handled. Nothing Left Out.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{
                  width: 48, height: 48,
                  backgroundColor: 'var(--color-sage-light)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon size={22} color="var(--color-forest)" />
                </div>
                <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 10, color: 'var(--color-charcoal)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)', lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: 'var(--color-bg)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>The Process</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8, color: 'var(--color-charcoal)' }}>
              How It Works
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} style={{ position: 'relative' }}>
                <div
                  className="font-display"
                  style={{
                    fontSize: '3.5rem',
                    color: 'var(--color-border)',
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step}
                </div>
                <h3 className="font-heading" style={{ fontSize: '1rem', marginBottom: 10, color: 'var(--color-charcoal)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)', lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ backgroundColor: 'var(--color-forest)', padding: '72px 24px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Who We Work With</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: 8 }}>
              Built for Commercial Operations
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { title: 'Licensed Cannabis Grows', desc: 'State-licensed cultivators that need reliable, compliant trim crews at harvest.' },
              { title: 'Commercial Greenhouses', desc: 'High-volume operations with tight harvest windows and no time to waste.' },
              { title: 'Craft Cultivators', desc: 'Smaller craft grows that want professional-quality trim without full-time staff overhead.' },
              { title: 'Processing Facilities', desc: 'Post-harvest processors looking for consistent throughput and clean documentation.' },
            ].map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '24px 20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <h3 className="font-heading" style={{ fontSize: '0.95rem', marginBottom: 10, color: 'var(--color-amber)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#fff', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-charcoal)', marginBottom: 16 }}>
            Ready to Book a Crew?
          </h2>
          <p style={{ color: 'var(--color-warm-gray)', marginBottom: 36, fontSize: '1.05rem', lineHeight: 1.6 }}>
            Tell us your harvest size and timeline and we'll get you a quote within 24 hours.
            No commitment required.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--color-forest)',
              color: '#fff',
              padding: '15px 36px',
              borderRadius: 8,
              fontFamily: "'Barlow', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
