import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { clip } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import OwnerPopup from "@/components/OwnerPopup";
import SmoothScroll from "@/components/SmoothScroll";
import { localBusinessJsonLd } from "@/lib/schema";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Aquarium Service in Palm Beach County, FL | ${site.name}`,
    template: `%s | Jason's Aquarium`,
  },
  description: clip(
    "Owner-operated aquarium cleaning, maintenance, installation and assessments for reef, freshwater and pond systems across Palm Beach County and north Broward, FL."
  ),
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04213a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileDock />
        <OwnerPopup />
      </body>
    </html>
  );
}
