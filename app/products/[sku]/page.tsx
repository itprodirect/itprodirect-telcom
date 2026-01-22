import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getProductBySku, getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { ProductGallery } from "@/components/products/ProductGallery";
import { PricingTable } from "@/components/products/PricingTable";
import { ConditionBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductPageProps {
  params: Promise<{ sku: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    sku: product.sku,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { sku } = await params;
  const product = getProductBySku(sku);

  if (!product) {
    return {
      title: "Product Not Found | IT Pro Direct",
    };
  }

  return {
    title: `${product.name} | IT Pro Direct`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const product = getProductBySku(sku);

  if (!product) {
    notFound();
  }

  const specs = Object.entries(product.specs);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-gray-700 dark:hover:text-slate-300">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-gray-700 dark:hover:text-slate-300">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium dark:text-white">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Images */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">{product.brand}</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConditionBadge condition={product.condition} />
              <Badge variant="info">{product.quantity} available</Badge>
              {product.shipping.localPickupPreferred && (
                <Badge variant="warning">Local Pickup Preferred</Badge>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-200 py-4 dark:border-slate-700">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.pricing[0].pricePerUnit)}
              </span>
              <span className="text-gray-500 dark:text-slate-400">/ unit</span>
            </div>
            {product.pricing.length > 1 && (
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                Bulk discounts available — see pricing table below
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
            <p className="mt-2 text-gray-600 whitespace-pre-line dark:text-slate-400">
              {product.longDescription}
            </p>
          </div>

          {/* Condition Notes */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Condition Notes
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{product.conditionNotes}</p>
          </div>

          {/* Order CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={`/checkout?sku=${product.sku}`} className="flex-1">
              <Button size="lg" className="w-full">
                Request to Order
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Pricing Table */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Volume Pricing
          </h2>
          <PricingTable pricing={product.pricing} />
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-500">
            Prices shown per unit. Contact us for orders of 10+ units to confirm
            availability.
          </p>
        </div>

        {/* Specs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Specifications
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {specs.map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-gray-50 dark:bg-slate-800"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-slate-400">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Shipping Information
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Weight</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">{product.shipping.weight} lbs</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Shippable</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              {product.shipping.shippable ? "Yes" : "Local pickup only"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Local Pickup</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              {product.shipping.localPickupPreferred
                ? "Preferred (Palm Harbor, FL)"
                : "Available (Palm Harbor, FL)"}
            </p>
          </div>
        </div>
        {product.shipping.shippingNotes && (
          <p className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4 dark:text-slate-400 dark:border-slate-700">
            {product.shipping.shippingNotes}
          </p>
        )}
      </div>
    </div>
  );
}
