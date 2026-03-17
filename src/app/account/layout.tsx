import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account — Sign In & Manage Orders',
  description:
    'Sign in to your ValueSuppliers.co account to view order history, manage your pricing tier, and access wholesale or distribution features.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://valuesuppliers.co/account' },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
