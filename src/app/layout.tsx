import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body className="h-full w-full overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
