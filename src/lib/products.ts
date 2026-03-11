export type Product = {
  id: number;
  slug: string;
  category: 'Gloves' | 'Trimmers' | 'Accessories';
  name: string;
  shortName: string;
  tagline: string;
  price: number;         // retail price per case/unit
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
      'Our best-selling 5 mil nitrile glove covers every industry from cannabis cultivation to food service, janitorial, and general labor. Powder-free and latex-free for allergy-safe applications. Strong enough for daily industrial use, comfortable enough to wear all day.',
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
      'Medical & dental (non-sterile)',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-6mil', 'black-nitrile-4mil', 'vinyl-gloves'],
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
      'Our heavy-duty 5 mil nitrile is built for environments with chemical exposure, prolonged wear, and abrasive surfaces. Enhanced durability yet still flexible enough for dexterous tasks. Trusted by extraction labs, maintenance crews, and chemical handlers.',
    features: [
      '5 mil thickness — heavy-duty protection',
      'Enhanced chemical resistance',
      'Extended cuff for additional wrist protection',
      'Micro-textured fingertips for grip',
      'Powder-free and latex-free',
      'Heavy-duty without sacrificing dexterity',
    ],
    useCases: [
      'Cannabis extraction & processing',
      'Chemical handling',
      'Auto maintenance',
      'Painting & finishing',
      'Hazardous material handling',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'black-nitrile-4mil', 'nitrile-xl-box'],
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
  },
  {
    id: 5,
    slug: 'black-nitrile-4mil',
    category: 'Gloves',
    name: 'Black Nitrile Gloves — 5 mil',
    shortName: 'Black Nitrile Gloves',
    tagline: 'Black nitrile for cannabis, tattooing, auto, and professional trades.',
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
      'The same reliable 5 mil nitrile protection — in black. Popular in cannabis operations, tattoo studios, automotive shops, and professional kitchens where black gloves are the standard. Conceals residue, projects professionalism, and performs exactly like our standard nitrile.',
    features: [
      'Black color — conceals terpene and resin residue',
      'Same spec as our standard 5 mil nitrile',
      'Powder-free and latex-free',
      'Textured fingertip grip',
      'Professional appearance',
      'Chemical and puncture resistant',
    ],
    useCases: [
      'Cannabis cultivation, trimming & processing',
      'Tattoo studios',
      'Auto mechanics & detailing',
      'Professional kitchens',
      'Barbershops & salons',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'nitrile-6mil', 'nitrile-xl-box'],
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
      'Commercial cannabis operations',
      'Industrial manufacturing',
      'Construction & skilled trades',
      'Large-frame workers in any industry',
    ],
    inStock: true,
    relatedSlugs: ['nitrile-4mil', 'black-nitrile-4mil', 'nitrile-6mil'],
  },
  {
    id: 7,
    slug: 'curved-trimming-scissors',
    category: 'Trimmers',
    name: 'Curved Trimming Scissors',
    shortName: 'Curved Trim Scissors',
    tagline: 'Titanium-coated curved blades for precision trimming without fatigue.',
    price: 12.50,
    unit: '/ unit',
    badge: 'New',
    img: '/products/product-1.avif',
    images: ['/products/product-1.avif'],
    specs: [
      { label: 'Blade Material', value: 'Stainless Steel, Titanium Coated' },
      { label: 'Blade Type', value: 'Curved' },
      { label: 'Handle', value: 'Comfort-grip, Spring-loaded' },
      { label: 'Length', value: '6.5 inches overall' },
      { label: 'Blade Length', value: '2.5 inches' },
      { label: 'Non-Stick', value: 'Yes — titanium coating' },
      { label: 'Handed', value: 'Ambidextrous' },
    ],
    description:
      'Engineered for high-volume trimming. The curved blade follows the natural contour of flower for faster, cleaner cuts with less wrist rotation. Titanium coating prevents resin buildup, and the spring-loaded handle dramatically reduces hand fatigue during long trim runs.',
    features: [
      'Curved blade for natural trimming motion',
      'Titanium-coated — resists resin and plant sap',
      'Spring-loaded handle — reduces hand fatigue',
      'Micro-serrated inner blade edge',
      'Ambidextrous — works for left and right hand',
      'Easy to clean and maintain',
    ],
    useCases: [
      'Cannabis flower trimming',
      'Commercial harvest operations',
      'Craft cultivators',
      'Bonsai and plant cultivation',
      'General horticulture',
    ],
    inStock: true,
    relatedSlugs: ['bonsai-precision-snips', 'trimming-tray-large', 'black-nitrile-4mil'],
  },
  {
    id: 8,
    slug: 'bonsai-precision-snips',
    category: 'Trimmers',
    name: 'Bonsai Precision Snips',
    shortName: 'Precision Snips',
    tagline: 'Stainless steel snips for detail work and precision cuts.',
    price: 9.99,
    unit: '/ unit',
    badge: null,
    img: '/products/product-2.avif',
    images: ['/products/product-2.avif'],
    specs: [
      { label: 'Blade Material', value: 'Stainless Steel' },
      { label: 'Blade Type', value: 'Straight, precision point' },
      { label: 'Non-Stick', value: 'Yes — non-stick coating' },
      { label: 'Length', value: '5.5 inches overall' },
      { label: 'Spring', value: 'Self-opening spring' },
      { label: 'Handed', value: 'Ambidextrous' },
    ],
    description:
      'Precision-point stainless steel snips for detail trimming. Narrower profile reaches tight spots standard scissors can\'t. Non-stick coating keeps blades clean longer. The self-opening spring means minimal effort per cut — critical for sustained precision work.',
    features: [
      'Narrow precision-point blade for detail cuts',
      'Non-stick coating resists buildup',
      'Self-opening spring action',
      'Lightweight — reduced hand fatigue',
      'Corrosion-resistant stainless steel',
      'Easy wipe-clean maintenance',
    ],
    useCases: [
      'Detail trimming on cannabis flower',
      'Manicuring and finishing',
      'Bonsai and precision horticulture',
      'Deadheading and pruning',
    ],
    inStock: true,
    relatedSlugs: ['curved-trimming-scissors', 'trimming-tray-large', 'black-nitrile-4mil'],
  },
  {
    id: 9,
    slug: 'trimming-tray-large',
    category: 'Accessories',
    name: 'Trimming Tray — Large',
    shortName: 'Trim Tray Large',
    tagline: '19"×13" rigid tray with fine mesh screen. Catch every kief.',
    price: 34.99,
    unit: '/ unit',
    badge: null,
    img: '/products/product-3.avif',
    images: ['/products/product-3.avif'],
    specs: [
      { label: 'Dimensions', value: '19" × 13" × 2.5"' },
      { label: 'Material', value: 'BPA-Free ABS Plastic' },
      { label: 'Screen Included', value: 'Yes — 150 micron mesh' },
      { label: 'Screen Material', value: 'Stainless Steel Mesh' },
      { label: 'Color', value: 'Black' },
      { label: 'Cleanup', value: 'Dishwasher safe (tray only)' },
    ],
    description:
      'A clean, organized workstation starts with the right tray. The large 19"×13" rigid ABS tray holds significant volume for commercial trim runs. The included 150-micron stainless steel mesh screen sits inside the tray to collect kief as you trim — remove it when done to recover what accumulated beneath.',
    features: [
      '19"×13" large format — serious workstation capacity',
      'Included 150-micron stainless steel mesh screen',
      'Rigid BPA-free ABS plastic — won\'t flex or warp',
      'Raised edges prevent product rolloff',
      'Dishwasher-safe tray for easy cleanup',
      'Stacks flat for storage',
    ],
    useCases: [
      'Cannabis trimming workstation',
      'Commercial harvest processing',
      'Kief collection',
      'Sorting and manicuring',
    ],
    inStock: true,
    relatedSlugs: ['curved-trimming-scissors', 'bonsai-precision-snips', 'black-nitrile-4mil'],
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
