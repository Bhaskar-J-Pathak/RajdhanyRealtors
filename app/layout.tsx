import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Rajdhany Realtors | Ultra-Premium Luxury Real Estate",
    template: "%s | Rajdhany Realtors",
  },
  description:
    "Rajdhany Realtors brings a new era of ultra-luxury living to Guwahati. Premium residential and commercial properties in Assam.",
  keywords: [
    "real estate",
    "luxury homes",
    "Guwahati",
    "Assam",
    "Rajdhany Realtors",
    "premium property",
    "apartments",
    "villas",
  ],
  authors: [{ name: "Rajdhany Realtors" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rajdhany Realtors",
    title: "Rajdhany Realtors | Ultra-Premium Luxury Real Estate",
    description:
      "Rajdhany Realtors brings a new era of ultra-luxury living to Guwahati.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${garamond.variable} ${GeistSans.variable} font-sans bg-[#FDFDFD] text-slate-900 overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
