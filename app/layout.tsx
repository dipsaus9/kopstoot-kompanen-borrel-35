import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bangers, Outfit, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site";
import "./globals.css";

// PROOF (design/skate-graffiti-proof): retro-anime / street typography.
// Bangers = spray/comic display for hero + tags; Outfit = clean strong body/UI.
const display = Bangers({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const bodySans = Outfit({
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
    "Ontdek het gemiddelde Borrel 35-profiel, vergelijk jezelf met de groep, vind je borrel-archetype en bewonder de toppers — de giraffe-enquête van Kompanen.",
  applicationName: "Borrel 35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${display.variable} ${bodySans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-pill font-black focus:not-sr-only focus:absolute focus:left-stack-md focus:top-stack-md focus:z-[100] focus:border-[3px] focus:border-[var(--brand-cocoa-deep)] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-[var(--sticker-shadow-sm)] focus:outline-none"
        >
          Naar inhoud
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
