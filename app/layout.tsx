import "../app/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "My Last Brain Cell Doozy Labs",
  description: "Portfolio / Lab showcase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className="min-h-screen bg-gray-900 text-white">{children}</body>
    </html>
  );
}
