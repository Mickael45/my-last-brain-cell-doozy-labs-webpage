import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
// Client component import is allowed; Next.js will split automatically.
import DevOnlySeed from "../components/DevOnlySeed";

export const metadata: Metadata = {
  title: "My Last Brain Cell Doozy Labs",
  description: "Portfolio / Lab showcase",
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
