import { NextResponse } from 'next/server';

const BASE = 'https://valuesuppliers.co';

/**
 * AI agent discovery manifest (similar to ChatGPT plugin spec).
 * Tells AI shopping agents what this store is, what it sells, and where
 * to find the machine-readable product feed.
 *
 * GET /.well-known/ai-plugin.json
 */
export function GET() {
  const manifest = {
    schema_version: 'v1',
    name_for_human: 'ValueSuppliers.co',
    name_for_model: 'valuesuppliers',
    description_for_human:
      'Professional-grade disposable gloves and cannabis trimming supplies. Retail, wholesale, and distribution pricing. Ships to 48 US states.',
    description_for_model:
      'ValueSuppliers.co is a B2B/B2C supplier of professional-grade disposable gloves (nitrile, 5 mil, powder-free) and cannabis trimming equipment (scissors, trim trays, cleaning supplies). ' +
      'Products are sold individually and by the case. Three pricing tiers: Retail (1-29 cases, $80/case), Wholesale (30-119 cases, $70/case, requires approved account), Distribution (120+ cases, $56.60/case). ' +
      'All products are in stock with 1-2 business day processing. Ships to 48 contiguous US states. ' +
      'The product catalog is available as structured JSON at /products.json for programmatic access.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: `${BASE}/products.json`,
      has_user_authentication: false,
    },
    logo_url: `${BASE}/logo.jpg`,
    contact_email: 'admin@valuesuppliersdirect.com',
    legal_info_url: `${BASE}/about`,
    product_catalog_url: `${BASE}/products.json`,
    website_url: BASE,
    categories: [
      'disposable gloves',
      'cannabis supplies',
      'trimming equipment',
      'industrial supplies',
      'wholesale supplies',
    ],
    supported_countries: ['US'],
    currency: 'USD',
    pricing_model: {
      type: 'tiered',
      tiers: [
        {
          name: 'Retail',
          description: 'Standard pricing. No minimum, no application required.',
          min_cases: 1,
          max_cases: 29,
          glove_case_price_usd: 80.0,
        },
        {
          name: 'Wholesale',
          description: 'For businesses ordering 30+ cases. Requires approved application.',
          min_cases: 30,
          max_cases: 119,
          glove_case_price_usd: 70.0,
          savings_per_case_usd: 10.0,
        },
        {
          name: 'Distribution',
          description: 'For large operations ordering 120+ cases. Dedicated rep and priority allocation.',
          min_cases: 120,
          glove_case_price_usd: 56.6,
          savings_per_case_usd: 23.4,
          net_terms_available: true,
        },
      ],
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
