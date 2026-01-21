# Data Model - IT Pro Direct Telecom Equipment

> **Last Updated:** January 20, 2026

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

export interface CartItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  paypalFee: number;
  shippingCost: number;
  total: number;
}
```

### Order Types

```typescript
// types/order.ts

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderId?: string;
  customer: CustomerInfo;
  items: OrderItem[];
  shipping: {
    method: "pickup" | "ship";
    cost: number;
  };
  payment: {
    method: "wire" | "ach" | "paypal";
    subtotal: number;
    paypalFee: number;
    total: number;
  };
  notes?: string;
  createdAt?: string;
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
    },
    {
      "sku": "RP-5AC-Gen2-US",
      "brand": "Ubiquiti",
      "model": "Rocket Prism 5AC Gen2",
      "name": "Ubiquiti Rocket Prism 5AC Gen2",
      "category": "radio",
      "shortDescription": "Improves performance in noisy RF environments. Tested + reset.",
      "longDescription": "The RP-5AC-Gen2-US is designed to reduce interference and improve throughput/latency in high-noise deployments. Features active RF filtering technology. All units are tested and factory reset, ready for integration into supported airMAX builds. Great for WISPs operating in congested spectrum.",
      "condition": "tested-working",
      "conditionNotes": "Tested working, factory reset. Older stock but fully functional.",
      "quantity": 20,
      "pricing": [
        {
          "tier": "single",
          "minQty": 1,
          "maxQty": 4,
          "pricePerUnit": 179,
          "discountPercent": 0
        },
        {
          "tier": "bulk5",
          "minQty": 5,
          "maxQty": 9,
          "pricePerUnit": 161,
          "discountPercent": 10
        },
        {
          "tier": "bulk10",
          "minQty": 10,
          "maxQty": null,
          "pricePerUnit": 149,
          "discountPercent": 17
        }
      ],
      "images": [
        "/images/products/rocket-prism/main.jpg",
        "/images/products/rocket-prism/detail.jpg"
      ],
      "tags": ["Rocket Prism", "5AC Gen2", "RF filtering", "Ubiquiti", "airMAX", "radio"],
      "shipping": {
        "weight": 1.0,
        "shippable": true,
        "localPickupPreferred": false,
        "shippingNotes": "Ships USPS Priority Mail or UPS Ground."
      },
      "specs": {
        "Frequency": "5 GHz",
        "Throughput": "500+ Mbps",
        "Interface": "1x Gigabit Ethernet",
        "Power": "24V Passive PoE",
        "Technology": "airMAX AC with GPS Sync",
        "Special": "Active RF Filtering (Prism)"
      },
      "featured": true,
      "active": true
    },
    {
      "sku": "AM-5G20-90",
      "brand": "Ubiquiti",
      "model": "airMAX Sector AM-5G20-90",
      "name": "Ubiquiti airMAX Sector 5GHz 20dBi 90°",
      "category": "antenna",
      "shortDescription": "5GHz 20dBi 90° sector antenna. Tested and verified.",
      "longDescription": "The AM-5G20-90 is a 5GHz 90-degree sector antenna used for point-to-multipoint coverage in WISP and campus-style networks. Units have been verified working. Great for deployments, spares, or lab inventory. Note: These are large antennas and shipping can be expensive - local pickup strongly recommended.",
      "condition": "tested-working",
      "conditionNotes": "Tested working. Some boxes show wear but equipment is verified functional.",
      "quantity": 18,
      "pricing": [
        {
          "tier": "single",
          "minQty": 1,
          "maxQty": 4,
          "pricePerUnit": 119,
          "discountPercent": 0
        },
        {
          "tier": "bulk5",
          "minQty": 5,
          "maxQty": 9,
          "pricePerUnit": 107,
          "discountPercent": 10
        },
        {
          "tier": "bulk10",
          "minQty": 10,
          "maxQty": null,
          "pricePerUnit": 99,
          "discountPercent": 17
        }
      ],
      "images": [
        "/images/products/am-5g20-90/main.jpg",
        "/images/products/am-5g20-90/mounting.jpg"
      ],
      "tags": ["airMAX", "Sector Antenna", "90 degree", "5GHz", "WISP", "Ubiquiti", "antenna"],
      "shipping": {
        "weight": 8.0,
        "shippable": true,
        "localPickupPreferred": true,
        "shippingNotes": "⚠️ LARGE/HEAVY ITEM - Local pickup strongly recommended. If shipping, buyer pays actual freight cost. Contact for shipping quote."
      },
      "specs": {
        "Frequency": "5.45-5.85 GHz",
        "Gain": "20 dBi",
        "Beamwidth": "90° H / 6° V",
        "Polarization": "Dual Linear",
        "Connector": "2x RP-SMA",
        "Dimensions": "27.6 x 5.5 x 3.2 in"
      },
      "featured": false,
      "active": true
    },
    {
      "sku": "PBE-5AC-Gen2-US",
      "brand": "Ubiquiti",
      "model": "PowerBeam AC Gen2",
      "name": "Ubiquiti PowerBeam AC Gen2",
      "category": "radio",
      "shortDescription": "Unopened/new. Great for high-performance point-to-point links.",
      "longDescription": "Brand new and unopened PowerBeam AC Gen2 units. Ideal for point-to-point wireless bridging and backhaul setups where stable throughput matters. These are factory sealed units that were purchased for a project that never happened.",
      "condition": "new",
      "conditionNotes": "NEW - Unopened factory sealed boxes.",
      "quantity": 2,
      "pricing": [
        {
          "tier": "single",
          "minQty": 1,
          "maxQty": 4,
          "pricePerUnit": 189,
          "discountPercent": 0
        },
        {
          "tier": "bulk5",
          "minQty": 5,
          "maxQty": 9,
          "pricePerUnit": 189,
          "discountPercent": 0
        },
        {
          "tier": "bulk10",
          "minQty": 10,
          "maxQty": null,
          "pricePerUnit": 189,
          "discountPercent": 0
        }
      ],
      "images": [
        "/images/products/powerbeam/main.jpg",
        "/images/products/powerbeam/box.jpg"
      ],
      "tags": ["PowerBeam", "AC Gen2", "5GHz", "PtP", "backhaul", "Ubiquiti", "radio", "new"],
      "shipping": {
        "weight": 3.0,
        "shippable": true,
        "localPickupPreferred": false,
        "shippingNotes": "Ships UPS Ground. Factory sealed box."
      },
      "specs": {
        "Frequency": "5 GHz",
        "Throughput": "450+ Mbps",
        "Range": "25+ km",
        "Gain": "25 dBi integrated dish",
        "Interface": "1x Gigabit Ethernet",
        "Power": "24V Passive PoE (included)"
      },
      "featured": true,
      "active": true
    },
    {
      "sku": "MA-INJ-4",
      "brand": "Cisco Meraki",
      "model": "MA-INJ-4",
      "name": "Cisco Meraki 802.3at PoE Injector",
      "category": "accessory",
      "shortDescription": "Unused/like-new. Ready to power Meraki gear.",
      "longDescription": "Meraki MA-INJ-4 injectors for powering compatible Meraki APs and devices. Units are unused/never deployed (open box condition). Great for spares, installs, and small inventory stocking. These provide 802.3at (PoE+) power for high-power devices.",
      "condition": "like-new",
      "conditionNotes": "Unused, never deployed. May be open box.",
      "quantity": 15,
      "pricing": [
        {
          "tier": "single",
          "minQty": 1,
          "maxQty": 4,
          "pricePerUnit": 49,
          "discountPercent": 0
        },
        {
          "tier": "bulk5",
          "minQty": 5,
          "maxQty": 9,
          "pricePerUnit": 44,
          "discountPercent": 10
        },
        {
          "tier": "bulk10",
          "minQty": 10,
          "maxQty": null,
          "pricePerUnit": 39,
          "discountPercent": 20
        }
      ],
      "images": [
        "/images/products/meraki-poe/main.jpg"
      ],
      "tags": ["Meraki", "PoE injector", "802.3at", "MA-INJ-4", "Cisco", "accessory", "power"],
      "shipping": {
        "weight": 0.5,
        "shippable": true,
        "localPickupPreferred": false,
        "shippingNotes": "Ships USPS Priority Mail. Light and easy to ship."
      },
      "specs": {
        "Standard": "802.3at (PoE+)",
        "Power Output": "30W",
        "Input": "100-240V AC",
        "Output": "48V DC",
        "Compatibility": "Meraki MR, MS, MV series"
      },
      "featured": false,
      "active": true
    }
  ],
  "meta": {
    "lastUpdated": "2026-01-20",
    "currency": "USD",
    "paypalFeePercent": 3,
    "location": "Palm Harbor, FL",
    "contactEmail": "nick@itprodirect.com"
  }
}
```

---

## Pricing Helper Functions

**File:** `lib/pricing.ts`

```typescript
import { Product, PricingTier, CartItem } from "@/types/product";

/**
 * Get the price per unit for a given quantity
 */
export function getPriceForQuantity(product: Product, quantity: number): number {
  const tier = product.pricing.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
  return tier?.pricePerUnit ?? product.pricing[0].pricePerUnit;
}

/**
 * Get the applicable pricing tier for a quantity
 */
export function getTierForQuantity(product: Product, quantity: number): PricingTier | undefined {
  return product.pricing.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
}

/**
 * Calculate line total for a cart item
 */
export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return Math.round(unitPrice * quantity * 100) / 100;
}

/**
 * Calculate PayPal fee (3%)
 */
export function calculatePayPalFee(subtotal: number): number {
  return Math.round(subtotal * 0.03 * 100) / 100;
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(
  items: CartItem[],
  paymentMethod: "wire" | "ach" | "paypal",
  shippingCost: number = 0
): {
  subtotal: number;
  paypalFee: number;
  shippingCost: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const paypalFee = paymentMethod === "paypal" ? calculatePayPalFee(subtotal) : 0;
  const total = subtotal + paypalFee + shippingCost;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    paypalFee: Math.round(paypalFee * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

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
```

---

## Validation Schemas (Zod)

**File:** `lib/validation.ts`

```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  website: z.string().optional(), // Honeypot
});

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required for orders"),
  address: z
    .object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(2, "State is required"),
      zip: z.string().min(5, "ZIP code is required"),
    })
    .optional(),
});

export const orderItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  lineTotal: z.number().positive(),
});

export const orderSchema = z.object({
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  shipping: z.object({
    method: z.enum(["pickup", "ship"]),
    cost: z.number().min(0),
  }),
  payment: z.object({
    method: z.enum(["wire", "ach", "paypal"]),
    subtotal: z.number().positive(),
    paypalFee: z.number().min(0),
    total: z.number().positive(),
  }),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type OrderData = z.infer<typeof orderSchema>;
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

**Placeholder Component Example:**

```typescript
// components/ui/ProductImage.tsx
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
```
