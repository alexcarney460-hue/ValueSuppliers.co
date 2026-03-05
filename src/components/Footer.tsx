import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = {
  Products: [
    { label: 'Disposable Gloves', href: '/catalog/gloves' },
    { label: 'Trimming Equipment', href: '/catalog/trimmers' },
    { label: 'All Products', href: '/catalog' },
  ],
  Business: [
    { label: 'Wholesale Pricing', href: '/wholesale' },
    { label: 'Distribution', href: '/distribution' },
    { label: 'Request a Quote', href: '/contact' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Returns & Shipping', href: '/shipping' },
  ],
  Account: [
    { label: 'Sign In', href: '/account/login' },
    { label: 'Create Account', href: '/account/register' },
    { label: 'Order History', href: '/account/orders' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-forest-dark)',
        color: '#fff',
        paddingTop: 64,
        paddingBottom: 40,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Brand col */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, padding: '4px 10px', display: 'inline-block' }}>
              <Image
                src="/logo.jpg"
                alt="ValueSuppliers.co"
                width={140}
                height={52}
                style={{ objectFit: 'contain', height: 44, width: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 200 }}>
              Professional-grade supplies for every stage of the grow.
            </p>
            <p style={{ color: 'var(--color-amber)', fontSize: '0.875rem', fontStyle: 'italic', marginTop: 12 }}>
              "Supplied for the Grow."
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4
                className="label-caps"
                style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontSize: '0.7rem' }}
              >
                {group}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} ValueSuppliers.co. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
