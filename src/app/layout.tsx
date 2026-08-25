import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Scaleminte - Creative Support Agency",
  description: "We Build Brands That Drive Growth",
};

import ClientLayout from "@/components/ClientLayout";
import { AosProvider } from "@/components/AosProvider";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <SiteConfigProvider>
          <AosProvider>
            <ClientLayout>{children}</ClientLayout>
          </AosProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
