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
  casePrice?: number;         // price per case at retail tier (1-20 cases)
  caseBoxCount?: number;      // boxes per case (default 10)
  caseGloveCount?: number;    // gloves per case (default 1000)
  wholesalePrice?: number;    // price per case at wholesale tier (21-120 cases)
  distributorPrice?: number;  // price per case at distributor tier (121+ cases)
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'nitrile-4mil',
    category: 'Gloves',
    name: 'Nitrile Disposable Gloves — 5 mil',
    shortName: 'Nitrile Gloves 5 mil',
    tagline: 'The industry standard. Powder-free, puncture-resistant, latex-free.',
    price: 18.99,
    unit: '/ case',
    badge: 'Best Seller',
    img: '/products/product-1.avif',
    images: ['/products/product-1.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Blue' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' },
      { label: 'Count', value: '100 gloves / case' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'Our best-selling 5 mil nitrile glove covers every industry from food service and janitorial to medical, automotive, and general labor. Powder-free and latex-free for allergy-safe applications. Strong enough for daily industrial use, comfortable enough to wear all day.',
    features: [
      'Powder-free — no residue contamination risk',
      'Latex-free — safe for latex-sensitive workers',
      'Textured fingertips for improved grip',
      'Beaded cuff for easy donning',
      'Ambidextrous fit — works on both hands',
      'Chemical and puncture resistant',
    ],
    useCases: [
      'Food handling & food service',
      'Janitorial & sanitation',
      'General manufacturing',
      'Medical & dental (non-sterile)',
      'Industrial maintenance',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-6mil', 'black-nitrile-4mil', 'vinyl-gloves'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
  },
  {
    id: 2,
    slug: 'nitrile-6mil',
    category: 'Gloves',
    name: 'Nitrile Disposable Gloves — 5 mil',
    shortName: 'Nitrile Gloves 5 mil',
    tagline: 'Heavy-duty protection for chemical and high-abrasion environments.',
    price: 24.99,
    unit: '/ case',
    badge: null,
    img: '/products/product-2.avif',
    images: ['/products/product-2.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Blue' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Count', value: '100 gloves / case' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'Our heavy-duty 5 mil nitrile is built for environments with chemical exposure, prolonged wear, and abrasive surfaces. Enhanced durability yet still flexible enough for dexterous tasks. Trusted by maintenance crews, chemical handlers, and industrial operations.',
    features: [
      '5 mil thickness — heavy-duty protection',
      'Enhanced chemical resistance',
      'Extended cuff for additional wrist protection',
      'Micro-textured fingertips for grip',
      'Powder-free and latex-free',
      'Heavy-duty without sacrificing dexterity',
    ],
    useCases: [
      'Chemical handling',
      'Auto maintenance',
      'Painting & finishing',
      'Hazardous material handling',
      'Industrial manufacturing',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'black-nitrile-4mil', 'nitrile-xl-box'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
  },
  {
    id: 3,
    slug: 'latex-exam-gloves',
    category: 'Gloves',
    name: 'Latex Exam Gloves — 5 mil',
    shortName: 'Latex Exam Gloves',
    tagline: 'Natural rubber latex. Exam-grade sensitivity and superior fit.',
    price: 14.99,
    unit: '/ case',
    badge: null,
    img: '/products/product-3.avif',
    images: ['/products/product-3.avif'],
    specs: [
      { label: 'Material', value: 'Natural Rubber Latex' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Natural / Cream' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Count', value: '100 gloves / case' },
      { label: 'Certification', value: 'ASTM D3578 (Exam)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'Natural rubber latex delivers the closest fit and highest tactile sensitivity of any disposable glove material. Exam-grade certified with superior elasticity that conforms to your hand for extended-wear comfort. Not recommended for latex-sensitive individuals.',
    features: [
      'Exam-grade natural rubber latex',
      'Superior tactile sensitivity',
      'High elasticity — conforms to hand shape',
      'Powder-free formulation',
      'Ambidextrous design',
      'Beaded cuff for easy don/doff',
    ],
    useCases: [
      'Medical & dental applications',
      'Laboratory work requiring sensitivity',
      'Precision handling tasks',
      'Veterinary use',
      'Scientific research',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'vinyl-gloves', 'nitrile-6mil'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
  },
  {
    id: 4,
    slug: 'vinyl-gloves',
    category: 'Gloves',
    name: 'Vinyl Disposable Gloves',
    shortName: 'Vinyl Gloves',
    tagline: 'Latex-free, cost-effective protection for light-duty applications.',
    price: 11.99,
    unit: '/ case',
    badge: 'Value',
    img: '/products/product-4.avif',
    images: ['/products/product-4.avif'],
    specs: [
      { label: 'Material', value: 'PVC (Vinyl)' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Clear' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Count', value: '100 gloves / case' },
      { label: 'Latex', value: 'Latex-Free' },
      { label: 'AQL', value: '2.5' },
    ],
    description:
      'Our best-value glove for light-duty applications where allergen avoidance and low cost are the priority. PVC vinyl is 100% latex-free, making it ideal for food service and environments with latex-sensitive staff. Cost-effective for high-volume, short-task usage.',
    features: [
      '100% latex-free — allergy safe',
      'Budget-friendly for high-volume use',
      'Smooth finish — easy to don/doff quickly',
      'Powder-free',
      'Passed FDA food-contact requirements',
      'Ambidextrous fit',
    ],
    useCases: [
      'Food service & food handling',
      'Deli & grocery',
      'Light cleaning tasks',
      'Retail & customer service',
      'Short-duration handling tasks',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'latex-exam-gloves', 'nitrile-6mil'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
  },
  {
    id: 5,
    slug: 'black-nitrile-4mil',
    category: 'Gloves',
    name: 'Black Nitrile Gloves — 5 mil',
    shortName: 'Black Nitrile Gloves',
    tagline: 'Black nitrile for tattooing, automotive, professional kitchens, and trades.',
    price: 21.99,
    unit: '/ case',
    badge: null,
    img: '/products/product-5.avif',
    images: ['/products/product-5.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Black' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL, XXL' },
      { label: 'Count', value: '100 gloves / case' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'The same reliable 5 mil nitrile protection — in black. Popular in tattoo studios, automotive shops, professional kitchens, and industrial environments where black gloves are the standard. Conceals stains, projects professionalism, and performs exactly like our standard nitrile.',
    features: [
      'Black color — conceals stains and residue',
      'Same spec as our standard 5 mil nitrile',
      'Powder-free and latex-free',
      'Textured fingertip grip',
      'Professional appearance',
      'Chemical and puncture resistant',
    ],
    useCases: [
      'Tattoo studios',
      'Auto mechanics & detailing',
      'Professional kitchens',
      'Barbershops & salons',
      'Industrial manufacturing',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'nitrile-6mil', 'nitrile-xl-box'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
  },
  {
    id: 6,
    slug: 'nitrile-xl-box',
    category: 'Gloves',
    name: 'XL Nitrile Gloves — Box',
    shortName: 'XL Nitrile Gloves',
    tagline: 'Extra-large nitrile for bigger hands. Full-case availability for commercial operations.',
    price: 22.99,
    unit: '/ box',
    badge: null,
    img: '/products/product-6.avif',
    images: ['/products/product-6.avif'],
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '5 mil' },
      { label: 'Color', value: 'Blue' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Size', value: 'XL Only' },
      { label: 'Count', value: '100 gloves / box' },
      { label: 'Certification', value: 'ASTM D6319 (Industrial)' },
      { label: 'AQL', value: '1.5' },
    ],
    description:
      'Sized for larger hands — no compromises. Our XL nitrile box delivers the same 5 mil powder-free nitrile performance as our standard line, sized up for the workers who need it. Available by the box for retail or full cases for wholesale operations.',
    features: [
      'Extra-large sizing for bigger hand profiles',
      'Same 5 mil nitrile performance spec',
      'Powder-free and latex-free',
      'Textured fingertip grip',
      'Ambidextrous design',
      'Beaded cuff for easy donning',
    ],
    useCases: [
      'Industrial manufacturing',
      'Construction & skilled trades',
      'Large-frame workers in any industry',
      'Warehouse & logistics',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'black-nitrile-4mil', 'nitrile-6mil'],
    boxPrice: 10.00,
    casePrice: 80.00,
    caseBoxCount: 10,
    caseGloveCount: 1000,
    wholesalePrice: 70.00,
    distributorPrice: 60.00,
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
  if (caseQty >= 121) return product.distributorPrice ?? product.casePrice ?? product.price;
  if (caseQty >= 21) return product.wholesalePrice ?? product.casePrice ?? product.price;
  return product.casePrice ?? product.price;
}

/** Get the tier name based on total case quantity. */
export function getTierName(caseQty: number): 'Retail' | 'Wholesale' | 'Distributor' {
  if (caseQty >= 121) return 'Distributor';
  if (caseQty >= 21) return 'Wholesale';
  return 'Retail';
}

/** Get how many more cases needed to reach the next tier, or null if at highest. */
export function casesToNextTier(caseQty: number): { needed: number; tierName: string; tierPrice?: number } | null {
  if (caseQty >= 121) return null; // already at highest tier
  if (caseQty >= 21) return { needed: 121 - caseQty, tierName: 'Distributor' };
  return { needed: 21 - caseQty, tierName: 'Wholesale' };
}
