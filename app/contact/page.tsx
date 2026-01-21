import { Metadata } from "next";
import { getSiteMetadata } from "@/lib/products";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | IT Pro Direct",
  description:
    "Get in touch with IT Pro Direct for questions about our surplus telecom equipment. Based in Palm Harbor, FL.",
};

export default function ContactPage() {
  const siteMetadata = getSiteMetadata();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">
          Have questions? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Send Us a Message
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Email */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-4">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Email</h3>
                <a
                  href={`mailto:${siteMetadata.contactEmail}`}
                  className="text-lg font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {siteMetadata.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-4">
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
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Location</h3>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {siteMetadata.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-500">Tampa Bay Area</p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-4">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Response Time
                </h3>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Within 24 hours
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-500">Usually much faster</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-slate-800/50">
            <h3 className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Accepted Payment Methods
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Wire Transfer (no fee)
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                ACH Transfer (no fee)
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                PayPal (+3% fee)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
