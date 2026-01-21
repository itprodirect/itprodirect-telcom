import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/pricing";
import { Badge, ConditionBadge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingPrice = product.pricing[0].pricePerUnit;
  const hasBulkPricing = product.pricing.length > 1;

  return (
    <Link href={`/products/${product.sku}`} className="group">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
        <div className="relative aspect-square bg-gray-100 dark:bg-slate-700">
          <ProductImage
            src={product.images[0] || "/images/placeholder.svg"}
            alt={product.name}
            fill
            className="transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <ConditionBadge condition={product.condition} />
          </div>
          {product.shipping.localPickupPreferred && (
            <div className="absolute top-2 right-2">
              <Badge variant="warning">Local Pickup</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-slate-400">{product.brand}</p>
          <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1 dark:text-white dark:group-hover:text-blue-400">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-slate-400">
            {product.shortDescription}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              {hasBulkPricing && (
                <span className="text-xs text-gray-500 dark:text-slate-500">From </span>
              )}
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(startingPrice)}
              </span>
              {hasBulkPricing && (
                <span className="ml-1 text-sm text-gray-500 dark:text-slate-500">/ unit</span>
              )}
            </div>
            <Badge variant="info">{product.quantity} available</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
