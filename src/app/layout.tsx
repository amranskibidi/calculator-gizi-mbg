import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBG Calculator – Hitung Gizi & Biaya",
  description: "Kalkulator gizi dan harga menu Makan Bergizi Gratis dengan drag & drop ompreng digital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}