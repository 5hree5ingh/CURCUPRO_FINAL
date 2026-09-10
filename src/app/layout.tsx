import type { Metadata } from "next";
import "./globals.css";
import "./scrollbar.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import { Inter, Playfair_Display, DM_Serif_Display, Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['300', '400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'], style: ['normal', 'italic'] });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], variable: '--font-display', weight: '400' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['400', '500', '600', '700'], style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: "Curcumin — Premium Synthetic Curcumin Manufacturer",
  description:
    "99.5%+ purity synthetic curcumin for pharma, nutraceutical, and food industries. ISO-certified, year-round supply, zero batch variation. Request a free sample.",
  keywords: [
    "synthetic curcumin",
    "curcumin manufacturer India",
    "curcumin supplier",
    "99.5% purity curcumin",
    "pharma grade curcumin",
    "curcumin powder",
    "E100 colorant",
    "curcuminoids",
  ],
  openGraph: {
    title: "Curcumin — Premium Synthetic Curcumin Manufacturer",
    description:
      "99.5%+ purity synthetic curcumin for pharma, nutraceutical, and food industries. Request a free sample today.",
    url: "https://www.curcumex.com",
    siteName: "Curcumin",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curcumin — Premium Synthetic Curcumin Manufacturer",
    description:
      "99.5%+ purity. Zero batch variation. Year-round supply. Request a free sample.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.curcumex.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full w-full overflow-x-hidden", "font-sans", inter.variable, playfair.variable, dmSerif.variable, cormorant.variable)} suppressHydrationWarning>
      <body className="h-full w-full overflow-x-hidden">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LTT1KWBMMX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LTT1KWBMMX');
          `}
        </Script>

        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}


