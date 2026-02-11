import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
// Client component import is allowed; Next.js will split automatically.
import DevOnlySeed from "../components/DevOnlySeed";

export const metadata: Metadata = {
  title: {
    default: "My Last Brain Cell Doozy Labs",
    template: "%s | Doozy Labs",
  },
  description:
    "One brain cell. Infinite bad ideas. A solo dev lab where shower thoughts become shipped products and over-engineered prototypes achieve sentience at 3 AM.",
  keywords: [
    "indie hacker",
    "micro-SaaS",
    "experiments",
    "prototypes",
    "dev lab",
    "side projects",
  ],
  authors: [{ name: "Doozy Labs" }],
  creator: "Doozy Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "My Last Brain Cell Doozy Labs",
    title: "My Last Brain Cell Doozy Labs",
    description:
      "One brain cell. Infinite bad ideas. Shower thoughts turned shipped products.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Doozy Labs — a neuron in a beaker",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "My Last Brain Cell Doozy Labs",
    description:
      "One brain cell. Infinite bad ideas. Shower thoughts turned shipped products.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-gray-900" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-900 text-white">
        {children}
        {/* Dev utility */}
        <DevOnlySeed />
      </body>
    </html>
  );
}
