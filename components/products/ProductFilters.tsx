"use client";

import { Button } from "@/components/ui/Button";

interface ProductFiltersProps {
  brands: string[];
  categories: string[];
  selectedBrand: string | null;
  selectedCategory: string | null;
  onBrandChange: (brand: string | null) => void;
  onCategoryChange: (category: string | null) => void;
}

const categoryLabels: Record<string, string> = {
  radio: "Radios",
  antenna: "Antennas",
  accessory: "Accessories",
};

export function ProductFilters({
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  onBrandChange,
  onCategoryChange,
}: ProductFiltersProps) {
  const hasActiveFilters = selectedBrand || selectedCategory;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Brand
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onBrandChange(null)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedBrand === null
                  ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:border-slate-500"
              }`}
            >
              All
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onBrandChange(brand)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedBrand === brand
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:border-slate-500"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedCategory === null
                  ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:border-slate-500"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:border-slate-500"
                }`}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onBrandChange(null);
              onCategoryChange(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
