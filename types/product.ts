export interface PricingTier {
  tier: "single" | "bulk5" | "bulk10";
  minQty: number;
  maxQty: number | null;
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
  images: string[];
  tags: string[];
  shipping: {
    weight: number;
    shippable: boolean;
    localPickupPreferred: boolean;
    shippingNotes: string;
  };
  specs: Record<string, string>;
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
