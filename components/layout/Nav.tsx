"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
            pathname === link.href
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-slate-300"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
