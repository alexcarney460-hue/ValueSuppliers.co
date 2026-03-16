import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';
import PageTracker from '@/components/PageTracker';

const BASE = 'https://valuesuppliers.co';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B3A2D',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'ValueSuppliers.co — Commercial & Industrial Disposable Gloves',
    template: '%s | ValueSuppliers.co',
  },
  description:
    'Professional-grade disposable gloves for commercial and industrial operations. Nitrile, latex, and vinyl gloves by the case. Wholesale 20% off · Distribution 30% off. Serving food service, medical, janitorial, automotive, and industrial industries nationwide.',
  keywords: [
    'disposable gloves wholesale',
    'nitrile gloves bulk',
    'industrial gloves supplier',
    'latex gloves case',
    'vinyl gloves bulk',
    'black nitrile gloves',
    'wholesale gloves supplier',
    'commercial gloves',
    'exam grade gloves',
    'gloves by the case',
    'food service gloves',
    'medical gloves bulk',
    'ValueSuppliers',
  ],
  authors: [{ name: 'ValueSuppliers.co', url: BASE }],
  creator: 'ValueSuppliers.co',
  publisher: 'ValueSuppliers.co',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    siteName: 'ValueSuppliers.co',
    type: 'website',
    locale: 'en_US',
    title: 'ValueSuppliers.co — Commercial & Industrial Disposable Gloves',
    description:
      'Professional-grade disposable gloves for every industry. Case pricing for retail, wholesale, and distribution. Serving food service, medical, janitorial, automotive, and industrial operations.',
    url: BASE,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ValueSuppliers.co — Commercial & Industrial Disposable Gloves' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValueSuppliers.co — Commercial Disposable Gloves',
    description:
      'Nitrile, latex, and vinyl gloves by the case. Wholesale 20% off · Distribution 30% off. ASTM certified for industrial and exam-grade use.',
    creator: '@valuesuppliers',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ValueSuppliers',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ValueSuppliers.co',
  url: BASE,
  logo: `${BASE}/logo.jpg`,
  description:
    'Professional-grade disposable glove supplier. Wholesale and distribution pricing for food service, medical, janitorial, automotive, and industrial operations.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'orders@valuesuppliers.co',
    availableLanguage: 'English',
  },
  areaServed: 'US',
  knowsAbout: [
    'disposable gloves',
    'nitrile gloves',
    'latex exam gloves',
    'vinyl gloves',
    'wholesale gloves',
    'industrial safety gloves',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ValueSuppliers.co',
  url: BASE,
  description: 'Professional-grade disposable gloves for commercial and industrial use.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/catalog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, websiteSchema]) }}
        />
        <CartProvider>
          <Nav />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <PageTracker />
        </CartProvider>
      </body>
    </html>
  );
}
