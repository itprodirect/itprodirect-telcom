# Data Model - IT Pro Direct Telecom Equipment

> **Last Updated:** January 22, 2026

---

## TypeScript Interfaces

### Product Types

```typescript
// types/product.ts

export interface PricingTier {
  tier: "single" | "bulk5" | "bulk10";
  minQty: number;
  maxQty: number | null;  // null = no upper limit
  pricePerUnit: number;
  discountPercent: number;
}

export interface Product {
  sku: string;
  brand: "Ubiquiti" | "Cisco Meraki";
  model: string;
  name: string;
  category: "radio" | "antenna" | "accessory";
  shortDescription: string;
  longDescription: string;
  condition: "new" | "like-new" | "tested-working" | "as-is";
  conditionNotes: string;
  quantity: number;
  pricing: PricingTier[];
  images: string[];  // Array of image paths
  tags: string[];
  shipping: {
    weight: number;  // pounds
    shippable: boolean;
    localPickupPreferred: boolean;
    shippingNotes: string;
  };
  specs: Record<string, string>;  // Key-value pairs for specs
  featured: boolean;
  active: boolean;
}
```

### Order Request Types (Simplified)

```typescript
// types/order.ts

export interface CustomerInfo {
  name: string;
  email?: string;  // Optional but recommended
  phone: string;   // Required for order requests
}

export interface OrderItem {
  sku: string;
  name: string;
  qty: number;  // Simplified - just quantity, no pricing
}

export interface OrderRequest {
  customer: CustomerInfo;
  items: OrderItem[];
  fulfillment: {
    method: "pickup" | "ship";  // Default: pickup
  };
  notes?: string;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
}
```

### Contact Types

```typescript
// types/contact.ts

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  website?: string;  // Honeypot field
}
```

---

## Products Data (JSON)

**File:** `data/products.json`

```json
{
  "products": [
    {
      "sku": "RocketM5-US",
      "brand": "Ubiquiti",
      "model": "RocketM5 US",
      "name": "Ubiquiti RocketM5 5GHz Radio",
      "category": "radio",
      "shortDescription": "5GHz airMAX radio — tested, factory reset, ready to deploy.",
      "longDescription": "The RocketM5 is a proven 5GHz airMAX radio used in point-to-point and point-to-multipoint deployments. Units have been tested for power-on and operation, then factory reset. Ideal for WISP environments, lab builds, and legacy airMAX networks. These units are from surplus stock that was never deployed on the original project.",
      "condition": "tested-working",
      "conditionNotes": "Tested working, factory reset. Many appear unused/like-new.",
      "quantity": 20,
      "pricing": [
        {
          "tier": "single",
          "minQty": 1,
          "maxQty": 4,
          "pricePerUnit": 59,
          "discountPercent": 0
        },
        {
          "tier": "bulk5",
          "minQty": 5,
          "maxQty": 9,
          "pricePerUnit": 53,
          "discountPercent": 10
        },
        {
          "tier": "bulk10",
          "minQty": 10,
          "maxQty": null,
          "pricePerUnit": 49,
          "discountPercent": 17
        }
      ],
      "images": [
        "/images/products/rocketm5/main.jpg",
        "/images/products/rocketm5/side.jpg",
        "/images/products/rocketm5/ports.jpg"
      ],
      "tags": ["airMAX", "RocketM5", "5GHz", "WISP", "PtMP", "PtP", "Ubiquiti", "radio"],
      "shipping": {
        "weight": 0.5,
        "shippable": true,
        "localPickupPreferred": false,
        "shippingNotes": "Ships USPS Priority Mail. Multiple units ship together for savings."
      },
      "specs": {
        "Frequency": "5 GHz",
        "Throughput": "150+ Mbps",
        "Interface": "1x 10/100 Ethernet",
        "Power": "24V Passive PoE",
        "Technology": "airMAX M (MIMO)"
      },
      "featured": true,
      "active": true
    }
  ],
  "meta": {
    "lastUpdated": "2026-01-22",
    "currency": "USD",
    "location": "Palm Harbor, FL",
    "contactEmail": "nick@itprodirect.com"
  }
}
```

*Note: Full products.json includes all 5 products. See actual file for complete data.*

---

## Pricing Display Helpers

**File:** `lib/pricing.ts`

These helpers are for **displaying** pricing information. Actual pricing/payment is handled offline after customer contact.

```typescript
import { PricingTier } from "@/types/product";

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Get tier label for display
 */
export function getTierLabel(tier: PricingTier): string {
  if (tier.maxQty === null) {
    return `${tier.minQty}+ units`;
  }
  if (tier.minQty === tier.maxQty) {
    return `${tier.minQty} unit`;
  }
  return `${tier.minQty}-${tier.maxQty} units`;
}

/**
 * Get the price per unit for a given quantity (for display)
 */
export function getPriceForQuantity(pricing: PricingTier[], quantity: number): number {
  const tier = pricing.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
  return tier?.pricePerUnit ?? pricing[0].pricePerUnit;
}
```

---

## Validation Schemas (Zod)

**File:** `lib/validation.ts`

```typescript
import { z } from "zod";

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  website: z.string().optional(), // Honeypot
});

// Order request validation (simplified)
export const orderRequestSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number is required"),
  }),
  items: z.array(
    z.object({
      sku: z.string(),
      name: z.string(),
      qty: z.number().int().positive(),
    })
  ).min(1, "At least one item is required"),
  fulfillment: z.object({
    method: z.enum(["pickup", "ship"]).default("pickup"),
  }),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type OrderRequestData = z.infer<typeof orderRequestSchema>;
```

---

## Product Loading Functions

**File:** `lib/products.ts`

```typescript
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

/**
 * Get all active products
 */
export function getProducts(): Product[] {
  return productsData.products.filter((p) => p.active) as Product[];
}

/**
 * Get a single product by SKU
 */
export function getProductBySku(sku: string): Product | undefined {
  return productsData.products.find((p) => p.sku === sku && p.active) as Product | undefined;
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return productsData.products.filter((p) => p.featured && p.active) as Product[];
}

/**
 * Get products by brand
 */
export function getProductsByBrand(brand: string): Product[] {
  return productsData.products.filter(
    (p) => p.brand.toLowerCase() === brand.toLowerCase() && p.active
  ) as Product[];
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter(
    (p) => p.category === category && p.active
  ) as Product[];
}

/**
 * Get all unique brands
 */
export function getBrands(): string[] {
  const brands = new Set(productsData.products.map((p) => p.brand));
  return Array.from(brands);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const categories = new Set(productsData.products.map((p) => p.category));
  return Array.from(categories);
}

/**
 * Get site metadata
 */
export function getSiteMetadata() {
  return productsData.meta;
}
```

---

## Image Placeholder System

Products reference images in `public/images/products/[sku]/`. If images don't exist yet, the frontend shows a placeholder.

**Placeholder Component:**

```typescript
// components/ui/ProductImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}

export function ProductImage({ src, alt, fill, className }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-gray-200 dark:bg-slate-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 dark:text-slate-500 text-sm">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
```

---

## Payment Information (Reference Only)

Payment is handled **offline** after the owner contacts the customer. Accepted methods:

| Method | Fee | Notes |
|--------|-----|-------|
| Wire Transfer | Free | Preferred for large orders |
| ACH/Bank Transfer | Free | 2-3 business days |
| PayPal | +3% | Buyer pays fee if choosing PayPal |
| Cash | Free | Local pickup only |

Payment details are communicated directly by the owner during follow-up, not displayed on the website.
