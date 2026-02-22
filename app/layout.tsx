import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinese Name Craft — Find Your Name in Classical Poetry",
  description:
    "Discover a meaningful Chinese name rooted in classical poetry. Bilingual name recommendations with cultural context.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
