import type { Metadata } from "next";
import { Cinzel_Decorative, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel-custom",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat-custom",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const getMetadataBase = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (!envUrl) {
    const localProtocol = process.env.NODE_ENV === "production" ? "https" : "http";

    return new URL(`${localProtocol}://localhost:3000`);
  }

  const normalizedUrl = envUrl.replace(/^http:\/\//i, "https://");

  return new URL(
    normalizedUrl.startsWith("http")
      ? normalizedUrl
      : `https://${normalizedUrl}`,
  );
};

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  title: "Carmen's Garden Café",
  description: "Cultivated in nature, perfected in glass. Experience the gold standard of craft coffee.",
  metadataBase,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Carmen's Garden Café",
    title: "Carmen's Garden Café",
    description:
      "Cultivated in nature, perfected in glass. Experience the gold standard of craft coffee.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Carmen's Garden Café",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Carmen's Garden Café",
    description:
      "Cultivated in nature, perfected in glass. Experience the gold standard of craft coffee.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased pb-28 md:pb-0" suppressHydrationWarning>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
