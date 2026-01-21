import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              IT Pro Direct
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
              Quality surplus telecom equipment from a Tampa Bay area business.
              Ubiquiti and Cisco Meraki networking gear.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Contact</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-slate-400">
              <li>
                <a
                  href="mailto:nick@itprodirect.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  nick@itprodirect.com
                </a>
              </li>
              <li>Palm Harbor, FL (Tampa Bay Area)</li>
              <li className="text-green-600 font-medium dark:text-green-400">
                Local pickup available
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-6">
          <p className="text-center text-xs text-gray-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} IT Pro Direct. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
