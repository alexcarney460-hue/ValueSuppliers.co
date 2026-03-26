export type Product = {
  id: number;
  slug: string;
  category: 'Gloves';
  name: string;
  shortName: string;
  tagline: string;
  price: number;         // retail price per case/unit (display default)
  unit: string;          // e.g. "/ case" or "/ box"
  badge: string | null;
  img: string;
  images: string[];      // all images for gallery
  specs: { label: string; value: string }[];
  description: string;
  features: string[];
  useCases: string[];
  inStock: boolean;
  relatedSlugs: string[];

  // Case/box pricing (gloves only)
  boxPrice?: number;          // price per individual box (100 gloves)
  casePrice?: number;         // price per case at retail tier (1-29 cases)
  caseBoxCount?: number;      // boxes per case (default 10)
  caseGloveCount?: number;    // gloves per case (default 1000)
  wholesalePrice?: number;    // price per case at wholesale tier (30-119 cases)
  distributorPrice?: number;  // price per case at distributor tier (120+ cases)
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'nitrile-5mil-box',
    category: 'Gloves',
    name: '5 mil Nitrile Disposable Gloves — Box',
    shortName: 'Nitrile Gloves (Box)',
    tagline: 'Premium 5 mil nitrile. 100 gloves per box. Perfect for daily use.',
    price: 7.00,
    unit: '/ box',
    badge: null,
    img: '/products/product-5.avif',
    images: ['/products/product-5.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Black' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL, XXL' },
      { label: 'Count', value: '100 gloves / box' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'Our 5 mil nitrile disposable glove — sold by the box. 100 gloves per box. Powder-free and latex-free for allergy-safe applications. Strong enough for daily industrial use, comfortable enough to wear all day. Ideal for individual purchase or small operations.',
    features: [
      'Powder-free — no residue contamination risk',
      'Latex-free — safe for latex-sensitive workers',
      'Textured fingertips for improved grip',
      'Beaded cuff for easy donning',
      'Ambidextrous fit — works on both hands',
      'Chemical and puncture resistant',
    ],
    useCases: [
      'Cannabis cultivation & trimming',
      'Food handling & food service',
      'Janitorial & sanitation',
      'General manufacturing',
      'Auto mechanics & detailing',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-5mil-case'],
    boxPrice: 7.00,
  },
  {
    id: 2,
    slug: 'nitrile-5mil-case',
    category: 'Gloves',
    name: '5 mil Nitrile Disposable Gloves — Case',
    shortName: 'Nitrile Gloves (Case)',
    tagline: 'Save 20% buying by the case. 10 boxes, 1,000 gloves total.',
    price: 70.00,
    unit: '/ case',
    badge: 'Best Value',
    img: '/products/product-3.avif',
    images: ['/products/product-3.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Black' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL, XXL' },
      { label: 'Count', value: '10 boxes / case (1,000 gloves)' },
      { label: 'Price Per Box', value: '$7.00 per box' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'The same premium 5 mil nitrile glove — sold by the case. 10 boxes per case, 1,000 gloves total. At $7.00 per box retail. Volume discounts available for wholesale (30+ cases at $60/case) and distributor (120+ cases at $50/case) orders.',
    features: [
      '10 boxes per case — 1,000 gloves total',
      '$7.00/box retail — volume discounts at 30+ and 120+ cases',
      'Same 5 mil nitrile spec as individual boxes',
      'Powder-free and latex-free',
      'Volume discounts: 30+ cases wholesale, 120+ distributor',
      'Textured fingertips, beaded cuff, ambidextrous',
    ],
    useCases: [
      'Cannabis cultivation & trimming',
      'Food handling & food service',
      'Janitorial & sanitation',
      'General manufacturing',
      'Auto mechanics & detailing',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-5mil-box', 'nitrile-5mil-case'],
    boxPrice: 7.00,
    casePrice: 70.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 60.00,
    distributorPrice: 50.00,
  },
];

export default PRODUCTS;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean) as Product[];
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

/** Returns true if a product supports case/box purchasing (gloves only). */
export function hasCasePricing(product: Product): boolean {
  return product.casePrice != null && product.boxPrice != null;
}

/** Get the per-case price based on total case quantity in the order. */
export function getCasePriceForQuantity(product: Product, caseQty: number): number {
  if (caseQty >= 120) return product.distributorPrice ?? product.casePrice ?? product.price;
  if (caseQty >= 30) return product.wholesalePrice ?? product.casePrice ?? product.price;
  return product.casePrice ?? product.price;
}

/** Get the tier name based on total case quantity. */
export function getTierName(caseQty: number): 'Retail' | 'Wholesale' | 'Distributor' {
  if (caseQty >= 120) return 'Distributor';
  if (caseQty >= 30) return 'Wholesale';
  return 'Retail';
}

/** Get how many more cases needed to reach the next tier, or null if at highest. */
export function casesToNextTier(caseQty: number): { needed: number; tierName: string; tierPrice?: number } | null {
  if (caseQty >= 120) return null; // already at highest tier
  if (caseQty >= 30) return { needed: 120 - caseQty, tierName: 'Distributor' };
  return { needed: 30 - caseQty, tierName: 'Wholesale' };
}
