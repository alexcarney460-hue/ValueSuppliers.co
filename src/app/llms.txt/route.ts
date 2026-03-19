import PRODUCTS from '@/lib/products';

export const dynamic = 'force-static';

export function GET() {
  const gloves = PRODUCTS.filter((p) => p.category === 'Gloves');
  const trimmers = PRODUCTS.filter((p) => p.category === 'Trimmers');
  const accessories = PRODUCTS.filter((p) => p.category === 'Accessories');

  const body = `# ValueSuppliers.co
> Professional-grade disposable gloves and cannabis trimming supplies.

## What We Sell
ValueSuppliers.co is an online store selling disposable gloves (nitrile, by the box or case) and cannabis trimming equipment (scissors, trim trays, cleaning supplies). We serve cannabis operations, food service, medical, janitorial, and industrial customers nationwide in the United States.

## Product Catalog

### Gloves (${gloves.length} products)
${gloves.map((p) => `- ${p.name}: $${p.price.toFixed(2)} ${p.unit} — ${p.tagline}`).join('\n')}

### Trimming Scissors (${trimmers.length} products)
${trimmers.map((p) => `- ${p.name}: $${p.price.toFixed(2)} ${p.unit} — ${p.tagline}`).join('\n')}

### Accessories (${accessories.length} products)
${accessories.map((p) => `- ${p.name}: $${p.price.toFixed(2)} ${p.unit} — ${p.tagline}`).join('\n')}

## Pricing Tiers (Gloves — Cases)
We offer volume-based pricing on glove cases (10 boxes / 1,000 gloves per case):

| Tier         | Quantity       | Price Per Case |
|--------------|----------------|----------------|
| Retail       | 1–29 cases     | $80.00         |
| Wholesale    | 30–119 cases   | $70.00         |
| Distribution | 120+ cases     | $60.00         |

Individual glove boxes (100 gloves) are available at $10.00/box.

## How to Order
1. Browse our catalog at https://valuesuppliers.co/catalog
2. Add items to cart and select size/quantity
3. Checkout with secure Square payment processing
4. We accept all major credit cards

For wholesale (30+ cases) or distribution (120+ cases) orders:
- Visit https://valuesuppliers.co/wholesale
- Or email admin@valuesuppliersdirect.com

## Shipping
- We ship nationwide within the United States
- Orders are processed and shipped promptly
- Track your order at https://valuesuppliers.co/track

## Contact
- Email: admin@valuesuppliersdirect.com
- Website: https://valuesuppliers.co/contact
- Live chat available on our website

## Industries Served
- Cannabis cultivation and trimming operations
- Food handling and food service
- Medical and dental offices
- Janitorial and sanitation
- Auto mechanics and detailing
- General manufacturing and industrial

## Key Pages
- Catalog: https://valuesuppliers.co/catalog
- Wholesale Program: https://valuesuppliers.co/wholesale
- Distribution Program: https://valuesuppliers.co/distribution
- Commercial Accounts: https://valuesuppliers.co/commercial
- Affiliate Program: https://valuesuppliers.co/affiliate
- About Us: https://valuesuppliers.co/about
- Contact: https://valuesuppliers.co/contact
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
