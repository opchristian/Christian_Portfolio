import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Christian | Software Engineer",
  description:
    "Portfolio of Christian — Software Engineer and student at Colby College studying CS, Math, and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden scroll-smooth">
      <body
        className={`${inter.variable} h-full overflow-hidden bg-surface font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
