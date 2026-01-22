import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Bulk Ubiquiti airMAX Equipment | WISP & IT Pro Deals",
  description:
    "Tested Ubiquiti RocketM5, Rocket Prism, sector antennas at bulk pricing. Perfect for WISP deployments, lab builds, and network expansions. 10-17% off on 10+ units.",
};

export default function WispLandingPage() {
  const products = getProducts().filter((p) => p.brand === "Ubiquiti");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-300">
              Surplus Inventory Sale
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tested Ubiquiti airMAX
              <span className="block text-blue-400">At Bulk Pricing</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              RocketM5 from <span className="font-bold text-white">$49/unit</span> at 10+.
              Rocket Prism 5AC Gen2 from <span className="font-bold text-white">$149/unit</span>.
              All tested, factory reset, ready to deploy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/checkout"
                className="w-full rounded-lg bg-blue-500 px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-blue-400 sm:w-auto"
              >
                Request Bulk Quote
              </Link>
              <Link
                href="/products"
                className="w-full rounded-lg border border-slate-600 px-8 py-4 text-lg font-semibold transition hover:bg-slate-800 sm:w-auto"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-y border-slate-700 bg-slate-800/50">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-blue-400">75+</div>
              <div className="text-sm text-slate-400">Units Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <div className="text-sm text-slate-400">Tested & Reset</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">17%</div>
              <div className="text-sm text-slate-400">Bulk Discount</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">24hr</div>
              <div className="text-sm text-slate-400">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Available Equipment</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.sku}
                className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
              >
                <div className="relative aspect-video bg-slate-700">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.quantity >= 10 && (
                    <div className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-bold">
                      BULK AVAILABLE
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{product.shortDescription}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-sm text-slate-400">10+ units</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {formatCurrency(product.pricing[2]?.pricePerUnit || product.pricing[0].pricePerUnit)}
                        <span className="text-sm font-normal text-slate-400">/ea</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">{product.quantity} in stock</div>
                      <Link
                        href={`/checkout?sku=${product.sku}&qty=10`}
                        className="mt-1 inline-block rounded bg-blue-500 px-4 py-2 text-sm font-semibold transition hover:bg-blue-400"
                      >
                        Order 10+
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="border-t border-slate-700 bg-slate-800/50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Volume Pricing</h2>
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full text-left">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 text-center font-semibold">1-4</th>
                  <th className="px-4 py-3 text-center font-semibold">5-9</th>
                  <th className="px-4 py-3 text-center font-semibold text-blue-400">10+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {products.map((product) => (
                  <tr key={product.sku} className="bg-slate-800">
                    <td className="px-4 py-3 font-medium">{product.model}</td>
                    <td className="px-4 py-3 text-center text-slate-400">
                      {formatCurrency(product.pricing[0].pricePerUnit)}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-400">
                      {formatCurrency(product.pricing[1]?.pricePerUnit || product.pricing[0].pricePerUnit)}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-400">
                      {formatCurrency(product.pricing[2]?.pricePerUnit || product.pricing[0].pricePerUnit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Order?</h2>
          <p className="mt-4 text-slate-300">
            Submit a bulk order request and we&apos;ll confirm availability within 24 hours.
            Payment via Wire, ACH, or PayPal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/checkout"
              className="w-full rounded-lg bg-blue-500 px-8 py-4 text-lg font-semibold shadow-lg transition hover:bg-blue-400 sm:w-auto"
            >
              Request Bulk Quote
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-slate-600 px-8 py-4 text-lg font-semibold transition hover:bg-slate-800 sm:w-auto"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-400">
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
