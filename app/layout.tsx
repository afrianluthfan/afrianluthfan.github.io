import type { Metadata } from "next";
import { Syne, Azeret_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-azeret-mono",
});

export const metadata: Metadata = {
  title: "Afrian Luthfan — Software Engineer",
  description:
    "Portfolio of Afrian Luthfan, S.Si. Kom. — Software Engineer based in Bogor, Indonesia.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${syne.variable} ${azeretMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
