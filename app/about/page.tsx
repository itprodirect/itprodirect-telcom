import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | IT Pro Direct",
  description:
    "Learn about IT Pro Direct - a Tampa Bay area business selling quality tested surplus telecom equipment.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About IT Pro Direct</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">
          Quality surplus telecom equipment from Tampa Bay
        </p>
      </div>

      {/* Story */}
      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Story</h2>
        <p className="text-gray-600 mt-4 dark:text-slate-400">
          IT Pro Direct is a family business based in Palm Harbor, Florida. We
          specialize in surplus Ubiquiti airMAX and Cisco Meraki networking
          equipment that comes from large-scale projects that were either scaled
          back or never fully deployed.
        </p>
        <p className="text-gray-600 mt-4 dark:text-slate-400">
          All of our equipment is thoroughly tested for power-on and proper
          operation, then factory reset before sale. We believe in honest
          descriptions and fair pricing, especially for fellow IT professionals,
          WISPs, and small businesses who can put this quality gear to good use.
        </p>
      </div>

      {/* Why Buy From Us */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Why Buy From Us
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Tested Equipment
            </h3>
            <p className="mt-2 text-gray-600 dark:text-slate-400">
              Every piece of equipment is tested for power-on and operation
              before listing. No guesswork or surprises.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Bulk Discounts
            </h3>
            <p className="mt-2 text-gray-600 dark:text-slate-400">
              Save 10-20% when buying in quantity. Perfect for WISP deployments,
              IT projects, or building up spare inventory.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Local Pickup
            </h3>
            <p className="mt-2 text-gray-600 dark:text-slate-400">
              Located in Palm Harbor, FL (Tampa Bay area). Local pickup
              available for heavy items like sector antennas.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Flexible Payment
            </h3>
            <p className="mt-2 text-gray-600 dark:text-slate-400">
              We accept wire transfer, ACH, and PayPal. No payment processing
              fees for wire or ACH transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-12 rounded-lg bg-gray-50 p-6 dark:bg-slate-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Location</h2>
        <p className="mt-3 text-gray-600 dark:text-slate-400">
          We&apos;re based in <strong className="dark:text-white">Palm Harbor, Florida</strong>, in the Tampa Bay
          area. For local buyers, we offer convenient pickup options that can
          save you significant shipping costs, especially for heavier items like
          sector antennas.
        </p>
        <p className="mt-3 text-gray-600 dark:text-slate-400">
          For items that ship well, we use USPS Priority Mail or UPS Ground
          depending on size and weight. Contact us for shipping quotes on larger
          orders.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Ready to Get Started?
        </h2>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Browse our inventory or get in touch with any questions.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
