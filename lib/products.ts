import productsData from "@/data/products.json";
import { Product } from "@/types/product";

// Type assertion through unknown to handle JSON import
const products = productsData.products as unknown as Product[];

export function getProducts(): Product[] {
  return products.filter((p) => p.active);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku && p.active);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.active);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(
    (p) => p.brand.toLowerCase() === brand.toLowerCase() && p.active
  );
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category && p.active);
}

export function getBrands(): string[] {
  const brands = new Set(products.map((p) => p.brand));
  return Array.from(brands);
}

export function getCategories(): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}

export function getSiteMetadata() {
  return productsData.meta;
}
