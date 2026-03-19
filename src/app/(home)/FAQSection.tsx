import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

const FAQ_ITEMS = [
  {
    q: 'What types of gloves do you carry?',
    a: 'We stock nitrile, latex exam-grade, vinyl, and black nitrile gloves — all 5 mil thickness — in sizes XS through XXL. All gloves are powder-free, latex-free options available, and sold by the 100-count case. Wholesale and distribution pricing available.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'Retail customers can order 1–29 cases at $80/case with no application needed. Wholesale pricing ($70/case) requires 30+ cases per order and an approved application. Distribution pricing ($60/case) requires 120+ cases per order and is designed for commercial operations and resellers.',
  },
  {
    q: 'How much do wholesale accounts save?',
    a: 'Wholesale accounts pay $70/case ($7/box) — saving $10/case off the $80 retail price on 30+ case orders. Distribution accounts pay $60/case ($6/box) — saving $20/case on 120+ case orders. Both tiers include priority fulfillment and dedicated account support. Apply online — approval typically within 1 business day.',
  },
  {
    q: 'Do you ship to all 50 states?',
    a: 'Yes, we ship to all 48 contiguous states. Orders are processed within 1–2 business days and ship via ground freight for case quantities. Wholesale and distribution accounts can arrange scheduled restock deliveries.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Our primary customers are cannabis cultivation, trimming, and processing operations. We also serve food service, medical and dental (non-sterile), janitorial, automotive, tattoo studios, laboratories, and general manufacturing. Our gloves meet ASTM industrial and exam-grade certifications.',
  },
  {
    q: 'Do you offer onsite cannabis trimming services?',
    a: 'Yes. In addition to supplying equipment, we provide fully licensed and bonded onsite trimming crews. Professional teams work at your facility on your schedule. Full compliance documentation — licensing, insurance, and chain-of-custody records — is included on every job.',
  },
  {
    q: 'Can I get a custom quote for a large order?',
    a: 'Absolutely. Contact us at admin@valuesuppliersdirect.com with your product needs, quantity, and delivery frequency. We provide custom volume pricing for operations outside our standard retail/wholesale/distribution tiers.',
  },
];

export default function FAQSection() {
  return (
    <section style={{ backgroundColor: '#FAFAFA', padding: '96px 24px', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <AnimateIn style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="label-caps" style={{ color: 'var(--color-amber)' }}>Common Questions</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 10, color: 'var(--color-charcoal)' }}>
            Frequently Asked Questions
          </h2>
        </AnimateIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <AnimateIn key={item.q} delay={i * 60}>
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 16,
                  padding: '24px 28px',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <ChevronRight size={16} color="var(--color-amber)" style={{ marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <h3 className="font-heading" style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: 8, lineHeight: 1.3 }}>
                      {item.q}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)', lineHeight: 1.75, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-warm-gray)' }}>
            Have a different question?{' '}
            <Link href="/contact" style={{ color: 'var(--color-forest)', fontWeight: 700, textDecoration: 'none' }}>
              Contact us →
            </Link>
          </p>
        </AnimateIn>
      </div>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </section>
  );
}
