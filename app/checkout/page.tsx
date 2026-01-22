import { Suspense } from "react";
import { Metadata } from "next";
import { OrderRequestForm } from "@/components/forms/OrderRequestForm";

export const metadata: Metadata = {
  title: "Order Request | IT Pro Direct",
  description: "Submit an order request for surplus telecom equipment. Local pickup in Tampa Bay area or shipping available.",
};

function OrderFormWrapper() {
  return <OrderRequestForm />;
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Order Request
        </h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Fill out the form below to request equipment. We&apos;ll contact you to confirm availability and arrange payment.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Suspense fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          </div>
        }>
          <OrderFormWrapper />
        </Suspense>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300">How it works</h3>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Submit your order request with the items you&apos;re interested in</li>
          <li>We&apos;ll contact you within 24 hours to confirm availability</li>
          <li>Arrange pickup (Palm Harbor, FL) or discuss shipping options</li>
          <li>Complete payment via Wire, ACH, PayPal, or cash (local pickup)</li>
        </ol>
      </div>
    </div>
  );
}
