import type { Metadata } from 'next';
import '@/app/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'ValueSuppliers.co — Gloves for Every Industry',
    template: '%s | ValueSuppliers.co',
  },
  description:
    'Professional-grade disposable gloves and cannabis trimming supplies. Wholesale pricing 20% off, distribution pricing 30% off. Case quantities for every industry.',
  metadataBase: new URL('https://valuesuppliers.co'),
  openGraph: {
    siteName: 'ValueSuppliers.co',
    type: 'website',
    title: 'ValueSuppliers.co — Gloves for Every Industry',
    description:
      'Professional-grade disposable gloves and trimming supplies. Case pricing for retail, wholesale, and distribution.',
    url: 'https://valuesuppliers.co',
    images: [{ width: 1200, height: 630, alt: 'ValueSuppliers.co — Gloves for Every Industry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValueSuppliers.co — Gloves for Every Industry',
    description:
      'Professional-grade disposable gloves and trimming supplies. Wholesale 20% off · Distribution 30% off.',
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
