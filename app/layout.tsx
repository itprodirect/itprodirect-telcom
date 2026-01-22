import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "IT Pro Direct | Surplus Telecom Equipment",
    template: "%s | IT Pro Direct",
  },
  description:
    "Quality tested Ubiquiti airMAX and Cisco Meraki networking equipment. Surplus telecom gear in Tampa Bay area. Local pickup in Palm Harbor, FL. Wire/ACH/PayPal accepted.",
  keywords: [
    "Ubiquiti",
    "Meraki",
    "WISP equipment",
    "airMAX",
    "RocketM5",
    "Rocket Prism",
    "PowerBeam",
    "sector antenna",
    "networking",
    "Tampa Bay",
    "Palm Harbor FL",
    "telecom equipment",
    "surplus networking",
  ],
  authors: [{ name: "IT Pro Direct" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "IT Pro Direct",
    title: "IT Pro Direct | Surplus Telecom Equipment",
    description:
      "Quality tested Ubiquiti airMAX and Cisco Meraki networking equipment. Local pickup in Palm Harbor, FL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Pro Direct | Surplus Telecom Equipment",
    description:
      "Quality tested Ubiquiti airMAX and Cisco Meraki networking equipment. Local pickup in Palm Harbor, FL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 transition-colors">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
