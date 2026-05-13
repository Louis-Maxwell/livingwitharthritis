export interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  category: "compression" | "exercise" | "supplements" | "daily-living" | "pain-relief" | "mobility";
  image: string;
  rating: number;
  reviewCount: number;
  amazonUrl: string;
  badge?: string;
  brand?: string;
  sku?: string;
}

// Replace YOUR-TAG with your actual Amazon Associates affiliate tag
const AFFILIATE_TAG = "livingarthritis-21";

const makeAmazonUrl = (asin: string) =>
  `https://www.amazon.co.uk/dp/${asin}?tag=${AFFILIATE_TAG}`;

export const affiliateProducts: AffiliateProduct[] = [
  // Compression & Support
  {
    id: "comp-1",
    title: "Arthritis Compression Gloves",
    description: "Fingerless copper-infused compression gloves for hand and finger joint support. Helps relieve pain and stiffness during daily activities.",
    price: "£12.99",
    category: "compression",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80",
    rating: 4.5,
    reviewCount: 2847,
    amazonUrl: makeAmazonUrl("B07YJQZK3N"),
    badge: "Best Seller",
  },
  {
    id: "comp-2",
    title: "Knee Compression Sleeve (Pair)",
    description: "Breathable knee support sleeves with anti-slip design. Ideal for osteoarthritis knee pain, walking, and light exercise.",
    price: "£15.99",
    category: "compression",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    rating: 4.4,
    reviewCount: 1932,
    amazonUrl: makeAmazonUrl("B08L5WRMGS"),
  },
  {
    id: "comp-3",
    title: "Wrist Support Brace",
    description: "Adjustable wrist brace with thumb spica for carpal tunnel and wrist arthritis. Comfortable for day and night wear.",
    price: "£9.99",
    category: "compression",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    rating: 4.3,
    reviewCount: 1204,
    amazonUrl: makeAmazonUrl("B074WBGKJN"),
  },

  // Exercise Equipment
  {
    id: "ex-1",
    title: "Hand Grip Strengthener Set",
    description: "Adjustable hand grip exerciser with finger stretcher bands. Perfect for rebuilding hand strength and improving grip with arthritis.",
    price: "£8.99",
    category: "exercise",
    image: "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=400&q=80",
    rating: 4.6,
    reviewCount: 3421,
    amazonUrl: makeAmazonUrl("B07FY9QZ2Q"),
    badge: "Top Rated",
  },
  {
    id: "ex-2",
    title: "Resistance Bands Set (5 Pack)",
    description: "Low-impact exercise bands in varying resistance levels. Excellent for gentle joint-friendly strength training and physiotherapy at home.",
    price: "£7.99",
    category: "exercise",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80",
    rating: 4.5,
    reviewCount: 5612,
    amazonUrl: makeAmazonUrl("B08DKYLK1J"),
  },
  {
    id: "ex-3",
    title: "Yoga Mat – Extra Thick 15mm",
    description: "High-density cushioned exercise mat for joint protection during yoga, stretching, and floor exercises. Non-slip surface with carry strap.",
    price: "£19.99",
    category: "exercise",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
    rating: 4.4,
    reviewCount: 2103,
    amazonUrl: makeAmazonUrl("B07D1JFXHV"),
  },
  {
    id: "ex-4",
    title: "Mini Exercise Pedal Bike",
    description: "Compact under-desk pedal exerciser for low-impact leg and arm cycling. Adjustable resistance, perfect for seated exercises at home.",
    price: "£29.99",
    category: "exercise",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
    rating: 4.3,
    reviewCount: 1876,
    amazonUrl: makeAmazonUrl("B01MRSHJYP"),
  },

  // Supplements
  {
    id: "sup-1",
    title: "Glucosamine & Chondroitin Complex",
    description: "High-strength joint support supplement with MSM, vitamin C, and turmeric. 120 tablets for a 2-month supply.",
    price: "£16.99",
    category: "supplements",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80",
    rating: 4.5,
    reviewCount: 4215,
    amazonUrl: makeAmazonUrl("B01LXOL4LM"),
    badge: "Best Seller",
  },
  {
    id: "sup-2",
    title: "Turmeric Curcumin with Black Pepper",
    description: "1500mg high-strength turmeric capsules with 95% curcuminoids and piperine for enhanced absorption. Natural anti-inflammatory support.",
    price: "£14.99",
    category: "supplements",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80",
    rating: 4.6,
    reviewCount: 6732,
    amazonUrl: makeAmazonUrl("B07GZRKYVF"),
    badge: "Top Rated",
  },
  {
    id: "sup-3",
    title: "Omega-3 Fish Oil – 2000mg",
    description: "High-strength EPA and DHA omega-3 capsules. Supports joint flexibility and helps reduce inflammation. 240 softgels, 4-month supply.",
    price: "£18.99",
    category: "supplements",
    image: "https://images.unsplash.com/photo-1577401239170-897c3e5fc2d9?w=400&q=80",
    rating: 4.5,
    reviewCount: 3891,
    amazonUrl: makeAmazonUrl("B01B4VOKWK"),
  },
  {
    id: "sup-4",
    title: "Collagen Peptides Powder",
    description: "Hydrolysed marine collagen for joint, skin, and bone health. Unflavoured, dissolves easily in hot or cold drinks. 300g tub.",
    price: "£21.99",
    category: "supplements",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
    rating: 4.4,
    reviewCount: 2456,
    amazonUrl: makeAmazonUrl("B077GQ7J5T"),
  },

  // Daily Living Aids
  {
    id: "dl-1",
    title: "Ergonomic Jar Opener",
    description: "Multi-purpose jar and bottle opener designed for weak grip. Rubber-lined for easy twisting. Essential kitchen aid for arthritis.",
    price: "£6.99",
    category: "daily-living",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    rating: 4.7,
    reviewCount: 1543,
    amazonUrl: makeAmazonUrl("B085LPL1RR"),
    badge: "Must Have",
  },
  {
    id: "dl-2",
    title: "Easy-Grip Cutlery Set",
    description: "Weighted, non-slip cutlery with thick cushioned handles. Reduces hand strain when eating. Dishwasher safe, 3-piece set.",
    price: "£12.99",
    category: "daily-living",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80",
    rating: 4.5,
    reviewCount: 987,
    amazonUrl: makeAmazonUrl("B00ATZFQSA"),
  },
  {
    id: "dl-3",
    title: "Button Hook & Zipper Pull",
    description: "Dressing aid set for people with limited hand dexterity. Makes getting dressed independently easier and less painful.",
    price: "£5.49",
    category: "daily-living",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    rating: 4.3,
    reviewCount: 634,
    amazonUrl: makeAmazonUrl("B00KL3KJMU"),
  },

  // Pain Relief
  {
    id: "pr-1",
    title: "Electric Heated Knee Wrap",
    description: "Adjustable heated knee brace with 3 heat settings. Provides soothing warmth to reduce joint pain and morning stiffness.",
    price: "£24.99",
    category: "pain-relief",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    rating: 4.4,
    reviewCount: 2134,
    amazonUrl: makeAmazonUrl("B09BKFJXYK"),
    badge: "Popular",
  },
  {
    id: "pr-2",
    title: "TENS Machine – Pain Relief",
    description: "Dual-channel TENS unit with 8 electrode pads and 25 modes. Clinically proven drug-free pain relief for joints and muscles.",
    price: "£27.99",
    category: "pain-relief",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    rating: 4.5,
    reviewCount: 4567,
    amazonUrl: makeAmazonUrl("B07QLXZ3M4"),
    badge: "Best Seller",
  },
  {
    id: "pr-3",
    title: "Hot & Cold Gel Pack (Set of 2)",
    description: "Reusable gel packs for hot or cold therapy. Flexible even when frozen, with soft cloth cover. Ideal for knees, hands, and shoulders.",
    price: "£10.99",
    category: "pain-relief",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80",
    rating: 4.6,
    reviewCount: 3210,
    amazonUrl: makeAmazonUrl("B08L6MW4CS"),
  },

  // Mobility
  {
    id: "mob-1",
    title: "Foldable Walking Stick with LED",
    description: "Lightweight aluminium folding cane with LED torch, adjustable height, and ergonomic handle. Folds small enough for a handbag.",
    price: "£14.99",
    category: "mobility",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
    rating: 4.4,
    reviewCount: 1876,
    amazonUrl: makeAmazonUrl("B07H4LJ21V"),
  },
  {
    id: "mob-2",
    title: "Long-Handle Shoe Horn",
    description: "Extra-long 58cm shoe horn so you never need to bend down. Stainless steel with ergonomic handle, perfect for hip and knee arthritis.",
    price: "£7.99",
    category: "mobility",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    rating: 4.5,
    reviewCount: 1234,
    amazonUrl: makeAmazonUrl("B07XCH3QY8"),
  },
];

export const categories = [
  { id: "all", label: "All Products", icon: "Package" },
  { id: "compression", label: "Compression & Support", icon: "Shield" },
  { id: "exercise", label: "Exercise Equipment", icon: "Dumbbell" },
  { id: "supplements", label: "Supplements", icon: "Pill" },
  { id: "daily-living", label: "Daily Living Aids", icon: "HandHelping" },
  { id: "pain-relief", label: "Pain Relief", icon: "Heart" },
  { id: "mobility", label: "Mobility Aids", icon: "Footprints" },
] as const;
