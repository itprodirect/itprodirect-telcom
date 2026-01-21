import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Badge, ConditionBadge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/ui/ProductImage";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white dark:from-blue-700 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Surplus Telecom Equipment
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Quality tested Ubiquiti & Cisco Meraki gear from a Tampa Bay
              business
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" variant="white">
                  Browse Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Pickup Banner */}
      <section className="bg-green-50 border-y border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="font-medium">
              Local Pickup Available - Palm Harbor, FL (Tampa Bay Area)
            </span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-600 dark:text-slate-400">
              Tested and ready for deployment
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.sku}
                href={`/products/${product.sku}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
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
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-slate-400">{product.brand}</p>
                    <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-slate-400">
                      {product.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(product.pricing[0].pricePerUnit)}
                        </span>
                        {product.pricing.length > 1 && (
                          <span className="ml-1 text-sm text-gray-500 dark:text-slate-500">
                            / unit
                          </span>
                        )}
                      </div>
                      <Badge variant="info">{product.quantity} available</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="bg-gray-50 py-12 lg:py-16 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Why Buy From Us
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                Tested Equipment
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                All equipment is tested for power-on and operation, then factory
                reset before sale.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">Bulk Pricing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                Save 10-20% when you buy in bulk. Great for WISPs and IT
                projects.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                Flexible Options
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                Local pickup or shipping. Wire, ACH, or PayPal payment methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-blue-600 px-6 py-10 text-center sm:px-12 lg:py-16 dark:bg-blue-700">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Questions? Get in Touch
            </h2>
            <p className="mt-2 text-blue-100">
              We respond to all inquiries within 24 hours.
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <Button size="lg" variant="white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
