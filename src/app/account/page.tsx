'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import type { Profile } from '@/lib/account';

type View = 'login' | 'signup' | 'dashboard';

export default function AccountPage() {
  const [view, setView] = useState<View>('login');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        loadProfile(data.session.user.id, data.session.user.email ?? '');
      } else {
        setChecking(false);
      }
    });
  }, []);

  async function loadProfile(userId: string, userEmail: string) {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('profiles')
      .select('user_id,email,account_type,company_name,approved')
      .eq('user_id', userId)
      .maybeSingle();

    setProfile(
      (data as unknown as Profile) ?? {
        user_id: userId,
        email: userEmail,
        account_type: 'retail',
        company_name: null,
        approved: false,
      }
    );
    setView('dashboard');
    setChecking(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const supabase = getSupabase();
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      // Create profile row
      await supabase.from('profiles').upsert({
        user_id: data.user.id,
        email: data.user.email ?? email,
        account_type: 'retail',
        approved: false,
      });
      setSuccess('Account created! Check your email to confirm, then sign in.');
      setView('login');
      setPassword('');
    }
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getSupabase();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError || !data.user) {
      setError(authError?.message ?? 'Login failed. Please try again.');
      setLoading(false);
      return;
    }
    await loadProfile(data.user.id, data.user.email ?? email);
    setLoading(false);
  }

  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setProfile(null);
    setView('login');
    setEmail('');
    setPassword('');
  }

  const accountLabel: Record<string, string> = {
    retail: 'Retail',
    wholesale: 'Wholesale (20% off)',
    distribution: 'Distribution (30% off)',
  };

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-forest)', animation: 'vs-spin 0.7s linear infinite' }} />
        <style>{`@keyframes vs-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--color-border)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <p className="label-caps" style={{ color: 'var(--color-amber)', fontSize: '0.65rem', marginBottom: 12 }}>
            {view === 'dashboard' ? 'My Account' : view === 'signup' ? 'Create Account' : 'Sign In'}
          </p>
          <h1 className="font-display" style={{ fontSize: '2.2rem', color: 'var(--color-charcoal)', lineHeight: 1.15, marginBottom: 8 }}>
            {view === 'dashboard' ? `Welcome back` : view === 'signup' ? 'Create Your Account' : 'Account Login'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)' }}>
            {view === 'dashboard'
              ? profile?.company_name ?? profile?.email
              : view === 'signup'
                ? 'Create an account to get started.'
                : 'Sign in to access your pricing tier and order history.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '48px 24px', maxWidth: 480, margin: '0 auto' }}>
        {(view === 'login' || view === 'signup') ? (
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 20,
              padding: '36px 32px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {success && (
              <div style={{ fontSize: '0.8rem', color: '#166534', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                {success}
              </div>
            )}
            <form onSubmit={view === 'signup' ? handleSignup : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: 6 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  style={{
                    width: '100%',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                    color: 'var(--color-charcoal)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafaf9',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: 6 }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                    color: 'var(--color-charcoal)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafaf9',
                  }}
                />
              </div>

              {error && (
                <div style={{ fontSize: '0.8rem', color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? 'var(--color-border)' : 'var(--color-forest)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 9999,
                  padding: '12px 24px',
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 150ms ease',
                  marginTop: 4,
                }}
              >
                {loading ? (view === 'signup' ? 'Creating Account...' : 'Signing in...') : (view === 'signup' ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
              {view === 'login' ? (
                <>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray)', marginBottom: 12 }}>
                    Don&apos;t have an account?
                  </p>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => { setView('signup'); setError(''); setSuccess(''); }}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-forest)',
                        background: 'none',
                        border: '1px solid var(--color-border)',
                        borderRadius: 9999,
                        padding: '6px 14px',
                        cursor: 'pointer',
                      }}
                    >
                      Create Account
                    </button>
                    <Link
                      href="/wholesale"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-forest)',
                        textDecoration: 'none',
                        border: '1px solid var(--color-border)',
                        borderRadius: 9999,
                        padding: '6px 14px',
                      }}
                    >
                      Apply for Wholesale
                    </Link>
                    <Link
                      href="/distribution"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-forest)',
                        textDecoration: 'none',
                        border: '1px solid var(--color-border)',
                        borderRadius: 9999,
                        padding: '6px 14px',
                      }}
                    >
                      Apply for Distribution
                    </Link>
                  </div>
                </>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray)' }}>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                    style={{ color: 'var(--color-forest)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Account type card */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 20,
                padding: '28px 28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.6rem', marginBottom: 16 }}>Account Details</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Row label="Email" value={profile?.email ?? '—'} />
                <Row label="Account Type" value={accountLabel[profile?.account_type ?? 'retail'] ?? 'Retail'} highlight={profile?.account_type !== 'retail'} />
                {profile?.company_name && <Row label="Company" value={profile.company_name} />}
                <Row
                  label="Status"
                  value={profile?.approved ? 'Approved' : 'Pending Approval'}
                  highlight={profile?.approved}
                />
              </div>
            </div>

            {/* Quick links */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 20,
                padding: '24px 28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="label-caps" style={{ color: 'var(--color-warm-gray)', fontSize: '0.6rem', marginBottom: 16 }}>Quick Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Browse Catalog', href: '/catalog' },
                  { label: 'Wholesale Program', href: '/wholesale' },
                  { label: 'Distribution Program', href: '/distribution' },
                  { label: 'Contact Support', href: '/contact' },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--color-charcoal)',
                      textDecoration: 'none',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {label}
                    <span style={{ color: 'var(--color-amber)' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-warm-gray)',
                border: '1px solid var(--color-border)',
                borderRadius: 9999,
                padding: '11px 24px',
                fontFamily: "'Barlow', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray)' }}>{label}</span>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: highlight ? 'var(--color-forest)' : 'var(--color-charcoal)' }}>
        {value}
      </span>
    </div>
  );
}
