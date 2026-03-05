'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Distribution', href: '/distribution' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          backgroundColor: '#fff',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'border-color 250ms ease, box-shadow 250ms ease',
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
              style={{ objectFit: 'contain', height: 52, width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: 'flex', gap: 32 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label-caps"
                style={{
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[Search, User, ShoppingCart].map((Icon, i) => (
              <button
                key={i}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                }}
              >
                <Icon size={20} />
              </button>
            ))}

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-charcoal)',
                display: 'none',
                alignItems: 'center',
                padding: 4,
              }}
            >
              <Menu size={24} />
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
              style={{ objectFit: 'contain', height: 44, width: 'auto' }}
            />
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-charcoal)' }}
            >
              <X size={28} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display"
                style={{
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  fontSize: '2rem',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tier quick-links */}
          <div style={{ display: 'flex', gap: 12, paddingTop: 24 }}>
            {['Retail', 'Wholesale', 'Distribution'].map((tier) => (
              <span
                key={tier}
                className="label-caps"
                style={{
                  padding: '6px 14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 9999,
                  color: 'var(--color-warm-gray)',
                  fontSize: '0.7rem',
                }}
              >
                {tier}
              </span>
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
    </>
  );
}
