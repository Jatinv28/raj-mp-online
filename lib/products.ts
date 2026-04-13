import type { Product } from "@/components/store/store-provider"

export const products: Product[] = [
  {
    id: "1",
    name: "Cashmere Blend Overcoat",
    price: 1850,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80",
    ],
    category: "Outerwear",
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 127,
    description: "Meticulously crafted from the finest Italian cashmere blend, this overcoat represents the pinnacle of luxury outerwear. The relaxed silhouette drapes elegantly, while the premium lining ensures exceptional comfort.",
    features: [
      "100% Italian Cashmere Blend",
      "Fully lined in silk",
      "Hand-finished details",
      "Two interior pockets",
    ],
    variants: [
      { name: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", options: ["Charcoal", "Camel", "Navy"] },
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Silk Evening Gown",
    price: 3200,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    ],
    category: "Dresses",
    badge: "new",
    rating: 5.0,
    reviewCount: 43,
    description: "A statement piece designed for the most discerning tastes. This silk evening gown features a flowing silhouette that catches the light with every movement.",
    features: [
      "100% Mulberry Silk",
      "Hand-draped bodice",
      "Concealed side zipper",
      "Floor-length hem",
    ],
    variants: [
      { name: "Size", options: ["2", "4", "6", "8", "10", "12"] },
      { name: "Color", options: ["Emerald", "Champagne", "Midnight"] },
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Artisan Leather Tote",
    price: 1450,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
    ],
    category: "Accessories",
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 89,
    description: "Handcrafted by master artisans using traditional techniques passed down through generations. This tote embodies timeless elegance with modern functionality.",
    features: [
      "Full-grain Italian leather",
      "Suede interior lining",
      "Gold-tone hardware",
      "Removable shoulder strap",
    ],
    variants: [
      { name: "Color", options: ["Cognac", "Black", "Burgundy"] },
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Merino Wool Sweater",
    price: 495,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    ],
    category: "Knitwear",
    rating: 4.7,
    reviewCount: 156,
    description: "Spun from the finest Australian merino wool, this sweater offers unparalleled softness and temperature regulation. A wardrobe essential for the modern sophisticate.",
    features: [
      "100% Extra-fine Merino Wool",
      "Ribbed cuffs and hem",
      "Classic crew neck",
      "Machine washable",
    ],
    variants: [
      { name: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Color", options: ["Ivory", "Forest", "Slate"] },
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Diamond Stud Earrings",
    price: 4800,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    ],
    category: "Jewelry",
    badge: "limited",
    rating: 5.0,
    reviewCount: 28,
    description: "Exceptionally brilliant diamonds set in 18k white gold. Each stone is hand-selected for optimal clarity and fire, creating a timeless piece of extraordinary beauty.",
    features: [
      "1.5 carat total weight",
      "VS1 clarity, F color",
      "18k white gold setting",
      "Push-back closure",
    ],
    variants: [],
    inStock: true,
  },
  {
    id: "6",
    name: "Tailored Wool Trousers",
    price: 680,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
    category: "Bottoms",
    rating: 4.6,
    reviewCount: 92,
    description: "Impeccably tailored from premium wool sourced from renowned mills. These trousers offer the perfect balance of structure and comfort for the discerning gentleman.",
    features: [
      "100% Virgin Wool",
      "Half-canvas construction",
      "Adjustable waist tabs",
      "Unfinished hem for custom tailoring",
    ],
    variants: [
      { name: "Size", options: ["30", "32", "34", "36", "38", "40"] },
      { name: "Color", options: ["Charcoal", "Navy", "Stone"] },
    ],
    inStock: true,
  },
  {
    id: "7",
    name: "Signature Perfume",
    price: 320,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    ],
    category: "Fragrance",
    badge: "new",
    rating: 4.9,
    reviewCount: 215,
    description: "A captivating blend of rare ingredients sourced from around the globe. This signature fragrance opens with notes of bergamot and pink pepper, evolving into a rich heart of rose absolute.",
    features: [
      "100ml Eau de Parfum",
      "Long-lasting formula",
      "Hand-blown glass bottle",
      "Gift box included",
    ],
    variants: [
      { name: "Size", options: ["50ml", "100ml"] },
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Calfskin Oxford Shoes",
    price: 895,
    originalPrice: 1100,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    ],
    category: "Footwear",
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 74,
    description: "Masterfully constructed using traditional Goodyear welting, these oxford shoes represent the apex of footwear craftsmanship. The supple calfskin leather develops a beautiful patina over time.",
    features: [
      "Premium calfskin leather",
      "Goodyear welted sole",
      "Full leather lining",
      "Blake-stitched construction",
    ],
    variants: [
      { name: "Size", options: ["7", "8", "9", "10", "11", "12", "13"] },
      { name: "Color", options: ["Cognac", "Black", "Oxblood"] },
    ],
    inStock: true,
  },
]

export const categories = [
  { name: "All", slug: "all" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Dresses", slug: "dresses" },
  { name: "Knitwear", slug: "knitwear" },
  { name: "Accessories", slug: "accessories" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Footwear", slug: "footwear" },
  { name: "Fragrance", slug: "fragrance" },
]

export const collections = [
  {
    id: "spring-collection",
    name: "Spring Collection",
    description: "Embrace the season of renewal",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    productCount: 24,
  },
  {
    id: "evening-wear",
    name: "Evening Wear",
    description: "Elegance after dark",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    productCount: 18,
  },
  {
    id: "essentials",
    name: "Essentials",
    description: "Timeless wardrobe foundations",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    productCount: 32,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge === "bestseller" || p.badge === "new").slice(0, 4)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.badge === "bestseller")
}
