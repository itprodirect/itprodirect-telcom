"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ["/images/placeholder.svg"];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
        <ProductImage
          src={displayImages[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          priority
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                index === selectedIndex
                  ? "border-blue-600 dark:border-blue-400"
                  : "border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600"
              }`}
            >
              <ProductImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
