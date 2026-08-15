import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Borrel 35 — Jan Modaal van de borrel",
    template: "%s · Borrel 35",
  },
  description:
    "Ontdek het gemiddelde Borrel 35-profiel, vergelijk jezelf met de groep, vind je borrel-archetype en bewonder de superlatieven — de giraffe-enquête van Kompanen.",
  applicationName: "Borrel 35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
