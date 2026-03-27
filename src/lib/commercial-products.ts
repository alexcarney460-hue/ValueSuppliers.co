export type CommercialProduct = {
  id: number;
  slug: string;
  category: 'Nitrile' | 'Latex' | 'Vinyl';
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  unit: string;
  badge: string | null;
  img: string;
  images: string[];
  specs: { label: string; value: string }[];
  description: string;
  features: string[];
  useCases: string[];
  inStock: boolean;
  relatedSlugs: string[];
  boxPrice?: number;
  casePrice?: number;
  caseBoxCount?: number;
  caseGloveCount?: number;
  wholesalePrice?: number;
  distributorPrice?: number;
  color: string;
  thickness: string;
  glovesPerBox: number;
  boxesPerCase: number;
  sku?: string;
  discount?: number;
};

const COMMERCIAL_PRODUCTS: CommercialProduct[] = [
  // ─── NITRILE ───────────────────────────────────────────────────────────
  {
    id: 1,
    slug: '3mil-nitrile-purple-200ct',
    category: 'Nitrile',
    name: '3mil Disposable Nitrile Gloves — Purple (200ct)',
    shortName: '3mil Purple (200ct)',
    tagline: 'Value pack — 200 gloves per box, 2,000 per case.',
    price: 79.00,
    unit: '/ box',
    badge: '-30%',
    img: '/products/gp/3mil-purple.png',
    images: ['/products/gp/3mil-purple.png'],
    color: 'Purple',
    thickness: '3mil',
    glovesPerBox: 200,
    boxesPerCase: 10,
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '3 mil' },
      { label: 'Color', value: 'Purple' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Count', value: '200 gloves / box, 10 boxes / case' },
      { label: 'Certification', value: 'FDA 510K Cleared' },
    ],
    description: 'Purple nitrile gloves, 3mil thickness yet strong and elastic. 200pcs/box, 10 boxes per case (2,000 gloves). FDA 510K cleared for medical or daily use.',
    features: ['Powder-free, latex-free formulation', '200 gloves per box — high-volume value', 'FDA 510K cleared for medical and daily use', 'Durable nitrile with excellent stretch', 'Ambidextrous with beaded cuff'],
    useCases: ['Food service', 'Medical & dental', 'Cannabis cultivation', 'Janitorial', 'General use'],
    inStock: true,
    relatedSlugs: ['gp30-nitrile-purple-35mil', 'gp33-nitrile-pink-35mil'],
    boxPrice: 79.00, casePrice: 699.00, caseBoxCount: 10, caseGloveCount: 2000, wholesalePrice: 599.00, distributorPrice: 499.00, discount: 30,
  },
  {
    id: 2,
    slug: 'dental-mates-4mil-nitrile',
    category: 'Nitrile',
    name: 'Dental Mates 4mil Nitrile Gloves — Case (1,000ct)',
    shortName: 'Dental Mates 4mil',
    tagline: 'Strong 4mil quality, 100 gloves per box, 10 boxes per case.',
    price: 35.00,
    unit: '/ box',
    badge: '-40%',
    img: '/products/gp/dental-4mil.jpg',
    images: ['/products/gp/dental-4mil.jpg'],
    color: 'Various',
    thickness: '4mil',
    glovesPerBox: 100,
    boxesPerCase: 10,
    specs: [
      { label: 'Material', value: 'Nitrile' },
      { label: 'Thickness', value: '4 mil' },
      { label: 'Powder', value: 'Powder-Free' },
      { label: 'Sizes', value: 'XS, S, M, L, XL' },
      { label: 'Count', value: '100 gloves / box, 10 boxes / case' },
      { label: 'Certification', value: 'FDA 510K Cleared' },
    ],
    description: 'Strong 4mil nitrile disposable gloves. 100 per box, 10 boxes per case. FDA 510K cleared for medical or daily use.',
    features: ['Powder-free, latex-free', 'FDA 510K cleared', 'Strong 4mil for medical-grade protection', 'Textured fingertips for improved grip', 'Ambidextrous with beaded cuff'],
    useCases: ['Dental offices', 'Medical exams', 'Food handling', 'Lab work', 'Cleaning'],
    inStock: true,
    relatedSlugs: ['gp40-nitrile-blue-4mil', 'super-thin-nitrile-4mil'],
    boxPrice: 35.00, casePrice: 299.00, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 259.00, distributorPrice: 219.00, discount: 40,
  },
  {
    id: 3, slug: 'gp30-nitrile-purple-35mil', category: 'Nitrile',
    name: 'GP30 Purple 3.5mil Nitrile Gloves', shortName: 'GP30 Purple 3.5mil',
    tagline: 'Chemical resistant, hypoallergenic, puncture-resistant exam glove.',
    price: 49.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp30-purple-35mil.png', images: ['/products/gp/gp30-purple-35mil.png'],
    color: 'Purple', thickness: '3.5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP30',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '3.5 mil' }, { label: 'Color', value: 'Purple' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Certification', value: 'ASTM D6319, EN 455-3' }],
    description: 'Chemical resistant with excellent puncture resistance. Hypoallergenic, powder-free, zero latex protein.',
    features: ['Chemical resistance per ASTM D6319', 'Hypoallergenic — zero latex protein', 'Puncture resistant (Level 3 per EN 388:2016)', '98% dexterity retention', 'Multi-sector: medical, industrial, food'],
    useCases: ['Medical exams', 'Laboratory', 'Chemical handling', 'Food processing', 'Industrial'],
    inStock: true, relatedSlugs: ['gp31-nitrile-rosered-35mil', 'gp32-nitrile-blue-35mil'],
    boxPrice: 49.99, casePrice: 399.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 349.99, distributorPrice: 299.99, discount: 29,
  },
  {
    id: 4, slug: 'gp31-nitrile-rosered-35mil', category: 'Nitrile',
    name: 'GP31 Rose Red 3.5mil Nitrile Gloves', shortName: 'GP31 Rose Red 3.5mil',
    tagline: 'Vibrant rose red, perfect for esthetics and light-duty tasks.',
    price: 49.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp31-rosered-35mil.png', images: ['/products/gp/gp31-rosered-35mil.png'],
    color: 'Rose Red', thickness: '3.5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP31',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '3.5 mil' }, { label: 'Color', value: 'Rose Red' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Certification', value: 'Food-Safe Certified' }],
    description: 'Vibrant rose red nitrile gloves, 3.5mil thickness. Latex and powder-free.',
    features: ['Latex & powder-free', 'Food-safe certified', 'Vibrant rose red color', 'Excellent elasticity and comfort', 'Textured fingertips for grip'],
    useCases: ['Beauty & esthetics', 'Pet care', 'Cleaning', 'Food handling', 'Crafts'],
    inStock: true, relatedSlugs: ['gp30-nitrile-purple-35mil', 'gp33-nitrile-pink-35mil'],
    boxPrice: 49.99, casePrice: 399.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 349.99, distributorPrice: 299.99, discount: 29,
  },
  {
    id: 5, slug: 'gp32-nitrile-blue-35mil', category: 'Nitrile',
    name: 'GP32 Blue 3.5mil Nitrile Gloves', shortName: 'GP32 Blue 3.5mil',
    tagline: 'Soft blue nitrile with extreme elasticity and textured grip.',
    price: 49.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp32-blue-35mil.png', images: ['/products/gp/gp32-blue-35mil.png'],
    color: 'Blue', thickness: '3.5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP32',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '3.5 mil' }, { label: 'Color', value: 'Blue' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: 'Soft blue nitrile gloves with extreme elasticity and textured finish.',
    features: ['Extreme elasticity and soft comfort', 'Textured finish for strong grip', 'Puncture resistant', 'Latex-free and powder-free', 'Ambidextrous with beaded cuff'],
    useCases: ['Medical exams', 'Food service', 'Cleaning', 'Laboratory', 'General use'],
    inStock: true, relatedSlugs: ['gp35-nitrile-blue-35mil-250ct', 'gp40-nitrile-blue-4mil'],
    boxPrice: 49.99, casePrice: 399.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 349.99, distributorPrice: 299.99, discount: 29,
  },
  {
    id: 6, slug: 'gp33-nitrile-pink-35mil', category: 'Nitrile',
    name: 'GP33 Pink 3.5mil Nitrile Gloves', shortName: 'GP33 Pink 3.5mil',
    tagline: 'Vibrant pink with micro-roughened surface for superior grip.',
    price: 49.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp33-pink-35mil.png', images: ['/products/gp/gp33-pink-35mil.png'],
    color: 'Pink', thickness: '3.5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP33',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '3.5 mil' }, { label: 'Color', value: 'Pink' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Certification', value: 'Food-Safe Certified' }],
    description: 'Vibrant pink nitrile gloves with micro-roughened surface for superior grip. Food-safe certified.',
    features: ['Micro-roughened surface for superior grip', 'Exceptional elasticity', 'Food-safe certified', 'Latex-free, powder-free', 'Ambidextrous with beaded cuff'],
    useCases: ['Beauty salons', 'Food handling', 'Cleaning', 'Pet care', 'Crafts'],
    inStock: true, relatedSlugs: ['gp31-nitrile-rosered-35mil', 'gp30-nitrile-purple-35mil'],
    boxPrice: 49.99, casePrice: 399.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 349.99, distributorPrice: 299.99, discount: 29,
  },
  {
    id: 7, slug: 'gp35-nitrile-blue-35mil-250ct', category: 'Nitrile',
    name: 'GP35 Blue 3.5mil Nitrile Gloves (250ct Box)', shortName: 'GP35 Blue 3.5mil (250ct)',
    tagline: 'High-volume 250-count box for heavy-use operations.',
    price: 119.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp35-blue-35mil.png', images: ['/products/gp/gp35-blue-35mil.png'],
    color: 'Blue', thickness: '3.5mil', glovesPerBox: 250, boxesPerCase: 10, sku: 'GP35',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '3.5 mil' }, { label: 'Color', value: 'Blue' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL' }, { label: 'Count', value: '250 gloves / box' }],
    description: 'High-volume 250-count blue nitrile gloves for household and professional use.',
    features: ['250 gloves per box — high volume', 'Soft and comfortable fit', 'Powder-free, latex-free', 'Great for household and commercial use', 'Textured for secure grip'],
    useCases: ['Household cleaning', 'Food prep', 'Janitorial', 'General use', 'Facility maintenance'],
    inStock: true, relatedSlugs: ['gp32-nitrile-blue-35mil', 'gp40-nitrile-blue-4mil'],
    boxPrice: 119.99, casePrice: 969.00, caseBoxCount: 10, caseGloveCount: 2500, wholesalePrice: 849.00, distributorPrice: 749.00, discount: 29,
  },
  {
    id: 8, slug: 'gp40-nitrile-blue-4mil', category: 'Nitrile',
    name: 'GP40 Blue 4mil Nitrile Exam Gloves', shortName: 'GP40 Blue 4mil',
    tagline: 'Trusted 4mil blue nitrile for everyday cleaning and exam use.',
    price: 54.99, unit: '/ box', badge: '-29%',
    img: '/products/gp/gp40-blue-4mil.jpg', images: ['/products/gp/gp40-blue-4mil.jpg'],
    color: 'Blue', thickness: '4mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP40',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '4 mil' }, { label: 'Color', value: 'Blue' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: 'GP Craft blue nitrile gloves — durable 4mil, perfect for household cleaning.',
    features: ['Durable 4mil for daily use', 'Comfortable fit all day', 'Powder-free, latex-free', 'Textured fingertips', 'Ambidextrous with beaded cuff'],
    useCases: ['Household cleaning', 'Food service', 'Medical exams', 'Janitorial', 'Automotive'],
    inStock: true, relatedSlugs: ['dental-mates-4mil-nitrile', 'gp50-nitrile-black-5mil'],
    boxPrice: 54.99, casePrice: 449.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 389.99, distributorPrice: 339.99, discount: 29,
  },
  {
    id: 9, slug: 'gp50-nitrile-black-5mil', category: 'Nitrile',
    name: 'GP50 Black 5mil Nitrile Exam Gloves', shortName: 'GP50 Black 5mil',
    tagline: 'Professional-grade black nitrile with extreme elasticity.',
    price: 59.99, unit: '/ box', badge: '-27%',
    img: '/products/gp/gp50-black-5mil.jpg', images: ['/products/gp/gp50-black-5mil.jpg'],
    color: 'Black', thickness: '5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP50',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '5 mil' }, { label: 'Color', value: 'Black' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: 'Black nitrile gloves, powder-free. Extreme elasticity and textured grip.',
    features: ['Extreme elasticity and textured grip', 'Stain-resistant black color', 'Powder-free, latex-free', 'Ambidextrous with beaded cuff', 'Chemical and puncture resistant'],
    useCases: ['Tattoo & beauty', 'Automotive', 'Cannabis trimming', 'Gardening', 'Food service'],
    inStock: true, relatedSlugs: ['gp51-nitrile-black-55mil', 'gp63-nitrile-black-6mil'],
    boxPrice: 59.99, casePrice: 479.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 419.99, distributorPrice: 359.99, discount: 27,
  },
  {
    id: 10, slug: 'gp51-nitrile-black-55mil', category: 'Nitrile',
    name: 'GP51 Black 5.5mil Nitrile Exam Gloves', shortName: 'GP51 Black 5.5mil',
    tagline: 'Medical-grade 5.5mil — approved for chemo and fentanyl protection.',
    price: 63.99, unit: '/ box', badge: '-27%',
    img: '/products/gp/gp51-black-55mil.jpg', images: ['/products/gp/gp51-black-55mil.jpg'],
    color: 'Black', thickness: '5.5mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP51',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '5.5 mil' }, { label: 'Color', value: 'Black' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Certification', value: 'Chemo & Fentanyl Approved' }],
    description: 'Medical-grade black nitrile, 5.5mil. Approved for chemo and fentanyl protection.',
    features: ['Chemo and fentanyl protection approved', 'Medical-grade nitrile formulation', 'Textured feel for precision', 'Powder-free, latex-free', 'Excellent for healthcare professionals'],
    useCases: ['Healthcare', 'Chemo handling', 'Laboratory', 'First responders', 'Industrial'],
    inStock: true, relatedSlugs: ['gp50-nitrile-black-5mil', 'gp63-nitrile-black-6mil'],
    boxPrice: 63.99, casePrice: 489.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 429.99, distributorPrice: 369.99, discount: 27,
  },
  {
    id: 11, slug: 'gp63-nitrile-black-6mil', category: 'Nitrile',
    name: 'GP63 Black 6mil Nitrile Gloves', shortName: 'GP63 Black 6mil',
    tagline: 'Heavy-duty 6mil for auto shops, plumbing, and industrial use.',
    price: 69.99, unit: '/ box', badge: '-28%',
    img: '/products/gp/gp63-black-6mil.jpg', images: ['/products/gp/gp63-black-6mil.jpg'],
    color: 'Black', thickness: '6mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP63',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '6 mil' }, { label: 'Color', value: 'Black' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: '6mil thick black nitrile gloves. Strong grip and puncture resistance for industrial settings.',
    features: ['6mil for strong grip and puncture resistance', 'Designed for heavy industrial use', 'Chemical resistant', 'Powder-free, latex-free', 'Extended durability with beaded cuff'],
    useCases: ['Auto shops', 'Plumbing', 'Industrial', 'Manufacturing', 'Chemical handling'],
    inStock: true, relatedSlugs: ['gp66-nitrile-black-8mil-diamond', 'gp51-nitrile-black-55mil'],
    boxPrice: 69.99, casePrice: 529.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 459.99, distributorPrice: 399.99, discount: 28,
  },
  {
    id: 12, slug: 'gp66-nitrile-black-8mil-diamond', category: 'Nitrile',
    name: 'GP66 Black Diamond Grip 8mil Heavy-Duty Nitrile Gloves', shortName: 'GP66 Black 8mil Diamond',
    tagline: 'Maximum protection — 8mil with raised diamond grip texture.',
    price: 119.99, unit: '/ box', badge: 'Heavy Duty',
    img: '/products/gp/gp66-black-8mil.jpg', images: ['/products/gp/gp66-black-8mil.jpg'],
    color: 'Black', thickness: '8mil', glovesPerBox: 50, boxesPerCase: 10, sku: 'GP66',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '8 mil' }, { label: 'Color', value: 'Black' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL, XXL' }, { label: 'Count', value: '50 gloves / box, 10 boxes / case' }, { label: 'Grip', value: 'Raised Diamond Texture' }],
    description: 'Premium 8mil heavy-duty nitrile with raised diamond grip texture. Puncture, grease, and chemical resistant.',
    features: ['8mil maximum thickness', 'Raised diamond grip texture', 'Puncture, grease, and chemical resistant', 'Touch sensitivity maintained', 'Perfect balance of flexibility and protection'],
    useCases: ['Heavy industrial', 'Mechanic shops', 'Chemical handling', 'Oil & gas', 'Hazmat'],
    inStock: true, relatedSlugs: ['gp67-nitrile-green-8mil-diamond', 'gp68-nitrile-orange-8mil-diamond'],
    boxPrice: 119.99, casePrice: 939.99, caseBoxCount: 10, caseGloveCount: 500, wholesalePrice: 819.99, distributorPrice: 699.99, discount: 29,
  },
  {
    id: 13, slug: 'gp67-nitrile-green-8mil-diamond', category: 'Nitrile',
    name: 'GP67 Green Diamond Grip 8mil Heavy-Duty Nitrile Gloves', shortName: 'GP67 Green 8mil Diamond',
    tagline: 'High-visibility green with raised diamond grip texture.',
    price: 119.99, unit: '/ box', badge: 'Heavy Duty',
    img: '/products/gp/gp67-green-8mil.jpg', images: ['/products/gp/gp67-green-8mil.jpg'],
    color: 'Green', thickness: '8mil', glovesPerBox: 50, boxesPerCase: 10, sku: 'GP67',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '8 mil' }, { label: 'Color', value: 'Green' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL, XXL' }, { label: 'Count', value: '50 gloves / box, 10 boxes / case' }, { label: 'Grip', value: 'Raised Diamond Texture' }],
    description: 'High-visibility green 8mil nitrile with raised diamond grip.',
    features: ['8mil maximum thickness', 'High-visibility green color', 'Raised diamond grip texture', 'Chemical and puncture resistant', 'Comfort with heavy-duty protection'],
    useCases: ['Industrial', 'Automotive', 'Chemical handling', 'Manufacturing', 'Cannabis cultivation'],
    inStock: true, relatedSlugs: ['gp66-nitrile-black-8mil-diamond', 'gp68-nitrile-orange-8mil-diamond'],
    boxPrice: 119.99, casePrice: 939.99, caseBoxCount: 10, caseGloveCount: 500, wholesalePrice: 819.99, distributorPrice: 699.99, discount: 29,
  },
  {
    id: 14, slug: 'gp68-nitrile-orange-8mil-diamond', category: 'Nitrile',
    name: 'GP68 Orange Diamond Grip 8mil Heavy-Duty Nitrile Gloves', shortName: 'GP68 Orange 8mil Diamond',
    tagline: 'High-visibility orange with raised diamond grip texture.',
    price: 119.99, unit: '/ box', badge: 'Heavy Duty',
    img: '/products/gp/gp68-orange-8mil.jpg', images: ['/products/gp/gp68-orange-8mil.jpg'],
    color: 'Orange', thickness: '8mil', glovesPerBox: 50, boxesPerCase: 10, sku: 'GP68',
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '8 mil' }, { label: 'Color', value: 'Orange' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL, XXL' }, { label: 'Count', value: '50 gloves / box, 10 boxes / case' }, { label: 'Grip', value: 'Raised Diamond Texture' }],
    description: 'High-visibility orange 8mil nitrile with raised diamond grip.',
    features: ['8mil maximum thickness', 'High-visibility orange color', 'Raised diamond grip texture', 'Chemical and puncture resistant', 'Dexterity and comfort maintained'],
    useCases: ['Construction', 'Oil & gas', 'Automotive', 'Manufacturing', 'Hazmat handling'],
    inStock: true, relatedSlugs: ['gp66-nitrile-black-8mil-diamond', 'gp67-nitrile-green-8mil-diamond'],
    boxPrice: 119.99, casePrice: 939.99, caseBoxCount: 10, caseGloveCount: 500, wholesalePrice: 819.99, distributorPrice: 699.99, discount: 29,
  },
  {
    id: 15, slug: 'super-thin-nitrile-4mil', category: 'Nitrile',
    name: 'Super Thin Nitrile Exam Gloves for Surgeons (1,000ct)', shortName: 'Super Thin 4mil Exam',
    tagline: 'Ultra-thin for maximum tactile sensitivity — surgeon grade.',
    price: 39.99, unit: '/ box', badge: '-36%',
    img: '/products/gp/super-thin-4mil.jpg', images: ['/products/gp/super-thin-4mil.jpg'],
    color: 'Blue', thickness: '4mil', glovesPerBox: 100, boxesPerCase: 10,
    specs: [{ label: 'Material', value: 'Nitrile' }, { label: 'Thickness', value: '4 mil (ultra-thin)' }, { label: 'Color', value: 'Blue' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Certification', value: 'FDA 510K Cleared' }],
    description: 'Ultra-thin 4mil nitrile gloves designed for surgeons and endodontists.',
    features: ['Ultra-thin for maximum tactile sensitivity', 'Surgeon and endodontist grade', 'FDA 510K cleared', 'Strong despite thin profile', 'Powder-free, latex-free'],
    useCases: ['Surgery', 'Dental procedures', 'Medical exams', 'Laboratory', 'Precision work'],
    inStock: true, relatedSlugs: ['dental-mates-4mil-nitrile', 'gp40-nitrile-blue-4mil'],
    boxPrice: 39.99, casePrice: 319.00, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 279.00, distributorPrice: 239.00, discount: 36,
  },
  // ─── LATEX ──────────────────────────────────────────────────────────────
  {
    id: 16, slug: 'diamond-advance-latex-56mil', category: 'Latex',
    name: 'Diamond Advance Latex Exam Gloves 5.6mil Polymer Coated', shortName: 'Latex 5.6mil Exam',
    tagline: 'Premium polymer-coated latex with micro-textured fingertips.',
    price: 52.22, unit: '/ box', badge: '-13%',
    img: '/products/gp/latex-56mil.webp', images: ['/products/gp/latex-56mil.webp'],
    color: 'White', thickness: '5.5-6.0mil', glovesPerBox: 100, boxesPerCase: 10,
    specs: [{ label: 'Material', value: 'Latex (Polymer Coated)' }, { label: 'Thickness', value: '5.5 – 6.0 mil' }, { label: 'Color', value: 'White Natural' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'XS, S, M, L, XL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Surface', value: 'Finger Micro Textured' }, { label: 'Standard', value: 'FDA Compliance, Exam Grade' }],
    description: 'Premium polymer-coated latex exam gloves. 5.5-6.0mil, micro-textured fingertips.',
    features: ['Polymer coated for easy donning', 'Micro-textured fingertips', 'FDA compliant exam grade', 'Non-sterile, ambidextrous', 'Beaded cuff for secure fit'],
    useCases: ['Medical exams', 'Dental offices', 'Laboratory', 'Healthcare', 'Research'],
    inStock: true, relatedSlugs: ['gp51-nitrile-black-55mil', 'gp50-nitrile-black-5mil'],
    boxPrice: 52.22, casePrice: 489.00, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 429.00, distributorPrice: 369.00, discount: 13,
  },
  // ─── VINYL ──────────────────────────────────────────────────────────────
  {
    id: 17, slug: 'gp36-vinyl-blue', category: 'Vinyl',
    name: 'GP36 Blue Vinyl Disposable Gloves', shortName: 'GP36 Blue Vinyl',
    tagline: 'Durable, allergen-free vinyl for versatile protection.',
    price: 54.99, unit: '/ box', badge: '-27%',
    img: '/products/gp/gp36-blue-vinyl.png', images: ['/products/gp/gp36-blue-vinyl.png'],
    color: 'Blue', thickness: '4mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP36',
    specs: [{ label: 'Material', value: 'Vinyl (PVC)' }, { label: 'Color', value: 'Blue' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: 'Durable, tear-resistant vinyl gloves. Allergen-free protection with comfort.',
    features: ['Durable and tear-resistant', '100% latex-free — allergen safe', 'Comfortable and flexible', 'Cost-effective protection', 'Powder-free'],
    useCases: ['Food service', 'Cleaning', 'Beauty & hair', 'General use', 'Retail'],
    inStock: true, relatedSlugs: ['gp37-vinyl-black', 'gp38-vinyl-clear'],
    boxPrice: 54.99, casePrice: 409.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 359.99, distributorPrice: 309.99, discount: 27,
  },
  {
    id: 18, slug: 'gp37-vinyl-black', category: 'Vinyl',
    name: 'GP37 Black Vinyl Examination Gloves', shortName: 'GP37 Black Vinyl',
    tagline: 'Premium black PVC exam gloves — style meets safety.',
    price: 54.99, unit: '/ box', badge: '-27%',
    img: '/products/gp/gp37-black-vinyl.png', images: ['/products/gp/gp37-black-vinyl.png'],
    color: 'Black', thickness: '4mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP37',
    specs: [{ label: 'Material', value: 'Vinyl (PVC)' }, { label: 'Color', value: 'Black' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }, { label: 'Standard', value: 'Examination Grade' }],
    description: 'Premium black PVC examination gloves. 100% latex-free, powder-free.',
    features: ['Premium PVC material', 'Examination grade quality', '100% latex-free', 'Sleek black color', 'Durable and comfortable'],
    useCases: ['Tattoo & beauty', 'Food service', 'Cleaning', 'Automotive', 'General use'],
    inStock: true, relatedSlugs: ['gp36-vinyl-blue', 'gp38-vinyl-clear'],
    boxPrice: 54.99, casePrice: 409.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 359.99, distributorPrice: 309.99, discount: 27,
  },
  {
    id: 19, slug: 'gp38-vinyl-clear', category: 'Vinyl',
    name: 'GP38 Clear Vinyl Disposable Gloves', shortName: 'GP38 Clear Vinyl',
    tagline: 'Clear vinyl for food handling and light-duty tasks.',
    price: 54.99, unit: '/ box', badge: '-27%',
    img: '/products/gp/gp38-clear-vinyl.png', images: ['/products/gp/gp38-clear-vinyl.png'],
    color: 'Clear', thickness: '4mil', glovesPerBox: 100, boxesPerCase: 10, sku: 'GP38',
    specs: [{ label: 'Material', value: 'Vinyl (PVC)' }, { label: 'Color', value: 'Clear' }, { label: 'Powder', value: 'Powder-Free' }, { label: 'Sizes', value: 'S, M, L, XL' }, { label: 'Count', value: '100 gloves / box, 10 boxes / case' }],
    description: 'Clear vinyl gloves with reliable allergen-free protection for food handling.',
    features: ['Clear for visibility in food handling', 'Durable and tear-resistant', '100% latex-free', 'Cost-effective bulk option', 'Powder-free'],
    useCases: ['Food service', 'Catering', 'Deli counters', 'Cleaning', 'General use'],
    inStock: true, relatedSlugs: ['gp36-vinyl-blue', 'gp37-vinyl-black'],
    boxPrice: 54.99, casePrice: 409.99, caseBoxCount: 10, caseGloveCount: 1000, wholesalePrice: 359.99, distributorPrice: 309.99, discount: 27,
  },
];

export default COMMERCIAL_PRODUCTS;

export function getCommercialProductBySlug(slug: string): CommercialProduct | undefined {
  return COMMERCIAL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedCommercialProducts(slugs: string[]): CommercialProduct[] {
  return slugs
    .map((s) => COMMERCIAL_PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is CommercialProduct => p !== undefined);
}
