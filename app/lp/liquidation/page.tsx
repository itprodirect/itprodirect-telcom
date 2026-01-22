import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Networking Equipment Liquidation | Ubiquiti & Meraki Below Cost",
  description:
    "Surplus networking gear must go! Tested Ubiquiti radios from $49, Meraki PoE injectors from $39. Limited quantities - when it's gone, it's gone.",
};

export default function LiquidationLandingPage() {
  const products = getProducts();
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-orange-600/20" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/30 px-4 py-1 text-sm font-bold text-red-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              LIQUIDATION SALE
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Networking Gear
              <span className="block text-orange-400">Must Go.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Surplus inventory from completed project. All equipment tested and verified working.
              <span className="font-bold text-white"> {totalUnits}+ units</span> remaining.
              When it&apos;s gone, it&apos;s gone.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/checkout"
                className="w-full rounded-lg bg-orange-500 px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-orange-400 sm:w-auto"
              >
                Claim Your Deal
              </Link>
              <Link
                href="/products"
                className="w-full rounded-lg border border-gray-600 px-8 py-4 text-lg font-semibold transition hover:bg-gray-800 sm:w-auto"
              >
                See All Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="border-y border-orange-500/30 bg-orange-500/10 py-4">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-orange-300">
            <span className="font-bold">Limited Stock</span> &bull; No restocking after sellout &bull;
            <span className="font-bold"> First come, first served</span>
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Available Now</h2>
          <p className="mb-8 text-center text-gray-400">Prices shown are single-unit. Bulk discounts available.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.sku}
                className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition hover:border-orange-500/50"
              >
                {/* Stock Badge */}
                <div className="absolute right-2 top-2 z-10 rounded bg-gray-900/90 px-2 py-1 text-xs font-bold">
                  {product.quantity <= 5 ? (
                    <span className="text-red-400">Only {product.quantity} left!</span>
                  ) : product.quantity <= 10 ? (
                    <span className="text-orange-400">{product.quantity} remaining</span>
                  ) : (
                    <span className="text-gray-400">{product.quantity} in stock</span>
                  )}
                </div>

                <div className="relative aspect-square bg-gray-700">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="text-xs font-medium text-gray-500">{product.brand}</div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-2">{product.shortDescription}</p>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-sm text-gray-500">
                        <span className="text-xs">Condition:</span>{" "}
                        <span className="text-gray-400">{product.condition}</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-400">
                        {formatCurrency(product.pricing[0].pricePerUnit)}
                      </div>
                    </div>
                    <Link
                      href={`/checkout?sku=${product.sku}`}
                      className="rounded bg-orange-500 px-3 py-2 text-sm font-semibold transition hover:bg-orange-400"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="border-t border-gray-700 bg-gray-800/50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Why This Deal?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">Tested Working</h3>
              <p className="mt-2 text-sm text-gray-400">Every unit powered on, verified, factory reset</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">Below Retail</h3>
              <p className="mt-2 text-sm text-gray-400">Surplus pricing, not retail markup</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold">Fast Response</h3>
              <p className="mt-2 text-sm text-gray-400">Order confirmation within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">Flexible Payment</h3>
              <p className="mt-2 text-sm text-gray-400">Wire, ACH, PayPal, or cash at pickup</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold">Don&apos;t Miss Out</h2>
          <p className="mt-4 text-gray-300">
            This is surplus stock from a completed project. Once it&apos;s sold, we won&apos;t be restocking.
            Claim yours before someone else does.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/checkout"
              className="w-full rounded-lg bg-orange-500 px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-orange-400 sm:w-auto"
            >
              Order Now
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-gray-600 px-8 py-4 text-lg font-semibold transition hover:bg-gray-800 sm:w-auto"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-400">
          <p>IT Pro Direct &bull; Palm Harbor, FL &bull; nick@itprodirect.com</p>
          <p className="mt-2">
            <Link href="/" className="underline hover:text-white">
              Visit Main Site
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
