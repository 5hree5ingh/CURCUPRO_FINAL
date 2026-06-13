import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import SplashCursor from "@/components/SplashCursor";
import Script from "next/script";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Curcumin Solutions",
  description: "India's First Synthetic Manufacturer of high purity Curcumin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full w-full overflow-x-hidden", "font-sans", geist.variable)} suppressHydrationWarning>
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
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#b0741a"
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}


