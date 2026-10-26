import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marahuyo.ph"),
  title: {
    default: "Marahuyo — Hair & Beauty Atelier · Katipunan, Quezon City",
    template: "%s — Marahuyo",
  },
  description:
    "A hair atelier on Katipunan Avenue, Loyola Heights, Quezon City. Honest consultations, unhurried chairs, and color that respects the hair it lives on. Cuts, color, treatments, bridal — by appointment.",
  keywords: [
    "salon Quezon City",
    "hair salon Katipunan",
    "balayage Quezon City",
    "hair color Loyola Heights",
    "keratin treatment Quezon City",
    "bridal hair Quezon City",
    "Marahuyo",
  ],
  authors: [{ name: "Marahuyo Hair & Beauty Atelier" }],
  creator: "Marahuyo Hair & Beauty Atelier",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Marahuyo — Hair & Beauty Atelier",
    description:
      "A hair atelier on Katipunan Avenue, Quezon City. Honest consultations, unhurried chairs, color that respects the hair it lives on.",
    url: "https://www.marahuyo.ph",
    siteName: "Marahuyo",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1152,
        height: 864,
        alt: "Inside Marahuyo — a brass arched mirror and a caramel leather styling chair in warm afternoon light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marahuyo — Hair & Beauty Atelier",
    description:
      "A hair atelier on Katipunan Avenue, Quezon City. Honest consultations, unhurried chairs, color that respects the hair it lives on.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F3EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans bg-porcelain text-ink antialiased`}
      >
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
