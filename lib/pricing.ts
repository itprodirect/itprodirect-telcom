import { Product, PricingTier, CartItem } from "@/types/product";

export function getPriceForQuantity(
  product: Product,
  quantity: number
): number {
  const tier = product.pricing.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
  return tier?.pricePerUnit ?? product.pricing[0].pricePerUnit;
}

export function getTierForQuantity(
  product: Product,
  quantity: number
): PricingTier | undefined {
  return product.pricing.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );
}

export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return Math.round(unitPrice * quantity * 100) / 100;
}

export function calculatePayPalFee(subtotal: number): number {
  return Math.round(subtotal * 0.03 * 100) / 100;
}

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
  const paypalFee =
    paymentMethod === "paypal" ? calculatePayPalFee(subtotal) : 0;
  const total = subtotal + paypalFee + shippingCost;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    paypalFee: Math.round(paypalFee * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getTierLabel(tier: PricingTier): string {
  if (tier.maxQty === null) {
    return `${tier.minQty}+ units`;
  }
  if (tier.minQty === tier.maxQty) {
    return `${tier.minQty} unit`;
  }
  return `${tier.minQty}-${tier.maxQty} units`;
}
