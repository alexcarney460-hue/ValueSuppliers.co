import type { Metadata } from 'next';
import '@/app/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'ValueSuppliers.co — Supplied for the Grow.',
    template: '%s | ValueSuppliers.co',
  },
  description:
    'Professional-grade disposable gloves and cannabis trimming equipment. Case pricing for retail, wholesale, and commercial distribution.',
  metadataBase: new URL('https://valuesuppliers.co'),
  openGraph: {
    siteName: 'ValueSuppliers.co',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
