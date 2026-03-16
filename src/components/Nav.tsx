'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SearchModal from '@/components/SearchModal';

const NAV_LINKS = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Services', href: '/services' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Distribution', href: '/distribution' },
  { label: 'Affiliate', href: '/affiliate' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid rgba(226,224,219,0.5)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.jpg"
              alt="ValueSuppliers.co — Gloves for Every Industry"
              width={160}
              height={60}
              className="vs-logo"
              style={{ objectFit: 'contain', height: 120, width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 32 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label-caps vs-nav-link"
                style={{
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  paddingBottom: 2,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[
              { Icon: Search, label: 'Search', onClick: () => setSearchOpen(true) },
              { Icon: User, label: 'Account', onClick: () => router.push('/account') },
            ].map(({ Icon, label, onClick }) => (
              <button
                key={label}
                aria-label={label}
                onClick={onClick}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  transition: 'background-color 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-sage-light)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-forest)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-charcoal)';
                }}
              >
                <Icon size={18} />
              </button>
            ))}

            {/* Cart button with count badge */}
            <button
              aria-label="Open cart"
              onClick={openCart}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                position: 'relative',
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-sage-light)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-forest)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-charcoal)';
              }}
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 16,
                    height: 16,
                    backgroundColor: 'var(--color-amber)',
                    color: '#fff',
                    fontSize: '0.55rem',
                    fontWeight: 800,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Wholesale pill CTA */}
            <Link
              href="/wholesale"
              className="desktop-nav"
              style={{
                marginLeft: 8,
                backgroundColor: 'var(--color-forest)',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 8,
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 150ms ease, transform 200ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-forest-light)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-forest)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Wholesale
            </Link>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-charcoal)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                marginLeft: 4,
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <Image
              src="/logo.jpg"
              alt="ValueSuppliers.co"
              width={140}
              height={52}
              style={{ objectFit: 'contain', height: 80, width: 'auto' }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: 'var(--color-bg)',
              }}
            >
              <X size={22} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display"
                style={{
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  fontSize: '2.2rem',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-border)',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {link.label}
                <span style={{ fontSize: '1.2rem', color: 'var(--color-amber)', opacity: 0.7 }}>→</span>
              </Link>
            ))}
          </nav>

          {/* Tier pills */}
          <div style={{ display: 'flex', gap: 10, paddingTop: 28 }}>
            {[
              { label: 'Retail', href: '/catalog' },
              { label: 'Wholesale', href: '/wholesale' },
              { label: 'Distribution', href: '/distribution' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="label-caps"
                style={{
                  padding: '7px 16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 9999,
                  color: 'var(--color-warm-gray)',
                  fontSize: '0.65rem',
                  textDecoration: 'none',
                  backgroundColor: 'var(--color-bg)',
                  transition: 'border-color 150ms ease, color 150ms ease',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
