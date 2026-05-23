import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Pariwisata Karawang - Portal Informasi Wisata, Budaya & UMKM",
  description: "Portal resmi Sistem Informasi Pariwisata Kabupaten Karawang. Temukan informasi destinasi wisata alam, sejarah, seni budaya, katalog produk UMKM unggulan, serta kalender agenda acara menarik.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 dark:bg-zinc-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
