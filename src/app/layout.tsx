import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Instrument_Serif } from "next/font/google";
import "../styles/globals.css";
import { siteImages } from "@/lib/siteImages";
import { FALLBACK_PRODUCTS } from "@/data/products.fallback";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import { CartProvider } from "@/components/providers/CartProvider";

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sanja-krstic.com";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080407",
};

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: "Sanja Krstic | Handmade Luxury Plush Toys",
  description: "Handcrafted with love — Premium handmade plush toys created by Sanja Krstic. Each piece is unique, crafted with passion during live TikTok sessions.",
  keywords: ["handmade plush toys", "crochet toys", "handcrafted toys", "Sanja Krstic", "luxury plush", "TikTok live crafting"],
  authors: [{ name: "Sanja Krstic" }],
  openGraph: {
    title: "Sanja Krstic | Handmade Luxury Plush Toys",
    description: "Handcrafted with love — Premium handmade plush toys created live on TikTok",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteImages.og,
        width: 1200,
        height: 630,
        alt: "Handmade plush teddy bear",
      },
    ],
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sanja Krstić — Luxury Handmade Plush",
  "url": metadataBaseUrl,
  "description":
    "Handcrafted luxury crochet/amigurumi plush toys made by Sanja Krstić in Novi Sad, Serbia. Each piece is uniquely crocheted live on TikTok.",
  "author": {
    "@type": "Person",
    "name": "Sanja Krstić",
    "jobTitle": "Textile Artist & Crochet Designer",
    "address": { "@type": "PostalAddress", "addressLocality": "Novi Sad", "addressCountry": "RS" },
    "sameAs": ["https://www.tiktok.com/@sanja.plush"],
  },
};

const jsonLdProducts = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Sanja Krstić Handmade Plush Collection",
  "url": `${metadataBaseUrl}/#shop`,
  "itemListElement": FALLBACK_PRODUCTS.map((product, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": product.name,
      "description": product.desc,
      "brand": { "@type": "Brand", "name": "Sanja Krstić" },
      ...(product.price > 0
        ? {
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
            },
          }
        : {}),
      "image": `${metadataBaseUrl}${product.img}`,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link
          rel="preload"
          href={siteImages.hero}
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProducts) }}
        />
      </head>
      <body className={inter.className}>
        <SupabaseProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
