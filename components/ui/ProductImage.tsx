"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">No image</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
