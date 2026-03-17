import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Glove Order — Order Status Lookup',
  description:
    'Track your ValueSuppliers.co glove order. Enter your email and tracking number to see real-time shipping status and delivery updates.',
  keywords: ['track glove order', 'order tracking', 'ValueSuppliers order status', 'glove shipment tracking'],
  alternates: { canonical: 'https://valuesuppliers.co/track' },
  openGraph: {
    title: 'Track Your Glove Order | ValueSuppliers.co',
    description: 'Enter your email and tracking number to check your order status and delivery updates.',
    url: 'https://valuesuppliers.co/track',
  },
  twitter: {
    card: 'summary',
    title: 'Track Your Order | ValueSuppliers.co',
    description: 'Look up your glove order status with your email and tracking number.',
  },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
