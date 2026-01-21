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
  title: "IT Pro Direct | Surplus Telecom Equipment",
  description:
    "Quality tested Ubiquiti and Cisco Meraki networking gear. Tampa Bay area. Wire/ACH/PayPal accepted. Local pickup available.",
  keywords: [
    "Ubiquiti",
    "Meraki",
    "WISP",
    "airMAX",
    "networking",
    "Tampa Bay",
    "telecom equipment",
  ],
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
