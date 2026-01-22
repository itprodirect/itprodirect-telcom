import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Tampa Bay Telecom Equipment | Free Local Pickup in Palm Harbor",
  description:
    "Skip the shipping costs! Tested Ubiquiti and Cisco Meraki networking gear available for local pickup in Palm Harbor, FL. Cash, Wire, ACH accepted.",
};

export default function TampaLandingPage() {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Palm Harbor, FL
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tampa Bay?
              <span className="block text-green-200">Skip the Shipping.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100">
              Tested Ubiquiti & Meraki networking gear ready for <strong>free local pickup</strong> in Palm Harbor.
              Save $20-50+ on shipping costs. Cash accepted for pickup orders.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/checkout"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg transition hover:bg-green-50 sm:w-auto"
              >
                Reserve for Pickup
              </Link>
              <a
                href="https://maps.google.com/?q=Palm+Harbor+FL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg border-2 border-white/50 px-8 py-4 text-lg font-semibold transition hover:bg-white/10 sm:w-auto"
              >
                View Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Free Pickup</h3>
              <p className="mt-2 text-sm text-gray-600">No shipping costs. Drive over and pick up your gear same day.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Cash Accepted</h3>
              <p className="mt-2 text-sm text-gray-600">Pay cash at pickup. Also accept Wire, ACH, PayPal.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Inspect First</h3>
              <p className="mt-2 text-sm text-gray-600">See the equipment in person before you buy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Available for Pickup</h2>
          <p className="mb-8 text-center text-gray-600">All equipment tested and ready to go</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.sku}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-square bg-gray-100">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute left-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
                    LOCAL PICKUP
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-gray-500">{product.brand}</div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(product.pricing[0].pricePerUnit)}
                      </div>
                      <div className="text-xs text-gray-500">{product.quantity} available</div>
                    </div>
                    <Link
                      href={`/checkout?sku=${product.sku}`}
                      className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                    >
                      Reserve
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Pickup Location</h2>
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-900">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Palm Harbor, FL (Tampa Bay Area)
            </div>
            <p className="mt-2 text-gray-600">
              Exact address provided after order confirmation.
              Flexible scheduling - evenings and weekends available.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              ~30 min from Tampa &bull; ~45 min from St. Pete &bull; ~20 min from Clearwater
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold">Reserve Your Equipment</h2>
          <p className="mt-4 text-green-100">
            Submit a pickup request and we&apos;ll text/call you to schedule a time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/checkout"
              className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg transition hover:bg-green-50 sm:w-auto"
            >
              Reserve for Pickup
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border-2 border-white/50 px-8 py-4 text-lg font-semibold transition hover:bg-white/10 sm:w-auto"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-500">
          <p>IT Pro Direct &bull; Palm Harbor, FL &bull; nick@itprodirect.com</p>
          <p className="mt-2">
            <Link href="/" className="underline hover:text-gray-900">
              Visit Main Site
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
