import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';
import PageTracker from '@/components/PageTracker';

const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-barlow', display: 'swap' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-barlow-condensed', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' });

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
    default: 'ValueSuppliers.co — Professional Gloves & Cannabis Trimming Supplies',
    template: '%s | ValueSuppliers.co',
  },
  description:
    'Professional-grade disposable gloves and cannabis trimming equipment. Nitrile gloves by the case. Wholesale pricing at 30+ cases · Distribution pricing at 120+ cases. Serving cannabis, food service, medical, and industrial operations nationwide.',
  keywords: [
    'disposable gloves wholesale',
    'nitrile gloves bulk',
    'cannabis trimming gloves',
    'latex gloves case',
    'vinyl gloves bulk',
    'trimming scissors cannabis',
    'black nitrile gloves',
    'wholesale gloves supplier',
    'dispensary supplies',
    'grow operation supplies',
    'gloves by the case',
    'cannabis trimming supplies',
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
    title: 'ValueSuppliers.co — Professional Gloves & Cannabis Trimming Supplies',
    description:
      'Professional-grade disposable gloves and trimming supplies. Case pricing for retail, wholesale, and distribution. Serving cannabis, food service, medical, and industrial industries.',
    url: BASE,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ValueSuppliers.co — Professional Gloves & Cannabis Trimming Supplies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValueSuppliers.co — Professional Gloves & Cannabis Supplies',
    description:
      'Nitrile gloves by the case. Wholesale $70/case (30+ cases) · Distribution $60/case (120+ cases). Cannabis trimming supplies and accessories.',
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
    'Professional-grade disposable gloves and cannabis trimming equipment supplier. Wholesale and distribution pricing for cannabis operations, food service, medical, and industrial industries.',
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
    'cannabis trimming equipment',
    'wholesale gloves',
    'trimming scissors',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ValueSuppliers.co',
  url: BASE,
  description: 'Professional-grade disposable gloves and cannabis trimming supplies.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/catalog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
