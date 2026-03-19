import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Barlow, Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';
import PageTracker from '@/components/PageTracker';

/*
 * ── Analytics IDs ──────────────────────────────────────────────────────
 * Set these environment variables to enable tracking:
 *
 * NEXT_PUBLIC_GA_MEASUREMENT_ID   — Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX)
 *   Get it from: https://analytics.google.com → Admin → Data Streams → Measurement ID
 *
 * NEXT_PUBLIC_META_PIXEL_ID       — Meta (Facebook) Pixel ID (e.g. 123456789012345)
 *   Get it from: https://business.facebook.com → Events Manager → Data Sources → Pixel ID
 *
 * Scripts only load when the corresponding env var is set (no empty tracking).
 * ───────────────────────────────────────────────────────────────────────
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

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

/*
 * ── Search Engine & Platform Verification Tags ──────────────────────────
 * To get the actual verification codes:
 *
 * Google Search Console:
 *   1. Go to https://search.google.com/search-console
 *   2. Add property → URL prefix → enter https://valuesuppliers.co
 *   3. Choose "HTML tag" verification method
 *   4. Copy the content="..." value and replace REPLACE_WITH_GOOGLE_VERIFICATION_CODE below
 *
 * Bing Webmaster Tools:
 *   1. Go to https://www.bing.com/webmasters
 *   2. Add your site → choose "HTML Meta Tag" method
 *   3. Copy the content="..." value and replace REPLACE_WITH_BING_VERIFICATION_CODE below
 *   (Bing XML file auth is also available at /BingSiteAuth.xml)
 *
 * Pinterest:
 *   1. Go to https://pinterest.com/settings/claim
 *   2. Choose "Add HTML tag" method
 *   3. Copy the content="..." value and replace REPLACE_WITH_PINTEREST_CODE below
 * ─────────────────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
    other: {
      'msvalidate.01': 'REPLACE_WITH_BING_VERIFICATION_CODE',
      'p:domain_verify': 'REPLACE_WITH_PINTEREST_CODE',
    },
  },
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
  '@type': ['Organization', 'Store'],
  name: 'ValueSuppliers.co',
  url: BASE,
  logo: `${BASE}/logo.jpg`,
  image: `${BASE}/og-image.jpg`,
  description:
    'Professional-grade disposable gloves and cannabis trimming equipment supplier. Wholesale and distribution pricing for cannabis operations, food service, medical, and industrial industries.',
  /* TODO: Replace with real phone number */
  telephone: '+1-559-000-0000',
  email: 'admin@valuesuppliersdirect.com',
  address: {
    '@type': 'PostalAddress',
    /* TODO: Replace with real street address once GBP is verified */
    addressLocality: 'Fresno',
    addressRegion: 'CA',
    postalCode: '93710',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.7378,
    longitude: -119.7871,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
  paymentAccepted: 'Credit Card, Debit Card',
  currenciesAccepted: 'USD',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'admin@valuesuppliersdirect.com',
      /* TODO: Replace with real phone number */
      telephone: '+1-559-000-0000',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'admin@valuesuppliersdirect.com',
      /* TODO: Replace with real phone number */
      telephone: '+1-559-000-0000',
      availableLanguage: 'English',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United States',
    sameAs: 'https://en.wikipedia.org/wiki/United_States',
  },
  /* TODO: Add social profile URLs as they are created */
  sameAs: [],
  knowsAbout: [
    'disposable gloves',
    'nitrile gloves',
    'cannabis trimming equipment',
    'wholesale gloves',
    'trimming scissors',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ValueSuppliers.co Product Catalog',
    url: `${BASE}/catalog`,
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Disposable Gloves', url: `${BASE}/catalog#gloves` },
      { '@type': 'OfferCatalog', name: 'Trimming Tools', url: `${BASE}/catalog#trimmers` },
      { '@type': 'OfferCatalog', name: 'Harvest Accessories', url: `${BASE}/catalog#accessories` },
    ],
  },
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
      <head>
        <link rel="preconnect" href="https://hpakqrnvjnzznhffoqaf.supabase.co" />
        <link rel="preconnect" href="https://js.squareup.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pci-connect.squareup.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hpakqrnvjnzznhffoqaf.supabase.co" />
        <link rel="dns-prefetch" href="https://js.squareup.com" />
      </head>
      <body className={`${barlow.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, websiteSchema]) }}
        />

        {/* ── Google Analytics 4 ──────────────────────────────────── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* ── Meta Pixel ──────────────────────────────────────────── */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

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
