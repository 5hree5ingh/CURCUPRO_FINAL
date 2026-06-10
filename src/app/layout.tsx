import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full">{children}</body>
    </html>
  );
}
