import type { Metadata } from "next";
import { Cinzel_Decorative, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Carmen's Garden Café",
  description: "Cultivated in nature, perfected in glass. Experience the gold standard of craft coffee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
