"use client";

import { useState, useMemo } from "react";
import { getProducts, getBrands, getCategories } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";

export default function ProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allProducts = getProducts();
  const brands = getBrands();
  const categories = getCategories();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedBrand && product.brand !== selectedBrand) {
        return false;
      }
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [allProducts, selectedBrand, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Browse our inventory of tested and verified networking equipment.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <ProductFilters
          brands={brands}
          categories={categories}
          selectedBrand={selectedBrand}
          selectedCategory={selectedCategory}
          onBrandChange={setSelectedBrand}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-slate-400">
          Showing {filteredProducts.length} of {allProducts.length} products
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
